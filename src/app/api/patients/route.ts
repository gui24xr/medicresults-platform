import { NextResponse } from "next/server";
import { PatientsRepository } from "@/app/libs/repositories/patients.repository";
import { patientSchema } from "@/app/schemas/patient.schema";

const patientsRepository = PatientsRepository.getInstance()

export async function GET () {
    const patients = await patientsRepository.getPatients()
    return NextResponse.json(patients)
}

export async function POST (request: Request) {
    try {
        const data = await request.json();
        patientSchema.parse(data)
        const newPatient = await patientsRepository.createPatient(data);
        return NextResponse.json(newPatient);
      } catch (error: any) {
        return NextResponse.json(
          { message: 'Error al crear el paciente', error: error.message },
          { status: 500 }
        );
      }
}