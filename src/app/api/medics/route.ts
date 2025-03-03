import { NextResponse } from "next/server";
import { MedicsRepository } from "@/app/libs/repositories/medics.repository";
import { medicSchema } from "@/app/schemas/medic.schema";

const medicsRepository = MedicsRepository.getInstance()


export async function GET () {
     try{
          const medics = await medicsRepository.getMedics()
    return NextResponse.json(
         medics
    )
     }catch(error:any){
          return NextResponse.json(
               { message: 'Error al intentar obtener medicos', error: error.message },
               { status: 500 }
             );
     }
    
}

export async function POST (request: Request){
     try{
          const data = await request.json()
          medicSchema.parse(data)
          const newMedic = await medicsRepository.createMedic(data)
          return NextResponse.json(newMedic)
     }catch(error:any){
          return NextResponse.json(
               { message: 'Error al intentar crear medico', error: error.message },
               { status: 500 }
             );
     }

}