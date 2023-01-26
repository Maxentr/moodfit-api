import { Router } from "express"
import { validate } from "../utils/validation"
import { AuthController } from "./auth.controller"
import { LoginSchema } from "./validations/login"
import { RefreshSchema } from "./validations/refresh"
import { VerifySchema } from "./validations/verify"

const authRouter = Router()

// Login
authRouter.post("/login", validate(LoginSchema), AuthController.login)
authRouter.post("/verify", validate(VerifySchema), AuthController.verifyAccessToken)
authRouter.get("/refresh", AuthController.refresh)
authRouter.post("/refresh", validate(RefreshSchema), AuthController.refresh)
authRouter.get("/logout", AuthController.logout)

export default authRouter
