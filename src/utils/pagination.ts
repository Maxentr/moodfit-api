import { z } from "zod"
import { SafeNumber } from "./generic-schema"

const PaginationQuery = z.object({
  page: SafeNumber.min(1).default(1),
  nbPerPage: SafeNumber.min(1).max(100).default(10),
})

const PaginationSchema = z.object({
  query: PaginationQuery,
})

type Pagination = z.infer<typeof PaginationQuery>

export { Pagination, PaginationSchema, PaginationQuery }
