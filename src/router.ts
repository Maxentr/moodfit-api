import express from "express"
import { Router } from "express"
import authRouter from "./auth/auth.router"
import usersRouter from "./users/users.router"

export const createRouter = (app: express.Express) => {
  // Routes V1
  const routerV1 = Router()
  routerV1.use("/users", usersRouter)
  routerV1.use("/auth", authRouter)

  // nest all routes under /api
  const api = Router()

  // Add versionning to api routes
  api.use("/v1", routerV1)
  // Get ip address of the client (for rate limiting proxies)
  api.use("/ip", (request, response) => response.send(request.ip))
  // Add "api" prefix to app

  app.use("/api", api)
}
