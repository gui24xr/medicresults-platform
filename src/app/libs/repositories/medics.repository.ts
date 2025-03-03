import { prismaClient } from "../prisma.ts";
import { Medic } from "@prisma/client";

interface MedicData {
    medicRecord: string;
    firstName: string;
    lastName: string;
    whatsApp: string;
    email: string;
  }

export class MedicsRepository {

private static instance: MedicsRepository;
private constructor() {}

static getInstance(): MedicsRepository {
    if (!MedicsRepository.instance) {
      MedicsRepository.instance = new MedicsRepository();
    }
    return MedicsRepository.instance;
  }

async createMedic(data:MedicData) : Promise<Medic> {
    try {
        return prismaClient.medic.create({data})
    } catch (error:any) {
          throw error;
        }
    }
  
async getMedics() : Promise<Array<Medic>> {
    try {
        return prismaClient.medic.findMany()
    } catch (error:any) {
      throw error;
    }
  }

async getMedicById(id:string) : Promise <Medic | null> {
    try {
      return prismaClient.medic.findFirst({where:{id:id}})
    } catch (error:any) {
      throw error;
    }
  }

async updateMedicById(id:string,updateData:Partial<MedicData>) {
    try {
      return prismaClient.medic.update({
        where:{id:id},
        data: updateData
    })
    } catch (error:any) {
      throw error;
    }
  }

async deleteMedicById(id:string) : Promise<Medic> {
  try {
    return prismaClient.medic.delete({where:{id:id}})
    } catch (error:any) {
      throw error;
    }
  }


}
