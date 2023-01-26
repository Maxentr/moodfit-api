import { Request, Response } from "express"
import { CustomRequest, RequestWithParamId } from "../../types/generic-request"
import { FindAllMoodsByUserRequest } from "../users/validations/find-all-by-user"
import { MoodsService } from "./moods.service"
import { CreateMoodRequest } from "./validations/create-mood"
import { UpdateMoodRequest } from "./validations/update-mood"

export class MoodsController {
  public static async create(
    req: CustomRequest<CreateMoodRequest>,
    res: Response,
  ) {
    try {
      const isTodayMoodAlreadySent = await MoodsService.isTodayMoodAlreadySent(
        req.body.userId,
      )

      if (!isTodayMoodAlreadySent) {
        const mood = await MoodsService.create(req.body)

        res.status(201).send(mood)
      } else {
        res
          .status(400)
          .send({ error: "You already sent your mood report tomood" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const moods = await MoodsService.findAll()

      res.send(moods)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAllByUser(
    req: CustomRequest<FindAllMoodsByUserRequest>,
    res: Response,
  ) {
    try {
      const { page, nbPerPage } = req.query
      const moods = await MoodsService.findAllByUser(req.params.userId, {
        page: page,
        nbPerPage: nbPerPage,
      })

      res.send(moods)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(
    req: CustomRequest<RequestWithParamId>,
    res: Response,
  ) {
    try {
      const mood = await MoodsService.findOne(req.params.id)

      res.send(mood)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(
    req: CustomRequest<UpdateMoodRequest>,
    res: Response,
  ) {
    try {
      const mood = await MoodsService.update(req.params.id, req.body)

      res.send(mood)
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(
    req: CustomRequest<RequestWithParamId>,
    res: Response,
  ) {
    try {
      await MoodsService.remove(req.params.id)

      res.send({ message: "Mood deleted" })
    } catch (error) {
      console.log(error)
    }
  }
}
