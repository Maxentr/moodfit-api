import { z } from "zod"

const CreateUserBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

const CreateUserSchema = z.object({
  body: CreateUserBody,
})

type CreateUser = z.infer<typeof CreateUserBody>
type CreateUserRequest = z.infer<typeof CreateUserSchema>

export type { CreateUser, CreateUserRequest }
export { CreateUserSchema }
