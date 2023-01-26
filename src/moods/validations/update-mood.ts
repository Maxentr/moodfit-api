import { z } from "zod"
import { ParamIdSchema } from "../../utils/generic-schema"

const UpdateMoodBody = z.object({
  comment: z.string().optional(),
})

const UpdateMoodSchema = z.object({
  params: ParamIdSchema,
  body: UpdateMoodBody,
})

type UpdateMood = z.infer<typeof UpdateMoodBody>
type UpdateMoodRequest = z.infer<typeof UpdateMoodSchema>

export type { UpdateMood, UpdateMoodRequest }
export { UpdateMoodSchema }
