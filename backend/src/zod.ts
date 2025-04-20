import {z} from "zod"

export const signupInput = z.object({
  name: z.string().optional(),
  email:z.string().email(),
  password:z.string().min(5)
})

export type signupInput=z.infer<typeof signupInput>