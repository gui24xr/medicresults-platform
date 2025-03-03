import { threadId } from "worker_threads"
import {prismaClient} from "../prisma"
import { DiagnosticType, MedicalTest } from "@prisma/client"

interface MedicalTestData {
    date:Date,
    medicId:string,
    patientId:string,
    diagnosticType?:string,
    diagnosticText:string,
    accessCode:string,
    pdfUrl:string,
    imagesFolderUrl:string,
    expirationDate:Date
}


export class MedicalTestsRepository{
    private static instance: MedicalTestsRepository
    private constructor() {}

    static getInstance(){
        if (!MedicalTestsRepository.instance) MedicalTestsRepository.instance = new MedicalTestsRepository()
        return MedicalTestsRepository.instance
    }

    async createMedicalTest(data:MedicalTestData) : Promise<MedicalTest>{
        try{
         return prismaClient.medicalTest.create({
            data:{
                date: data.date,
                medicId: data.medicId,
                patientId: data.patientId,
                diagnosticType: data.diagnosticType as DiagnosticType,
                diagnosticText: data.diagnosticText,
                accessCode: data.accessCode,
                pdfUrl: data.pdfUrl,
                imagesFolderUrl: data.imagesFolderUrl,
                expirationDate: data.expirationDate
            }
         })
        }catch(error:any){
            throw error
        }
    }

    async getMedicalTests() : Promise<Array<MedicalTest>> {
        try{
            return prismaClient.medicalTest.findMany()
        }catch(error:any){
            throw error
        }
    }

    async getMedicalTestById(id:string) : Promise<MedicalTest | null> {
        try{
            return await prismaClient.medicalTest.findFirst({where:{id:id}})
        }catch(error:any){
            throw error
        }
    }

    async updateMedicalTestById(id:string,updateData:Partial<MedicalTestData>) : Promise<MedicalTest> {
        try{
            return prismaClient.medicalTest.update({
                where:{id:id},
                data:{
                    date: updateData.date,
                    medicId: updateData.medicId,
                    patientId: updateData.patientId,
                    diagnosticType: updateData.diagnosticType as DiagnosticType,
                    diagnosticText: updateData.diagnosticText,
                    accessCode: updateData.accessCode,
                    pdfUrl: updateData.pdfUrl,
                    imagesFolderUrl: updateData.imagesFolderUrl,
                    expirationDate: updateData.expirationDate
                } 

            })
        }catch(error:any){
            throw error
        }
    }

    async deleteMedicalTestById(id:string) : Promise<MedicalTest>{
        try{
            return prismaClient.medicalTest.delete({where:{id:id}})
        }catch(error:any){
            throw error
        }
    }

}