import { z } from "zod";

export const playerSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  ign: z.string().min(2, "In-Game Name is required"),
  uid: z.string().min(5, "UID is required"),
  area: z.string().min(2, "Area is required"),
  address: z.string().min(5, "Address is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  discordId: z.string().min(3, "Discord ID is required"),
});

export const tournamentRegistrationSchema = z.object({
  teamName: z.string().min(2, "Team Name is required"),
  players: z.array(playerSchema).min(5, "Exactly 5 players are required").max(5, "Exactly 5 players are required"),
});

export const showmatchRegistrationSchema = playerSchema.extend({
  productSerialNumber: z.string().min(3, "Product Serial Number is required"),
});

export type PlayerInput = z.infer<typeof playerSchema>;
export type TournamentRegistrationInput = z.infer<typeof tournamentRegistrationSchema>;
export type ShowmatchRegistrationInput = z.infer<typeof showmatchRegistrationSchema>;
