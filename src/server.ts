import express, {
  Request,
  Response,
  urlencoded,
  Express,
  NextFunction,
} from "express"
import * as http from "http"
import cookieParser from "cookie-parser"
import { createRouter } from "./router"

class Server {
  private readonly _app: Express
  private _server!: http.Server

  private allowCrossDomain = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.header("Origin", process.env.APP_URL)
    res.header("Access-Control-Allow-Origin", process.env.APP_URL)
    res.header("Access-Control-Allow-Methods", "GET,PUT, PATCH,POST,DELETE")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    )
    res.header("Access-Control-Allow-Credentials", "true")

    next()
  }

  constructor() {
    this._app = express()
    this._app.use(express.json())
    this._app.use(this.allowCrossDomain)
    this._app.use(urlencoded({ extended: true }))
    this._app.use(cookieParser())

    this._app.set("port", process.env.PORT || 3000)
  }

  get app(): Express {
    return this._app
  }

  get server(): http.Server {
    return this._server
  }

  public async start() {
    // Add routes to the app
    createRouter(this._app)

    // Start the server
    this._server = this._app.listen(this._app.get("port"), () => {
      console.log("🚀 Server is running on port " + this._app.get("port"))
      console.log(
        `📄 Swagger is available at: http://localhost:${this._app.get(
          "port",
        )}/docs`,
      )
      console.log("\x1b[0m")
    })
  }
}

export const server = new Server()
