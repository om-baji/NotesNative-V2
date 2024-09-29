import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
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
      async authorize(credentials: any) {
        console.log(credentials);
        return {
          id: "2",
        };
      },
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || ""
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,

});

export const GET = handler;
export const POST = handler;
