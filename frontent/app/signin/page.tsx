"use client";
import Link from "next/link";
import { useState } from "react";

function page() {
  
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  //  Login Logic Here

  
  }

  return (
    <div>
      <h1 className="font-bold text-center text-2xl py-4">Login</h1>
      <form className="max-w-sm mx-auto px-2 space-y-6 pt-10" onSubmit={handleSignin}>
        {/* Email */}
        <div className="flex flex-col gap-0.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-0.5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="w-full py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-800 py-2 w-full rounded-sm text-white shadow-md"
       
        >
          {loading ? "Signin Inprogress..." : "SignIn"}
        </button>

        <div>
          <span>Already have an account?</span>
          <Link
            href={"/signup"}
            className="text-blue-700 underline underline-offset-2 pl-4"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default page;
