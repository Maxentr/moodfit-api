import { z } from "zod"
import { SafeNumber } from "../../utils/generic-schema"

const CreateDayBody = z.object({
  feeling: z.coerce.number().min(0).max(10),
  comment: z.string().optional(),
  userId: SafeNumber,
})

const CreateDaySchema = z.object({
  body: CreateDayBody,
})

type CreateDay = z.infer<typeof CreateDayBody>
type CreateDayRequest = z.infer<typeof CreateDaySchema>

export type { CreateDay, CreateDayRequest }
export { CreateDaySchema }
