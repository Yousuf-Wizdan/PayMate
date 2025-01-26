import z from 'zod'

export const userSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50)
})

export const signInSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6)
})

export const updateUserSchema = z.object({
    password: z.optional(z.string().min(6)),
    firstName: z.optional(z.string().max(50)),
    lastName: z.optional(z.string().max(50))
})