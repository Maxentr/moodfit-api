import { z } from "zod"

const safeNumber = () =>
  z.preprocess(
    (a) =>
      typeof a === "number"
        ? a
        : Number(parseFloat(z.string().parse(a)).toFixed(2)),
    z.number(),
  )

const ParamIdSchema = z.object({
  id: z.number(),
})

const RouteIdSchema = z.object({
  params: ParamIdSchema,
})

const BodyIdsSchema = z.object({
  ids: z.array(z.number()),
})

const RouteIdsSchema = z.object({
  body: BodyIdsSchema,
})

export {
  safeNumber,
  ParamIdSchema,
  RouteIdSchema,
  BodyIdsSchema,
  RouteIdsSchema,
}
