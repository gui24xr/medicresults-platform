import { z }from 'zod'
import { dniSchema,nameSchema,phoneSchema, recordNumbersSchema } from './defaultvalues'

export const medicSchema = z.object({
    medicRecord:recordNumbersSchema,
    firstName: nameSchema,
    lastName: nameSchema,
    whatsApp: phoneSchema,
    email: z.string().email({ message: "Email inválido" }),
})