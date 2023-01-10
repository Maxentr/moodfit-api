import { Request } from "express"
import { z } from "zod"
import { BodyIdsSchema, ParamIdSchema } from "../src/utils/generic-schema"

type CustomRequestGeneric = {
  body?: Record<string, unknown>
  params?: Record<string, unknown>
  query?: Record<string, unknown>
}

interface CustomRequest<T extends CustomRequestGeneric> extends Request {
  body: T["body"]
  params: Request["params"] & T["params"]
  query: Request["query"] & T["query"]
}

type RequestWithParamId = {
  params: z.infer<typeof ParamIdSchema>
}

type RequestWithBodyIds = {
  body: z.infer<typeof BodyIdsSchema>
}

export { CustomRequest, RequestWithParamId, RequestWithBodyIds }
