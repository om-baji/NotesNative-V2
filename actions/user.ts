"use server"
import prisma from "@/utils/db";
import { signupInfo } from "@/utils/types";
import bcrypt from "bcryptjs";

export async function signup({ name, email, password }: signupInfo) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashPass = await bcrypt.hash(password, 10);
    const response = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
      },
    });
    if (!response) throw new Error("Something went wrong");

    return {
      success: true,
      message : "Succesfully created!"
    };
  } catch (e) {
    return {
        success : false,
        message : e
    }
  }
}
