import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

export default emailSchema;
