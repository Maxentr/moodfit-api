import { z } from "zod"
import { ParamIdSchema } from "../../utils/generic-schema"
import { PaginationQueryObject } from "../../utils/pagination"

// TODO? Generic schema for this kind of query ?
const GetMoodByUserQuery = z.object({
  ...PaginationQueryObject,
  sort_by: z.string().optional(),
  order_by: z.enum(["asc", "desc"]).optional(),
})

const GetMoodByUserSchema = z.object({
  params: ParamIdSchema,
  query: GetMoodByUserQuery,
})

type GetMoodByUser = z.infer<typeof GetMoodByUserQuery>
type GetMoodByUserRequest = z.infer<typeof GetMoodByUserSchema>

export type { GetMoodByUser, GetMoodByUserRequest }
export { GetMoodByUserSchema }
