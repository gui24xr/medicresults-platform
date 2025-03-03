import { prismaClient } from "../prisma"
import { Patient } from "@prisma/client"

interface PatientData {
    dni:string,
    firstName: string,
    lastName:string,
    patientRecord?: string,
    healthCare?:string,
    whatsApp?:string,
    email?: string
}


export class PatientsRepository{
    private static instance: PatientsRepository
    private constructor() {}

    static getInstance(): PatientsRepository {
        if(!PatientsRepository.instance)PatientsRepository.instance = new PatientsRepository()
        return PatientsRepository.instance
    }

    async createPatient(data:PatientData) : Promise<Patient> {
        try{
            return prismaClient.patient.create({data})
        }catch(error:any){
            throw error
        }
    }

    async getPatients() : Promise<Array<Patient>> {
        try{
            return prismaClient.patient.findMany()
        }catch(error:any){
            throw error
        }
    }

    async getPatientById(id:string) : Promise<Patient | null> {
        try{
            return prismaClient.patient.findFirst({where:{id:id}})
        }catch(error:any){
            throw error
        }
    }

   async updatePatientById(id:string,updateData:Partial<PatientData>) {
    try{
        return prismaClient.patient.update({
            where:{id:id},
            data: updateData
        })
    }catch(error:any){
        throw error
    }
   }

   async deletePatientById(id:string) : Promise<Patient> {
    try{
        return prismaClient.patient.delete({where:{id:id}})
    }catch(error:any){
        throw error
    }
   }
}
