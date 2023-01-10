import { z } from "zod"

const SafeNumber = z.coerce.number()

const ParamIdSchema = z.object({
  id: SafeNumber,
})

const RouteIdSchema = z.object({
  params: ParamIdSchema,
})

const BodyIdsSchema = z.object({
  ids: z.array(SafeNumber),
})

const RouteIdsSchema = z.object({
  body: BodyIdsSchema,
})

export { SafeNumber, ParamIdSchema, RouteIdSchema, BodyIdsSchema, RouteIdsSchema }
