import { z } from "zod";

export const verificationCodeSchema = z.object({
  userId: z.string(),
  verificationCode: z.string().length(6, "Please enter a valid 6 digit code"),
});
