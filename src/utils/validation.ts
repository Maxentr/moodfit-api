import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const a = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      // Assign the parsed value back to the request object
      req.body = a.body
      req.query = a.query
      req.params = a.params

      return next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }

export { validate }
