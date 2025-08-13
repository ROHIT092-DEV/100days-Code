"use client";

import React from "react";
// import useUserStore from "@/store/userStore"; // ✅ import your Zustand store

import { useAuthStore } from "@/store/useAuthStore";
import Hero from "@/components/Hero";

export default function HomePage() {
  const { user } = useAuthStore(); // ✅ grab user from store

  return (
    <div className="">
     <Hero />
    </div>
  );
}
