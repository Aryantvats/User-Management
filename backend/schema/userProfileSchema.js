import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10).max(15).optional(),
  gender: z.enum(["Male", "Female"]).optional(),
  status: z.string().optional(),
  location: z.string().optional(),
});
