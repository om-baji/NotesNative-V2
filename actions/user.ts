import prisma from "@/utils/db";
import { loginInfo } from "@/utils/types";
import bcrypt from "bcrypt";

export async function login({email,password} : loginInfo){
    try {
        const response = await prisma.user.findUnique({
            where : {
                email
            },
            select : {
                id : true,
                password : true,
                email : true
            }
        })

        if(!response) throw new Error("Something went wrong")

        const isValid = await bcrypt.compare(password,response?.password)

        if(!isValid) throw new Error("Wrong password")


    } catch (e) {
        return 
    }
}