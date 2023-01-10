import { server } from "./src/server"
import { config } from "dotenv"

// Import environment variables
config({ path: ".env" })

console.clear()
console.log("\x1b[1m\x1b[33m🚀 Starting server...")
server.start()
