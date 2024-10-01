import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  adapter : PrismaAdapter(prisma),
  providers: [
    // CredentialsProvider({
    //   name: "Email",
    //   credentials: {
    //     username: {
    //       placeholder: "someone@xyz.com",
    //       label: "Email",
    //       type: "text",
    //     },
    //     password: {
    //       placeholder: "Someone@123",
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials: any) {
    //     console.log(credentials);
    //     return {
    //       id: "2",
    //     };
    //   },
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      return session;
    },
    //@ts-ignore
    async signIn({ profile }) {
      console.log(profile);
      if (profile) {
        return true;
      }
      return false;
    },
  },
});

export const GET = handler;
export const POST = handler;
