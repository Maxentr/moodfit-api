import { Role } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { AuthService } from "../auth/auth.service"

type DataLocation = "body" | "params" | "query"

/**
 * @function
 *
 * Check if the user's id matches the id in the request. It uses the accessToken to get the user's id.
 *
 * @param {string} dataName - Name of the data to validate
 * @param {DataLocation} dataLocation - Location of the data to validate
 *
 * @example
 * This will validate the id in the request body:
 * UserIntegrity("id", "body")
 *
 */
const UserIntegrity = (dataName: string, dataLocation: DataLocation) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
      return res.status(401).send({ message: "No token provided" })

    try {
      const token = authHeader.split(" ")[1]
      const decodedToken = AuthService.verifyAccessToken(token)

      if (decodedToken.role === Role.ADMIN) return next()

      const idToCheck = req?.[dataLocation]?.[dataName]

      if (idToCheck && +decodedToken.id === +idToCheck) {
        next()
      } else if (idToCheck) {
        res.status(403).send({
          message:
            "Forbidden: You cannot access this resource because you are not the owner",
        })
      } else {
        res.status(400).send({
          message:
            "Bad request: Missing the userId somewhere. Check the request.",
        })
      }
    } catch (error) {
      res.status(400).send({ message: "Invalid token" })
    }
  }
}

export default UserIntegrity
