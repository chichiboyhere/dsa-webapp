// components/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu, ChevronDown, UserCircle, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsExpanded, setProgramsExpanded] = useState(false);

  const { role, isLoading } = useAuth();
  const programLinks = [
    { label: "O'LEVEL TRACK", href: "/programs#olevel" },
    { label: "A'LEVEL TRACK", href: "/programs#alevel" },
    { label: "PROFESSIONAL TRACK", href: "/programs#professional" },
  ];

  const navItems = [
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 w-full bg-white/80  backdrop-blur-md border-b border-gray-100 z-[1000]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-black text-blue-900 tracking-tighter">
            <Image src="/dsaLogo.png" alt="DSA Logo" width={50} height={50} />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-blue-900 hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}

          {/* Programs Dropdown */}
          <div className="group relative cursor-pointer py-2">
            <div className="flex items-center gap-1 text-blue-900 group-hover:text-blue-600 transition">
              <span>Programs</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </div>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-xl border border-gray-100 min-w-[220px] rounded-lg overflow-hidden py-2 mt-1">
              {programLinks.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  className="block px-4 py-3 hover:bg-blue-50 text-xs text-blue-900 hover:text-blue-600 transition"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Conditional Auth Button/Icon */}
          {!isLoading && role === "STUDENT" && (
            <Link
              href="/dashboard"
              className="text-blue-600 font-bold hover:text-blue-800 transition"
            >
              Dashboard
            </Link>
          )}

          {!isLoading && role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-blue-600 font-bold hover:text-blue-800 transition"
            >
              Admin Panel
            </Link>
          )}

          {!isLoading && role ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-blue-50 text-blue-900 px-5 py-2 rounded-full hover:bg-blue-100 transition border border-blue-100"
            >
              Login
            </Link>
          )}

          <Link
            href="/register/student"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-md active:scale-95"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 text-blue-900"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            /* FIXED: Removed transparency, used solid white and higher z-index */
            className="fixed inset-0 z-[2000] bg-white flex flex-col p-8 md:hidden shadow-2xl"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black text-blue-900">
                {role === "ADMIN" ? "Admin Menu" : "DSA Menu"}
              </span>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setProgramsExpanded(false);
                }}
                className="p-2 bg-gray-50 rounded-full"
              >
                <X className="w-8 h-8 text-blue-900" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 overflow-y-auto">
              {/* Regular Nav Items (Hidden for Admin usually, but available for Students) */}
              {role !== "ADMIN" &&
                navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xl font-bold text-blue-900 border-b border-gray-100 pb-4"
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Accordion for Programs (Only for Students/Guests) */}
              {role !== "ADMIN" && (
                <div className="border-b border-gray-100 pb-4">
                  <button
                    onClick={() => setProgramsExpanded(!programsExpanded)}
                    className="flex items-center justify-between w-full text-xl font-bold text-blue-900"
                  >
                    <span>Programs</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${programsExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: programsExpanded ? "auto" : 0,
                      opacity: programsExpanded ? 1 : 0,
                    }}
                    className="overflow-hidden flex flex-col pl-4"
                  >
                    {programLinks.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="py-3 text-gray-700 font-semibold border-l-2 border-blue-100 pl-4 mt-2"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Mobile Auth/Role-Based Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                {isLoading ? (
                  <div className="h-14 w-full bg-gray-100 animate-pulse rounded-xl" />
                ) : role ? (
                  <>
                    <Link
                      href={role === "ADMIN" ? "/admin" : "/dashboard"}
                      onClick={() => setMenuOpen(false)}
                      className="text-center py-4 rounded-xl font-bold text-lg bg-blue-50 text-blue-900 border border-blue-200"
                    >
                      Go to {role === "ADMIN" ? "Admin Panel" : "Dashboard"}
                    </Link>

                    {/* Unified Logout Button for Mobile */}
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-center py-4 rounded-xl font-bold text-lg border-2 border-blue-600 text-blue-600"
                    >
                      Student Login
                    </Link>
                    <Link
                      href="/register/student"
                      onClick={() => setMenuOpen(false)}
                      className="bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg"
                    >
                      Enroll Now
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
