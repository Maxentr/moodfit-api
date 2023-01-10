import { Router } from "express"
import { RouteIdSchema } from "../utils/generic-schema"
import { validate } from "../utils/validation"
import Auth from "../auth/auth.middleware"
import { UsersController } from "./users.controller"
import { CreateUserSchema } from "./validations/create-user"
import { UpdateUserSchema } from "./validations/update-user"
import UserIntegrity from "./users.middleware"

const usersRouter = Router()

// Create
usersRouter.post("/", validate(CreateUserSchema), UsersController.create)

// Read all
usersRouter.get("/", Auth("ADMIN"), UsersController.findAll)

// Read one
usersRouter.get(
  "/:id",
  Auth(),
  validate(RouteIdSchema),
  UsersController.findOne,
)

// Update
usersRouter.patch(
  "/:id",
  Auth(),
  UserIntegrity("id", "params"),
  validate(UpdateUserSchema),
  UsersController.update,
)

// Delete
usersRouter.delete(
  "/:id",
  Auth(),
  UserIntegrity("id", "params"),
  validate(RouteIdSchema),
  UsersController.remove,
)

export default usersRouter
