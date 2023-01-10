import { z } from "zod"
import { ParamIdSchema } from "../../utils/generic-schema"

const ResetPasswordBody = z
  .object({
    code: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password && password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      })
    }
  })

const ResetPasswordSchema = z.object({
  params: ParamIdSchema,
  body: ResetPasswordBody,
})

type ResetPassword = z.infer<typeof ResetPasswordBody>

export type { ResetPassword }
export { ResetPasswordSchema }
