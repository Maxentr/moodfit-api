import { CreateDay } from "./validations/create-day"
import { UpdateDay } from "./validations/update-day"
import prisma from "../prisma"
import { Pagination } from "../utils/pagination"

export class DaysService {
  public static async create(createRequest: CreateDay) {
    return await prisma.day.create({
      data: {
        ...createRequest,
        date: new Date().toLocaleDateString("en-CA"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }

  public static async findAll() {
    const menus = await prisma.day.findMany()
    return menus
  }

  public static async findAllByUser(
    userId: number,
    { page, nbPerPage }: Pagination,
  ) {
    const menus = await prisma.day.findMany({
      where: { userId: userId },
      take: nbPerPage,
      skip: nbPerPage * (page - 1),
    })
    return menus
  }

  public static async findOne(id: number) {
    return await prisma.day.findUnique({ where: { id } })
  }

  public static async isTodayAlreadySent(userId: number) {
    return await prisma.day
      .findFirst({
        where: {
          userId: userId,
          date: { equals: new Date().toLocaleDateString("en-CA") },
        },
      })
      .then((r) => (r ? true : false))
  }

  public static async update(id: number, updateRequest: UpdateDay) {
    return await prisma.day.update({
      where: { id },
      data: {
        ...updateRequest,
        updatedAt: new Date(),
      },
    })
  }

  public static async remove(id: number) {
    return await prisma.day.delete({ where: { id } })
  }
}
