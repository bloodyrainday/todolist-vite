import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "email is required" }).email({ message: "email is invalid" }),
  password: z
    .string()
    .min(1, { message: "password is required" })
    .min(3, { message: "password must be at least 3 characters long" }),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof loginSchema>
