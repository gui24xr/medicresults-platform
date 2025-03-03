import { NextResponse } from "next/server";
import { PatientsRepository } from "@/app/libs/repositories/patients.repositories";

interface Params{
    params: {
        id:string
    }
}

const patientsRepository = PatientsRepository.getInstance()

export async function GET(request: Request,{ params }:Params) {
    try{
        const {id} = await params
        const foundedPatient = await patientsRepository.getPatientById(id)
        if (!foundedPatient) return NextResponse.json({message: 'Patient Not Found'},{status: 404})
        return NextResponse.json(foundedPatient)
    } catch(error){
        return NextResponse.json(
            { message: 'Error interno del servidor' },
            { status: 500 }
          )
    }
}


export async function PUT(request:Request,{params}:Params) {
    try{
        const {id} = await params
        const data = await request.json()
        const updatedPatient = await patientsRepository.updatePatientById(id,data)
        return NextResponse.json(updatedPatient)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}


export async function DELETE(request:Request,{params}:Params) {
    try{
        const {id} = await params
        const deletedPatient = await patientsRepository.deletePatientById(id)
        return NextResponse.json(deletedPatient)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}
