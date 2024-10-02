"use server";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";


const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          placeholder: "someone@xyz.com",
          label: "Email",
          type: "text",
        },
        password: {
          placeholder: "Someone@123",
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<any> {
        console.log(credentials);
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.username,
            },
          });

          if (user && credentials?.password) {
            const isValidPassword = await bcrypt.compare(
              credentials.password,
              user.password || ""
            );
            if (isValidPassword) {
              return user;
            }
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }): Promise<typeof session> {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});

export const GET = handler;
export const POST = handler;
