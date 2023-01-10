import { Role, User } from "@prisma/client"

export type JwtPayload = {
  id: number
  name: string
  email: string
  role: Role
}

const createJwtPayload = (user: User): JwtPayload => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export { createJwtPayload }
export default createJwtPayload
