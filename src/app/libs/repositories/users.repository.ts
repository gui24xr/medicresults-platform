import { prismaClient } from '../prisma'
import { User, Role } from '@prisma/client'

interface UserData {
    email:string,
    role:string,
    relatedId:string
}

export class UsersRepository{
    private static instance : UsersRepository;
    private constructor(){}

    static getInstance() : UsersRepository{
        if (!UsersRepository.instance) UsersRepository.instance = new UsersRepository()
        return UsersRepository.instance
    }

    async createUser(newUserData:UserData) : Promise<User> {
        try{
            return prismaClient.user.create({
                data: {...newUserData, role: newUserData.role as Role}
            })
        }catch(error:any){
            throw error
        }
    }

    async getUsers() : Promise<Array<User>> {
        try{
            return prismaClient.user.findMany()
        }catch(error:any){
            throw error
        }
    }

    async getUserById(id:string) : Promise<User | null> {
        try{
            return prismaClient.user.findFirst({where:{id:id}})
        }catch(error:any){
            throw error
        }
    }

    async updateUserById(id:string,updateData:Partial<UserData>) : Promise<User> {
        try{
            return prismaClient.user.update({
                where:{id:id},
                data: {...updateData, role: updateData.role as Role}
            })
        }catch(error:any){
            throw error
        }
    }

    async deleteUserById(id:string) : Promise<User> {
        try{
            return prismaClient.user.delete({where:{id:id}})
        }catch(error:any){
            throw error
        }
    }
    

}
