import { NextResponse } from "next/server";
import { UsersRepository } from "@/app/libs/repositories/users.repository";
import { userSchema } from "@/app/schemas/user.schema";
import { z } from 'zod'

const usersRepository = UsersRepository.getInstance()

export async function GET() {
    try{
        const patients = await usersRepository.getUsers()
        return NextResponse.json(patients) 
    }catch(error:any){
        return NextResponse.json(
            { message: 'Error al intentar obtener usuarios', error: error.message },
            { status: 500 }
          );
    }
}

export async function POST(request:Request){
    try{
        const data = await request.json()
        userSchema.parse(data)
        const newUser = await usersRepository.createUser(data)
        return NextResponse.json(newUser)
    }catch(error:any){
        return NextResponse.json(
            { message: 'Error al intentar crear usuarios', error: error.message },
            { status: 500 }
          );
    }
}