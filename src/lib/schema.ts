import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  ign: z.string().min(2, "In-Game Name is required"),
  uid: z.string().min(5, "UID is required"),
  area: z.string().min(2, "Area is required"),
  address: z.string().min(5, "Address is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  discordId: z.string().min(3, "Discord ID is required"),
  teamName: z.string().min(2, "Team Name is required"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
