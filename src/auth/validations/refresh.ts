import { z } from "zod"

const RefreshBody = z.object({
  refreshToken: z.string(),
})

const RefreshSchema = z.object({
  body: RefreshBody,
})

type Refresh = z.infer<typeof RefreshBody>

export type { Refresh }
export { RefreshSchema }
