import { Router } from "express"
import { RouteIdSchema } from "../utils/generic-schema"
import { validate } from "../utils/validation"
import Auth from "../auth/auth.middleware"
import { MoodsController } from "./moods.controller"
import { CreateMoodSchema } from "./validations/create-mood"
import { UpdateMoodSchema } from "./validations/update-mood"
import UserIntegrity from "../users/users.middleware"

const moodsRouter = Router()

// Create
moodsRouter.post(
  "/",
  Auth(),
  UserIntegrity("userId", "body"),
  validate(CreateMoodSchema),
  MoodsController.create,
)

// Read all
moodsRouter.get("/", Auth("ADMIN"), MoodsController.findAll)

// Read all by user
moodsRouter.get(
  "/user/:id",
  Auth(),
  validate(RouteIdSchema),
  UserIntegrity("id", "params"),
  MoodsController.findAllByUser,
)

// Read one
moodsRouter.get(
  "/:id",
  Auth(),
  UserIntegrity("id", "params"),
  validate(RouteIdSchema),
  MoodsController.findOne,
)

// Update
moodsRouter.patch(
  "/:id",
  Auth(),
  UserIntegrity("userId", "body"),
  validate(UpdateMoodSchema),
  MoodsController.update,
)

// Delete
moodsRouter.delete(
  "/:id",
  Auth("ADMIN"),
  validate(RouteIdSchema),
  MoodsController.remove,
)

export default moodsRouter
