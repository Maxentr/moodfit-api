import { z } from "zod"
import { SafeNumber } from "./generic-schema"

const PaginationQueryObject = {
  page: SafeNumber.min(1).default(1),
  nb_per_page: SafeNumber.min(1).max(100).default(10),
}

const PaginationQuery = z.object(PaginationQueryObject)

const PaginationSchema = z.object({
  query: PaginationQuery,
})

type Pagination = z.infer<typeof PaginationQuery>

export { Pagination, PaginationSchema, PaginationQuery, PaginationQueryObject }
