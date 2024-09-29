"use client";

import AppBar from "@/components/AppBar";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { redirect: false, email, password });
  };

  return (
    <div className="bg-black min-h-screen">
      <AppBar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign In</h2>

          <form onSubmit={handleCredentialsSignIn} className="space-y-4">
            <div>
              <label className="block text-gray-200">Email</label>
              <input
                type="email"
                placeholder="someone@xyz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-zinc-800 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-200">Password</label>
              <input
                type="password"
                placeholder="Someone@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-zinc-800 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Sign in with Credentials
            </button>
          </form>

          <div className="my-6 border-t border-gray-600"></div>

          <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
