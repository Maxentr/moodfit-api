import { CreateUser } from "./validations/create-user"
import { UpdateUser } from "./validations/update-user"
import { hash } from "bcrypt"
import prisma from "../prisma"
import { ResetPassword } from "./validations/reset-password"
import { Role } from "@prisma/client"

const SELECT_WITHOUT_PASSWORD = {
  id: true,
  name: true,
  email: true,
  password: false,
  role: true,
  createdAt: false,
  updatedAt: false,
}

export class UsersService {
  public static async create(createRequest: CreateUser) {
    const user = await prisma.user.create({
      select: SELECT_WITHOUT_PASSWORD,
      data: {
        ...createRequest,
        password: await hash(createRequest.password, +10),
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return user
  }

  public static async findAll() {
    const users = await prisma.user.findMany({
      select: SELECT_WITHOUT_PASSWORD,
    })
    return users
  }

  public static async findOne(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: SELECT_WITHOUT_PASSWORD,
    })
  }

  // Use only for authentification method
  public static async findOneAuthentification(email: string) {
    return await prisma.user.findUnique({
      where: { email: email },
    })
  }

  public static async isEmailTaken(email: string) {
    return await prisma.user
      .findUnique({ where: { email } })
      .then((r) => (r ? true : false))
  }

  public static async update(id: number, updateRequest: UpdateUser) {
    return await prisma.user.update({
      select: SELECT_WITHOUT_PASSWORD,
      where: { id },
      data: {
        ...updateRequest,
        updatedAt: new Date(),
      },
    })
  }

  public static async resetPassword(id: number, resetRequest: ResetPassword) {
    if (resetRequest.password) {
      resetRequest.password = await hash(resetRequest.password, +10)
      resetRequest.confirmPassword = undefined
    }

    const user = await prisma.user.update({
      select: SELECT_WITHOUT_PASSWORD,
      where: { id },
      data: {
        ...resetRequest,
        updatedAt: new Date(),
      },
    })
    return user
  }

  public static async remove(id: number) {
    const user = await prisma.user.delete({
      select: SELECT_WITHOUT_PASSWORD,
      where: { id },
    })
    return user
  }
}
