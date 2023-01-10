import { z } from "zod"

const LoginBody = z.object({
  email: z.string().email(),
  password: z.string(),
})

const LoginSchema = z.object({
  body: LoginBody,
})

type Login = z.infer<typeof LoginBody>

export type { Login }
export { LoginSchema }
