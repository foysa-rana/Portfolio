import { z } from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be atleast 2 characters")
    .max(20, "Name cannot be exceed 20 characters"),
  email: emailSchema,
  password: passwordSchema,
});

export default signupSchema;
