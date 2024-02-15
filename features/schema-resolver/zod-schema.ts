import { object, z } from "zod";

export const CredentialSchema = object({
    userName: z.string(),
    password: z.string()
});