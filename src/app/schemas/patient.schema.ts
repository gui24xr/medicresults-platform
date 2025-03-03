import { z } from 'zod'
import { dniSchema,nameSchema,phoneSchema, recordNumbersSchema } from './defaultvalues'

export const patientSchema = z.object({
    dni: dniSchema,
    firstName: nameSchema,
    lastName: nameSchema,
    patientRecord: recordNumbersSchema,
    healthCare: z.string().optional(),
    whatsApp: phoneSchema.optional(),
    email: z.string().email()
})