import { CreateMood } from "./validations/create-mood"
import { UpdateMood } from "./validations/update-mood"
import prisma from "../prisma"
import { Pagination } from "../utils/pagination"

export class MoodsService {
  public static async create(createRequest: CreateMood) {
    return await prisma.mood.create({
      data: {
        ...createRequest,
        date: new Date().toLocaleDateString("en-CA"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }

  public static async findAll() {
    const menus = await prisma.mood.findMany()
    return menus
  }

  public static async findAllByUser(
    userId: number,
    { page, nbPerPage }: Pagination,
  ) {
    const menus = await prisma.mood.findMany({
      where: { userId: userId },
      take: nbPerPage,
      skip: nbPerPage * (page - 1),
    })
    return menus
  }

  public static async findOne(id: number) {
    return await prisma.mood.findUnique({ where: { id } })
  }

  public static async isTodayMoodAlreadySent(userId: number) {
    return await prisma.mood
      .findFirst({
        where: {
          userId: userId,
          date: { equals: new Date().toLocaleDateString("en-CA") },
        },
      })
      .then((r) => (r ? true : false))
  }

  public static async update(id: number, updateRequest: UpdateMood) {
    return await prisma.mood.update({
      where: { id },
      data: {
        ...updateRequest,
        updatedAt: new Date(),
      },
    })
  }

  public static async remove(id: number) {
    return await prisma.mood.delete({ where: { id } })
  }
}
