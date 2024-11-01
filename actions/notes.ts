"use server"
import prisma from "@/utils/db";
import { Session } from "next-auth";


export interface UserSession extends Session{
  id : string;
  email : string;
}

export type AuthStatus = "laoding" | "authenticated" | "unauthenticated";

export async function setNotes({
  title,
  description,
  session,
  status,
}: {
  title: string;
  description: string;
  session: UserSession;
  status: AuthStatus;
}) {
  try {
  if (status !== "authenticated") throw new Error("Unauthorized");
  
    const note = await prisma.note.create({
      data: {
        title,
        description,
        userId: session.user.id,
      },
    });

    return {
      success: true,
      message: "Succesfull",
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
}

export async function getNotes(session : UserSession,status : AuthStatus){
    try {
      if (status !== "authenticated") throw new Error("Unauthorized");

      const notes = await prisma.note.findMany({
        where : {
          userId : session.user.id
        },
        select : {
          id : true,
          title : true,
          description : true,
          createdAt : true,
          updatedAt : true,
          userId : true
        }
      })

      // console.log(notes)

      return {
        notes,
        success : true
      }

    } catch (error) {
      console.log(error)

      return {
        success : false,
        massage : error || "Something went wrong!"
      }
    }
}

export async function getNote(id : string){
  try {
    const note = await prisma.note.findUnique({
      where : {
        id
      }
    })

    if(note) 
    return {
      success : true,
      note
    }
  
  } catch (e) {
    return {
      success : false,
      message : e || "Something went wrong"
    }
  }
}

export async function updateNote(id : string,title : string,description : string){
  try {
    const note = await prisma.note.update({
      where : {
        id
      },
      data : {
        title,
        description
      }
    })

    if(!note) throw new Error("Something went wrong!")
      
    return {
      success : true,
      note
    }
    
  } catch (error) {
    return {
        success : false,
        message : error || "Something went wrong!"
    }
  }
}
