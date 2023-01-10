import { Role } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { AuthService } from "./auth.service"

type RoleString = keyof typeof Role
const defaultRoleRestriction = Object.values(Role)

/**
 * @function
 *
 * Check if the user is authenticated and has the right role
 *
 * @param {RoleString[]} roleRestriction - Destructured array of roles that are allowed to access the route
 *
 * @example
 *
 * This route is accessible by all connected users:
 * Auth()
 *
 * This route is only accessible by an admin:
 * Auth("ADMIN")
 *
 * This route is accessible by an admin or a simple user:
 * Auth("ADMIN", "USER")
 *
 */
const Auth = (...roleRestriction: RoleString[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const currRoleRestriction = roleRestriction.length
      ? roleRestriction
      : defaultRoleRestriction

    const authHeader = req.headers.authorization

    if (!authHeader)
      return res.status(401).send({ message: "No token provided" })

    try {
      const token = authHeader.split(" ")[1]
      const decodedToken = AuthService.verifyAccessToken(token)

      if (currRoleRestriction.includes(decodedToken.role)) next()
      else res.status(403).send({ message: "Forbidden" })
    } catch (error) {
      res.status(400).send({ message: "Invalid token" })
    }
  }
}

export default Auth
