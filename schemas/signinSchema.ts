import { z } from "zod";

const signinSchema = z.object({
  email: z.string().min(1, "Email Required"),
  password: z.string().min(1, "Password Required"),
});

export default signinSchema;
