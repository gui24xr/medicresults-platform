import {z} from 'zod'

export const userSchema = z.object({
    email: z.string().email(),
    role: z.enum(["medic","patient","dev"]),
    relatedId: z.string().uuid().optional()
})