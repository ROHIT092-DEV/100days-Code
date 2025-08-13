"use client";

import React from "react";
// import useUserStore from "@/store/userStore"; // ✅ import your Zustand store

import { useAuthStore } from "@/store/useAuthStore";

export default function HomePage() {
  const { user } = useAuthStore(); // ✅ grab user from store

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {user ? (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome, {user.firstName} {user.lastName} 👋
          </h1>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>
        </div>
      ) : (
        <h1 className="text-xl text-gray-600">
          Please log in to see your details.
        </h1>
      )}
    </div>
  );
}
