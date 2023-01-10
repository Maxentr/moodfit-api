import { z } from "zod"
import { SafeNumber } from "../../utils/generic-schema"
import { PaginationQuery } from "../../utils/pagination"

const FindAllDaysByUserParams = z.object({
  userId: SafeNumber,
})

const FindAllDaysByUserSchema = z.object({
  params: FindAllDaysByUserParams,
  query: PaginationQuery,
})

type FindAllDaysByUserRequest = z.infer<typeof FindAllDaysByUserSchema>

export type { FindAllDaysByUserRequest }
export { FindAllDaysByUserSchema }
