"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/v1/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, username, password }),
      });

      const data = await res.json();
     

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage("✅ Account created successfully!");

        setFullName("");
        setEmail("");
        setUsername("");
        setPassword("");
        // Redirect after 1 second
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      }
    } catch (error) {
      setMessage("❌ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-center text-2xl py-4">Finish Signing Up</h1>
      <form
        className="max-w-sm mx-auto px-2 space-y-6 pt-10"
        onSubmit={handleSignUp}
      >
        {/* Username */}
        <div className="flex flex-col gap-0.5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <span className="text-gray-500 text-xs">
            Make sure username is unique
          </span>
        </div>

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

        {/* Full Name */}
        <div className="flex flex-col gap-0.5">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Your Full Name"
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
          {loading ? "Creating..." : "Agree and Continue"}
        </button>

        <div>
          <span>Already have an account?</span>
          <Link
            href={"/signin"}
            className="text-blue-700 underline underline-offset-2 pl-4"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
