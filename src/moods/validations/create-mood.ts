import { z } from "zod"
import { SafeNumber } from "../../utils/generic-schema"

const CreateMoodBody = z.object({
  feeling: z.coerce.number().min(0).max(10),
  comment: z.string().optional(),
  userId: SafeNumber,
})

const CreateMoodSchema = z.object({
  body: CreateMoodBody,
})

type CreateMood = z.infer<typeof CreateMoodBody>
type CreateMoodRequest = z.infer<typeof CreateMoodSchema>

export type { CreateMood, CreateMoodRequest }
export { CreateMoodSchema }
