"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AppBar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-lg">
      <div className="text-2xl font-semibold text-white hover:text-blue-400 transition mb-2 sm:mb-0">
        <Link href="/notes">Notes Native</Link>
      </div>

      <div className="flex items-center gap-4">
        {!loading && session?.user ? (
          <>
            <Link className="text-blue-700 text-sm"
            href={"/notes/create"}>+ Add Notes</Link>
            <span className="text-white font-medium">{session.user.email}</span>
            <button
              onClick={() => {
                signOut()
                toast.success("Signed out!")}}
              className="px-4 py-2 bg-red-600/70 text-white rounded-lg hover:bg-red-500/80 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-blue-600/70 text-white rounded-lg hover:bg-blue-500/80 transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="px-4 py-2 bg-green-600/70 text-white rounded-lg hover:bg-green-500/80 transition"
            >
              Register
            </button>
            <button
              onClick={() => router.push("/notes")}
              className="px-4 py-2 bg-purple-600/70 text-white rounded-lg hover:bg-purple-500/80 transition"
            >
              Notes
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppBar;
