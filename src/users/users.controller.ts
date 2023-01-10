import { Request, Response } from "express"
import { UsersService } from "./users.service"

export class UsersController {
  public static async create(req: Request, res: Response) {
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

  public static async findOne(req: Request, res: Response) {
    try {
      const id = +req.params.id
      const user = await UsersService.findOne(id)

      res.send(user)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const isEmailTaken = await UsersService.isEmailTaken(req.body.email)

      if (!isEmailTaken) {
        const id = +req.params.id
        const user = await UsersService.update(id, req.body)
        res.send(user)
      } else {
        res.status(400).send({ error: "Email already taken" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const id = +req.params.id
      await UsersService.remove(id)

      res.send({ message: "User deleted" })
    } catch (error) {
      console.log(error)
    }
  }
}
