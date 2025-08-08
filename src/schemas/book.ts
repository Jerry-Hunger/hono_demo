import { z } from 'zod'

export const createUserSchema = z.object({
  title: z
    .string({ message: 'title must be a string' })
    .min(1, { message: 'title must be a non-empty string' })
    .refine((val) => val.trim().length > 0, { message: 'title cannot be empty or whitespace' }),
  author: z
    .string({ message: 'author must be a string' })
    .min(1, { message: 'author must be a non-empty string' })
    .refine((val) => val.trim().length > 0, { message: 'author cannot be empty or whitespace' })
})

export const updateUserSchema = z.object({
  title: z
    .string({ message: 'title must be a string' })
    .min(1, { message: 'title must be a non-empty string' })
    .refine((val) => val.trim().length > 0, { message: 'title cannot be empty or whitespace' })
    .optional(),
  author: z
    .string({ message: 'author must be a string' })
    .min(1, { message: 'author must be a non-empty string' })
    .refine((val) => val.trim().length > 0, { message: 'author cannot be empty or whitespace' })
    .optional()
})

export type createUserDto = z.infer<typeof createUserSchema>
export type updateUserDto = z.infer<typeof updateUserSchema>
