import { compareSync } from "bcrypt"
import { sign, verify } from "jsonwebtoken"
import { readFileSync } from "fs"
import { JwtPayload } from "./jwt-payload"
import ms from "ms"

const accessTokenPrivateKey = readFileSync("./jwt/accessToken/id_rsa", "utf8")
const refreshTokenPrivateKey = readFileSync("./jwt/refreshToken/id_rsa", "utf8")

export class AuthService {
  public static comparePassword(
    plainPassword: string,
    passwordHash: string,
  ): boolean {
    const compared = compareSync(plainPassword, passwordHash)
    return compared
  }

  public static createAccessToken(userToken: JwtPayload): string {
    return sign(userToken, accessTokenPrivateKey, {
      algorithm: "RS256",
      expiresIn: ms("1h"),
    })
  }

  public static createRefreshToken(userToken: JwtPayload): string {
    return sign(userToken, refreshTokenPrivateKey, {
      algorithm: "RS256",
      expiresIn: ms("7d"),
    })
  }

  public static verifyAccessToken(token: string): JwtPayload {
    try {
      const tokenData = verify(token, accessTokenPrivateKey, {
        algorithms: ["RS256"],
      })
      return tokenData as JwtPayload
    } catch (error) {
      throw new Error("Invalid token")
    }
  }

  public static verifyRefreshToken(token: string): JwtPayload {
    try {
      const tokenData = verify(token, refreshTokenPrivateKey, {
        algorithms: ["RS256"],
      })
      return tokenData as JwtPayload
    } catch (error) {
      throw new Error("Invalid token")
    }
  }
}
