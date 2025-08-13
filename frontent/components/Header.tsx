"use client";

import Image from "next/image";
import logo from "../images/logo.jpg";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];


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

  return (
    <header className="flex justify-between py-2 px-4">
      {/* DeskTop View */}

      <Link href="/">
        <Image src={logo} alt="" width={100} height={60} />
      </Link>

      <div className="lg:flex space-x-12 items-center hidden">
        <div className="flex space-x-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group px-2 py-1 font-medium transition duration-200
              ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 after:w-full"
                  : "text-gray-700 dark:text-gray-200 after:w-0"
              }
              after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400
              after:transition-all after:duration-300 group-hover:after:w-full
            `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="space-x-4">
          {!user && (
            <Link href="/signup">
              <Button className="cursor-pointer text-xs font-bold">
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
              <Button className="cursor-pointer text-xs font-bold">
                SignIn
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Phone View */}
    </header>
  );
}

export default Header;
