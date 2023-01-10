import { z } from "zod"

const VerifyBody = z.object({
  accessToken: z.string(),
})

const VerifySchema = z.object({
  body: VerifyBody,
})

type Verify = z.infer<typeof VerifyBody>

export type { Verify }
export { VerifySchema }
