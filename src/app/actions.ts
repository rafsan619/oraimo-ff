"use server";

import { z } from "zod";
import { registrationSchema } from "@/lib/schema";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function submitRegistration(data: FormData) {
  try {
    // 1. Validate Form Data
    const rawData = {
      fullName: data.get("fullName"),
      ign: data.get("ign"),
      uid: data.get("uid"),
      area: data.get("area"),
      address: data.get("address"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      discordId: data.get("discordId"),
      teamName: data.get("teamName"),
    };

    const validatedData = registrationSchema.parse(rawData);
    const logoFile = data.get("teamLogo") as File;

    if (!logoFile || logoFile.size === 0) {
      return { success: false, error: "Team Logo is required." };
    }
    
    if (logoFile.size > MAX_FILE_SIZE) {
      return { success: false, error: "Team Logo must be less than 5MB." };
    }
    
    if (!ACCEPTED_IMAGE_TYPES.includes(logoFile.type)) {
      return { success: false, error: "Team Logo must be a valid image (JPEG, PNG, WEBP)." };
    }

    // Since we don't have actual Supabase credentials, we will mock the backend logic here
    // In a real scenario, this would look like:
    /*
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
      
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${validatedData.uid}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('team-logos')
        .upload(fileName, logoFile);
        
      if (uploadError) throw new Error("Failed to upload logo.");
      
      const { data: publicUrlData } = supabase.storage
        .from('team-logos')
        .getPublicUrl(fileName);
        
      const logoUrl = publicUrlData.publicUrl;
      
      const { error: insertError } = await supabase
        .from('registrations')
        .insert({
          full_name: validatedData.fullName,
          ign: validatedData.ign,
          uid: validatedData.uid,
          area: validatedData.area,
          address: validatedData.address,
          phone_number: validatedData.phoneNumber,
          email: validatedData.email,
          discord_id: validatedData.discordId,
          team_name: validatedData.teamName,
          team_logo_url: logoUrl
        });
        
      if (insertError) throw new Error("Failed to save registration.");
      
      // Send Resend Email
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Oraimo x Free Fire <noreply@yourdomain.com>',
        to: validatedData.email,
        subject: 'Registration Confirmed: Oraimo x Free Fire ZCS',
        html: `
          <div style="background-color: #0e0e0e; color: #fff; padding: 40px; font-family: sans-serif; text-align: center;">
            <h1 style="color: #39FF14; text-transform: uppercase;">Registration Confirmed</h1>
            <p style="color: #adaaaa; font-size: 16px;">Hello <strong>${validatedData.ign}</strong>,</p>
            <p style="color: #adaaaa; font-size: 16px;">Your registration for team <strong>${validatedData.teamName}</strong> has been successfully received.</p>
            <p style="color: #adaaaa; font-size: 16px;">Get ready for the ultimate showdown!</p>
          </div>
        `
      });
    */

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { success: true };
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Something went wrong during registration." };
  }
}
