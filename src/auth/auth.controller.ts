import { Request, Response } from "express"
import ms from "ms"
import { UsersService } from "../users/users.service"
import { AuthService } from "./auth.service"
import createJwtPayload from "./jwt-payload"

export class AuthController {
  public static async login(req: Request, res: Response) {
    try {
      const user = await UsersService.findOneAuthentification(req.body.email)
      if (!user) throw new Error("Invalid credentials")

      const validPassword = AuthService.comparePassword(
        req.body.password,
        user.password,
      )

      if (!validPassword) throw new Error("Invalid credentials")

      // generate the JwtPayload
      const userToken = createJwtPayload(user)

      // generate the token
      const accessToken = AuthService.createAccessToken(userToken)
      const refreshToken = AuthService.createRefreshToken(userToken)

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + ms("7d")),
      })

      res.status(200).json({
        accessToken: accessToken,
      })
    } catch (error: unknown) {
      res.status(400).send({ message: (error as any).message })
    }
  }

  public static async verifyAccessToken(req: Request, res: Response) {
    try {
      AuthService.verifyAccessToken(req.body.accessToken)
      res.status(200).json({ isValid: true })
    } catch (error: unknown) {
      res.status(400).json({ isValid: false })
    }
  }

  public static async refresh(req: Request, res: Response) {
    try {
      // Check if the refresh token is present
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) throw new Error("No token provided")
      // Verify the refresh token
      const decodedToken = AuthService.verifyRefreshToken(refreshToken)

      // Get the user from the refresh token
      const user = await UsersService.findOneAuthentification(
        decodedToken.email,
      )
      if (!user) throw new Error("Invalid token")

      // generate the JwtPayload
      const userToken = createJwtPayload(user)

      // generate the token
      const accessToken = AuthService.createAccessToken(userToken)

      res.status(200).json({
        accessToken: accessToken,
      })
    } catch (error) {
      res.status(400).send({ message: (error as any).message })
    }
  }

  public static async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken")

    res.status(200).send({ message: "Logged out" })
  }
}
