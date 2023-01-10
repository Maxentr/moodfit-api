import { z } from "zod"
import { ParamIdSchema } from "../../utils/generic-schema"

const UpdateUserBody = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
})

const UpdateUserSchema = z.object({
  params: ParamIdSchema,
  body: UpdateUserBody,
})

type UpdateUser = z.infer<typeof UpdateUserBody>
type UpdateUserRequest = z.infer<typeof UpdateUserSchema>

export type { UpdateUser, UpdateUserRequest }
export { UpdateUserSchema }
