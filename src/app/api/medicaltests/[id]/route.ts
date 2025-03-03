import { NextResponse } from "next/server";
import { MedicalTestsRepository } from "@/app/libs/repositories/medicalTests.repository";
import {z} from 'zod'

interface Params{
    params: {
        id:string
    }
}

const medicalTestsRepository = MedicalTestsRepository.getInstance()

export async function GET(request:Request,{params}:Params){
    try{
        const {id} = await params
        z.string().uuid().parse(id);
        const foundedMedicalTest = await medicalTestsRepository.getMedicalTestById(id)
        if (!foundedMedicalTest) return NextResponse.json({message: 'MedicalTst Not Found'},{status: 404})
        return NextResponse.json(foundedMedicalTest)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}

export async function PUT(request:Request,{params}:Params){
    try{
        const {id} = await params
        z.string().uuid().parse(id);
        const data = await request.json()
        const updatedMedicalTest = await medicalTestsRepository.updateMedicalTestById(id,data)
        return NextResponse.json(updatedMedicalTest)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}

export async function DELETE(request:Request,{params}:Params){
    try{
        const {id} = await params
        z.string().uuid().parse(id);
        const deletedMedicalTest = await medicalTestsRepository.deleteMedicalTestById(id)
        return NextResponse.json(deletedMedicalTest)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}