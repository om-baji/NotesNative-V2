import { z, ZodLazy } from "zod";

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(4)
})

export const signupSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string()
}) 

export const notesSchema = z.object({
    title : z.string().min(1,{message : "Required"}),
    description : z.string().min(1,{message : "Required"}),
})

export type loginInfo = z.infer<typeof loginSchema>

export type signupInfo = z.infer<typeof signupSchema>

export type notesInfo = z.infer<typeof notesSchema>

export type noteType = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}