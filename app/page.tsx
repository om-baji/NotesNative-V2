"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-4 dark:bg-dark ">
        <h1 className="text-6xl font-bold">Notes Native!</h1>
        <h2 className="text-gray-500">The right place for all kinds of notes</h2>

        <div className="flex justify-center gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 p-2 rounded-lg pl-4 pr-4"
        >
          Login
        </button>
        <button onClick={() => router.push("/signup")}
        className="bg-blue-600 p-2 rounded-lg pl-4 pr-4">
          Register
        </button>
        </div>
        

      </div>
    </div>

  );
}
