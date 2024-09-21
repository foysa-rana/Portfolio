import { z } from "zod";

const passwordSchema = z
  .string()
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
    message:
      "Password must contain at least  8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
  });

export default passwordSchema;
