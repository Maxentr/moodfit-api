import { z } from "zod"
import { ParamIdSchema } from "../../utils/generic-schema"

const UpdateDayBody = z.object({
  comment: z.string().optional(),
})

const UpdateDaySchema = z.object({
  params: ParamIdSchema,
  body: UpdateDayBody,
})

type UpdateDay = z.infer<typeof UpdateDayBody>
type UpdateDayRequest = z.infer<typeof UpdateDaySchema>

export type { UpdateDay, UpdateDayRequest }
export { UpdateDaySchema }
