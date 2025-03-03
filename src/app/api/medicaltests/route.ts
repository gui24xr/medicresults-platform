import { NextResponse } from "next/server";
import { MedicalTestsRepository} from "@/app/libs/repositories/medicalTests.repository";
import { medicalTestSchema } from "@/app/schemas/medicalTest.schema";

const medicalTestsRepository = MedicalTestsRepository.getInstance()

export async function GET() {
    try{
        const medicalTests = await medicalTestsRepository.getMedicalTests()
        return NextResponse.json(medicalTests)
    }catch(error:any){
        return NextResponse.json(
            { message: 'Error al intentar obtener medicalTests', error: error.message },
            { status: 500 }
          );
    }
}

export async function POST(request:Request) {
    try{
        const data = await request.json()
        medicalTestSchema.parse(data)
        const newMedicalTest = await medicalTestsRepository.createMedicalTest(data)
        return NextResponse.json(newMedicalTest)
    }catch(error:any){
        return NextResponse.json(
            { message: 'Error al intentar obtener usuarios', error: error.message },
            { status: 500 }
        );
    }
}