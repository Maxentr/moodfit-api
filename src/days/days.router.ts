import { Router } from "express"
import { RouteIdSchema } from "../utils/generic-schema"
import { validate } from "../utils/validation"
import Auth from "../auth/auth.middleware"
import { DaysController } from "./days.controller"
import { CreateDaySchema } from "./validations/create-day"
import { UpdateDaySchema } from "./validations/update-day"
import UserIntegrity from "../users/users.middleware"

const daysRouter = Router()

// Create
daysRouter.post(
  "/",
  Auth(),
  UserIntegrity("userId", "body"),
  validate(CreateDaySchema),
  DaysController.create,
)

// Read all
daysRouter.get("/", Auth("ADMIN"), DaysController.findAll)

// Read all by user
daysRouter.get(
  "/user/:id",
  Auth(),
  validate(RouteIdSchema),
  UserIntegrity("id", "params"),
  DaysController.findAllByUser,
)

// Read one
daysRouter.get(
  "/:id",
  Auth(),
  UserIntegrity("id", "params"),
  validate(RouteIdSchema),
  DaysController.findOne,
)

// Update
daysRouter.patch(
  "/:id",
  Auth(),
  UserIntegrity("userId", "body"),
  validate(UpdateDaySchema),
  DaysController.update,
)

// Delete
daysRouter.delete(
  "/:id",
  Auth("ADMIN"),
  validate(RouteIdSchema),
  DaysController.remove,
)

export default daysRouter
