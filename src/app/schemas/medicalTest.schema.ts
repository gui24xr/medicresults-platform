import {z} from 'zod'
import { accessCodeSchema } from './defaultvalues'

export const medicalTestSchema = z.object({
    date: z.date(),
    medicId: z.string().uuid(),
    patientId: z.string().uuid(),
    diagnosticType: z.enum(["imaging","laboratory","screenings"]),
    diagnosticText: z.string(),
    accessCode: accessCodeSchema,
    pdfUrl: z.string().url(),
    imagesFolderUrl: z.string().url(),
    expirationDate: z.date().optional(),

})