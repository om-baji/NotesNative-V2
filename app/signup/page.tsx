"use client"

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { signupInfo, signupSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signup } from "@/actions/user";
import { toast } from 'react-hot-toast';

const Login = () => {
  const form = useForm<signupInfo>({
    resolver: zodResolver(signupSchema),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: signupInfo) => {
    console.log(data);
    try {
      const user = await signup(data)

      if (user.success) {
        const userData = await signIn("credentials", {
          username: data.email,
          password: data.password,
          callbackUrl: "/notes"
        })
      }

      toast.success("Signup successful!", {
        duration: 4000
      });

    } catch (e) {
      toast.error("Signup failed. Please try again.", {
        duration: 4000
      });
    }

  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">

      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        <div className="p-8 flex flex-col justify-center bg-gray-800">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-400">Name</label>
              <input
                className="p-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="text"
                placeholder="Someone"
                id="name"
                {...register("name")}
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
            </div>

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

            <div className="text-sm text-neutral-400">
              Already have an account? <Link className="text-blue-600 text-sm" href={"/login"}>Login</Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition duration-300"
            >
              {isSubmitting ? "Loading..." : "Register with Email"}
            </button>

          </form>
        </div>

        <div className="bg-gray-700 p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white mb-6">Or Sign In With</h2>

          <button
            onClick={() => signIn("github", { callbackUrl: "/notes" })}
            className="bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center gap-3 mb-4 w-full justify-center hover:bg-gray-200 transition duration-300 shadow-md"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-6 h-6" />
            <span>Sign in with GitHub</span>
          </button>

          <button
            onClick={() => signIn("google", { callbackUrl: "/notes" })}
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
