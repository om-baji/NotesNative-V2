"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const AppBar = () => {
  const { data: session, status } = useSession(); // Destructure session and status
  const loading = status === "loading"; // Use loading status

  return (
    <div className="grid grid-cols-[60%_40%] p-3 bg-zinc-900 backdrop-blur-2xl">
      <div className="text-lg text-bold ml-4 mt-2 hover:text-blue-500">
        <Link href="/">Notes Native</Link>
      </div>

      <div className="flex justify-end gap-4 mr-4">
        {!loading && session?.user ? (
          <>
            <span className="mt-2">{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 p-2 rounded-lg pl-4 pr-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="bg-blue-600 p-2 rounded-lg pl-4 pr-4"
            >
              Login
            </button>
            <button className="bg-blue-600 p-2 rounded-lg pl-4 pr-4">
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppBar;
