"use client";

import Image from "next/image";
import logo from "../images/logo.jpg";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { button } from "framer-motion/client";

// import { IconGitBranch } from "@tabler/icons-react"

function Header() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuthStore();
  const router = useRouter();

  console.log(user?.role)

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async (e: any) => {
    // e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/logout", {
        method: "POST",
        credentials: "include", // important for cookies
      });

      // If you store user in Zustand/context, reset it here

      logout(); // clears Zustand store

      // if (res.ok) {
      //   router.push("/");
      // }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSignInButton = (e: any) => {
    router.push("/signin");
    setIsModelOpen(false);
  };

  return (
    <header className="flex justify-between py-2 px-4 items-center">
      {/* DeskTop View */}

      <Link href="/">
        <Image src={logo} alt="" width={100} height={60} />
      </Link>

      <div className="lg:flex space-x-12 items-center hidden">
        <div className="space-x-4 flex">
          {user && <Link href="/my-view" className="bg-gray-200 p-2 text-black hover:text-indigo-600 cursor-pointer rounded-sm">My View</Link>}

          {user?.role === "admin" && <Link href="/admin" className="bg-gray-200 p-2 text-black hover:text-indigo-600 cursor-pointer rounded-sm">Admin dashboard</Link>}

          {!user && (
            <Link href="/signup">
              <Button variant="outline" size="sm" className="cursor-pointer">
                SignUp
              </Button>
            </Link>
          )}

          {user ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg">
                <span className="font-semibold">{user.email}</span>
              </div>
              <Button
                className="cursor-pointer text-xs font-bold"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/signin">
              <Button variant="outline" size="sm" className="cursor-pointer ">
                {/* <IconGitBranch /> */}
                SignIn
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Phone View */}

      <Button
        onClick={() => setIsModelOpen(true)}
        className="p-2 text-white md:hidden"
      >
        <Menu />
      </Button>

      <AnimatePresence>
        {isModelOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModelOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 p-6 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between">
                <Link href="/">
                  <Image src={logo} alt="" width={60} height={60} />
                </Link>

                <button
                  className="mb-8 self-end"
                  onClick={() => setIsModelOpen(false)}
                >
                  <X size={28} />
                </button>
              </div>

              {/* Login Button */}

              <div className="flex flex-col gap-2">
                {user && (
                  <div>
                    <Button
                      className="w-full text-black cursor-pointer"
                      variant="outline"
                      size="sm"
                    >
                      My View
                    </Button>
                  </div>
                )}

                {user?.role === "admin" && (
                  <Button
                    className="w-full text-black cursor-pointer"
                    variant="outline"
                    size="sm"
                  >
                    My Admin DashBoard
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                {user ? (
                  <div className="space-x-2">
                    {user.email}
                    <Button className="text-xs" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={handleSignInButton}
                    className="bg-gray-200 py-2 text-black hover:text-indigo-600 cursor-pointer rounded-sm"
                  >
                    SignIn
                  </button>
                )}

                {!user && (
                  <button
                    onClick={handleSignInButton}
                    className="bg-gray-200 py-2 text-black hover:text-indigo-600 cursor-pointer rounded-sm"
                  >
                    signUp
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
