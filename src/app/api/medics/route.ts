import { NextResponse } from "next/server";
import { MedicsRepository } from "@/app/libs/repositories/medics.repository";

const medicsRepository = MedicsRepository.getInstance()


export async function GET () {
    const medics = await medicsRepository.getMedics()
    return NextResponse.json(
         medics
    )
}

export async function POST (request: Request){
     const data = await request.json()
     const newMedic = await medicsRepository.createMedic(data)
     return NextResponse.json(newMedic)
}