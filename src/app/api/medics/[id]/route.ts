import { NextResponse } from "next/server";
import { MedicsRepository } from "@/app/libs/repositories/medics.repository";
import {z} from 'zod'

interface Params{
    params: {
        id: string
    }
}

const medicsRepository = MedicsRepository.getInstance()

export async function GET(request:Request, { params }:Params) {
    try{
        const { id } = await params
        z.string().uuid().parse(id);
        const foundedMedic = await medicsRepository.getMedicById(id)
        if (!foundedMedic) return NextResponse.json(
                { message: 'Médico no encontrado' },
                { status: 404 })
        return NextResponse.json(foundedMedic);
    } catch(error){
        return NextResponse.json(
            { message: 'Error interno del servidor' },
            { status: 500 }
          )
    }
    
  }

export async function PUT(request:Request, {params}:Params) {
    try{
        const { id } = await params;
        z.string().uuid().parse(id);
        const data = await request.json()
        const updatedMedic = await medicsRepository.updateMedicById(id,data)
        return NextResponse.json(updatedMedic)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}

export async function DELETE (request: Request,{params}:Params) {
    try{
        const {id} = await params;
        z.string().uuid().parse(id);
        const deletedMedic = await medicsRepository.deleteMedicById(id)
        return NextResponse.json(deletedMedic)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }

}