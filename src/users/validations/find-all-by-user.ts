import { z } from "zod"
import { SafeNumber } from "../../utils/generic-schema"
import { PaginationQuery } from "../../utils/pagination"

const FindAllMoodsByUserParams = z.object({
  userId: SafeNumber,
})

const FindAllMoodsByUserSchema = z.object({
  params: FindAllMoodsByUserParams,
  query: PaginationQuery,
})

type FindAllMoodsByUserRequest = z.infer<typeof FindAllMoodsByUserSchema>

export type { FindAllMoodsByUserRequest }
export { FindAllMoodsByUserSchema }
