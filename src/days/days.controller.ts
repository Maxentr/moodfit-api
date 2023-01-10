import { Request, Response } from "express"
import { CustomRequest, RequestWithParamId } from "../../types/generic-request"
import { FindAllDaysByUserRequest } from "../users/validations/find-all-by-user"
import { DaysService } from "./days.service"
import { CreateDayRequest } from "./validations/create-day"
import { UpdateDayRequest } from "./validations/update-day"

export class DaysController {
  public static async create(
    req: CustomRequest<CreateDayRequest>,
    res: Response,
  ) {
    try {
      const isTodayAlreadySent = await DaysService.isTodayAlreadySent(
        req.body.userId,
      )

      if (!isTodayAlreadySent) {
        const day = await DaysService.create(req.body)

        res.status(201).send(day)
      } else {
        res
          .status(400)
          .send({ error: "You already sent your day report today" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const days = await DaysService.findAll()

      res.send(days)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAllByUser(
    req: CustomRequest<FindAllDaysByUserRequest>,
    res: Response,
  ) {
    try {
      const { page, nbPerPage } = req.query
      const days = await DaysService.findAllByUser(req.params.userId, {
        page: page,
        nbPerPage: nbPerPage,
      })

      res.send(days)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(
    req: CustomRequest<RequestWithParamId>,
    res: Response,
  ) {
    try {
      const day = await DaysService.findOne(req.params.id)

      res.send(day)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(
    req: CustomRequest<UpdateDayRequest>,
    res: Response,
  ) {
    try {
      const day = await DaysService.update(req.params.id, req.body)

      res.send(day)
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(
    req: CustomRequest<RequestWithParamId>,
    res: Response,
  ) {
    try {
      await DaysService.remove(req.params.id)

      res.send({ message: "Day deleted" })
    } catch (error) {
      console.log(error)
    }
  }
}
