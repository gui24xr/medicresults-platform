import { NextResponse } from "next/server";
import { UsersRepository } from "@/app/libs/repositories/users.repository";
import {z} from 'zod'

interface Params{
    params: {
        id:string
    }
}

const usersRepository = UsersRepository.getInstance()

export async function GET(request:Request,{params}:Params) {
    try{
        const {id} = await params
        z.string().uuid().parse(id);
        const foundedUser = await usersRepository.getUserById(id)
        if (!foundedUser) return NextResponse.json({message: 'User Not Found'},{status: 404})
        return NextResponse.json(foundedUser)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}

export async function PUT(request:Request,{params}:Params) {
    try{
        const {id} = await params
        z.string().uuid().parse(id);
        const data = await request.json()
        const updatedUser = await usersRepository.updateUserById(id,data)
        return NextResponse.json(updatedUser)
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
        const deletedUser = await usersRepository.deleteUserById(id)
        return NextResponse.json(deletedUser)
    }catch(error:any){
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
          )
    }
}