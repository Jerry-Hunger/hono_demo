import { z } from 'zod'

export const createUserSchema = z.object({
  title: z.string().nonempty({ message: 'title must be a non-empty string' }),
  author: z.string().nonempty({ message: 'author must be a non-empty string' })
})

export type createUserDto = z.infer<typeof createUserSchema>
