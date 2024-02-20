"use client"

import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const Login = () => {
  const router=useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, isLoading }] =useLoginMutation();
  

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (data?.token && data?.user) {
      console.log(data);
      alert("login successsfull");
      
      router.push("/");
     
    }
  }, [data, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Password
              </label>
              <input
                id="Password"
                name="Password"
                type="Password"
                autoComplete="Password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-red-600">
          <Link href="/customer/registration">New User?</Link>
          <br />
          <Link href="/customer/forgotPassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
