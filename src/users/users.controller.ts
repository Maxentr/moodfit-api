import { Request, Response } from "express"
import { CustomRequest, RequestWithParamId } from "../../types/generic-request"
import { UsersService } from "./users.service"
import { CreateUserRequest } from "./validations/create-user"
import { UpdateUserRequest } from "./validations/update-user"

export class UsersController {
  public static async create(
    req: CustomRequest<CreateUserRequest>,
    res: Response,
  ) {
    try {
      const isEmailTaken = await UsersService.isEmailTaken(req.body.email)
      if (!isEmailTaken) {
        const user = await UsersService.create(req.body)
        res.status(201).send(user)
      } else {
        res.status(400).send({ error: "Email already taken" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const users = await UsersService.findAll()

      res.send(users)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(
    req: CustomRequest<RequestWithParamId>,
    res: Response,
  ) {
    try {
      const user = await UsersService.findOne(req.params.id)

      res.send(user)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(
    req: CustomRequest<UpdateUserRequest>,
    res: Response,
  ) {
    try {
      const id = req.params.id
      const doesUserExist = await UsersService.doesUserExist(id)

      if (!doesUserExist) {
        const user = await UsersService.update(id, req.body)
        res.send(user)
      } else {
        res.status(400).send({ error: "Email already taken" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(
    req: CustomRequest<RequestWithParamId>,
    res: Response,
  ) {
    try {
      await UsersService.remove(req.params.id)

      res.send({ message: "User deleted" })
    } catch (error) {
      console.log(error)
    }
  }
}
