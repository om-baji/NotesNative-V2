"use client"

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { loginInfo, loginSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const form = useForm<loginInfo>({
    resolver: zodResolver(loginSchema),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const onSubmit = (data: loginInfo) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left Side - Login Form */}
        <div className="p-8 flex flex-col justify-center bg-gray-800">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-400">Email</label>
              <input
                className="p-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="email"
                placeholder="someone@xyz.com"
                id="email"
                {...register("email")}
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-400">Password</label>
              <input
                className="p-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="password"
                placeholder="Password"
                id="password"
                {...register("password")}
              />
              {errors.password && <span className="text-red-500">Password is required</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side - Partition and OAuth Sign-in */}
        <div className="bg-gray-700 p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white mb-6">Or Sign In With</h2>

          {/* GitHub Button */}
          <button
            onClick={() => signIn("github")}
            className="bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center gap-3 mb-4 w-full justify-center hover:bg-gray-200 transition duration-300 shadow-md"
          >
            <img src="data:image/png;base64,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" alt="GitHub" className="w-6 h-6" />
            <span>Sign in with GitHub</span>
          </button>

          {/* Google Button */}
          <button
            onClick={() => signIn("google")}
            className="bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center gap-3 w-full justify-center hover:bg-gray-200 transition duration-300 shadow-md"
          >
            <img src="https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png" alt="Google" className="w-6 h-6" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
