"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { setUser } = useAuthStore(); // ✅ Use Zustand store

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/v1/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user); // ✅ Save user in Zustand
        router.push("/"); // ✅ Redirect after login
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-center text-2xl py-4">Login</h1>
      <form
        className="max-w-sm mx-auto px-2 space-y-6 pt-10"
        onSubmit={handleSignin}
      >
        <div className="flex flex-col gap-0.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="w-full py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-800 py-2 w-full rounded-sm text-white shadow-md"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center">
          <span>Don't have an account?</span>
          <Link
            href="/signup"
            className="text-blue-700 underline underline-offset-2 pl-2"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
