"use server";

import { z } from "zod";
import { tournamentRegistrationSchema, showmatchRegistrationSchema } from "@/lib/schema";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// 1. Tournament Registration (5 Players + Team)
export async function submitTournamentRegistration(data: FormData) {
  try {
    const payloadStr = data.get("payload") as string;
    if (!payloadStr) throw new Error("Invalid payload data.");
    
    const rawData = JSON.parse(payloadStr);
    const validatedData = tournamentRegistrationSchema.parse(rawData);
    
    const logoFile = data.get("teamLogo") as File;
    if (!logoFile || logoFile.size === 0) return { success: false, error: "Team Logo is required." };
    if (logoFile.size > MAX_FILE_SIZE) return { success: false, error: "Team Logo must be less than 5MB." };
    if (!ACCEPTED_IMAGE_TYPES.includes(logoFile.type)) return { success: false, error: "Team Logo must be a valid image." };

    let logoUrl = "";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project-id")) {
      throw new Error("Supabase credentials are not properly configured in the .env file.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const leaderUid = validatedData.players[0].uid;
    const fileExt = logoFile.name.split('.').pop();
    const fileName = `${leaderUid}-${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('team-logos')
      .upload(fileName, logoFile);
      
    if (uploadError) throw new Error(`Failed to upload logo: ${uploadError.message}`);
    
    const { data: publicUrlData } = supabase.storage.from('team-logos').getPublicUrl(fileName);
    logoUrl = publicUrlData.publicUrl;
    
    const leader = validatedData.players[0];
    const teamMembers = validatedData.players.slice(1);
    
    const { error: insertError } = await supabase
      .from('registrations')
      .insert({
        full_name: leader.fullName,
        ign: leader.ign,
        uid: leader.uid,
        area: leader.area,
        address: leader.address,
        phone_number: leader.phoneNumber,
        email: leader.email,
        discord_id: leader.discordId,
        team_name: validatedData.teamName,
        team_logo_url: logoUrl,
        team_members: teamMembers // JSONB column
      });
      
    if (insertError) throw new Error(`Failed to save registration: ${insertError.message}`);

    // Send Resend Email to Team Leader
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error: resendError } = await resend.emails.send({
        from: 'Oraimo x Free Fire <onboarding@resend.dev>',
        to: leader.email,
        subject: 'Registration Confirmed: Oraimo x Free Fire ZCS',
        html: `
          <div style="background-color: #0e0e0e; color: #fff; padding: 40px; font-family: sans-serif; text-align: center;">
            <h1 style="color: #39FF14; text-transform: uppercase;">Registration Confirmed</h1>
            <p style="color: #adaaaa; font-size: 16px;">Hello <strong>${leader.ign}</strong>,</p>
            <p style="color: #adaaaa; font-size: 16px;">Your registration for team <strong>${validatedData.teamName}</strong> has been successfully received.</p>
            <p style="color: #adaaaa; font-size: 16px;">Get ready for the ultimate showdown!</p>
          </div>
        `
      });

      if (resendError) throw new Error("Failed to send confirmation email.");
    }

    return { success: true };
  } catch (error: any) {
    if (error?.name === 'ZodError') return { success: false, error: error.errors[0].message };
    return { success: false, error: error.message || "Something went wrong." };
  }
}

// 2. Showmatch Registration (1 Player + Serial Number)
export async function submitShowmatchRegistration(data: FormData) {
  try {
    const payloadStr = data.get("payload") as string;
    if (!payloadStr) throw new Error("Invalid payload data.");
    
    const rawData = JSON.parse(payloadStr);
    const validatedData = showmatchRegistrationSchema.parse(rawData);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project-id")) {
      throw new Error("Supabase credentials are not properly configured in the .env file.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { error: insertError } = await supabase
      .from('showmatch_registrations')
      .insert({
        full_name: validatedData.fullName,
        ign: validatedData.ign,
        uid: validatedData.uid,
        area: validatedData.area,
        address: validatedData.address,
        phone_number: validatedData.phoneNumber,
        email: validatedData.email,
        discord_id: validatedData.discordId,
        product_serial_number: validatedData.productSerialNumber
      });
      
    if (insertError) throw new Error(`Failed to save showmatch registration: ${insertError.message}`);

    // NO EMAIL SENT HERE per requirements
    return { success: true };
  } catch (error: any) {
    if (error?.name === 'ZodError') return { success: false, error: error.errors[0].message };
    return { success: false, error: error.message || "Something went wrong." };
  }
}
