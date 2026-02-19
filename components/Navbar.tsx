"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const programLinks = [
    { label: "O'LEVEL TRACK", href: "/programs#olevel" },
    { label: "A'LEVEL TRACK", href: "/programs#alevel" },
    { label: "PROFESSIONAL TRACK", href: "/programs#professional" },
  ];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <nav className="fixed top-0 w-full  bg-white/80 backdrop-blur-md border-b border-gray-100 z-1000">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-black text-blue-900 tracking-tighter">
            DSA
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-600">
            Dynamic Success Academy
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

          {/* Desktop Dropdown */}
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

          <Link
            href="/register/student"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-md hover:shadow-lg active:scale-95"
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black text-blue-900">DSA Menu</span>
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-8 h-8 text-blue-900" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold text-blue-900 border-b border-gray-100 pb-2"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Programs List (Flattened for better UX) */}
              <div className="flex flex-col gap-4 ">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Our Programs
                </span>
                {programLinks.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium text-gray-600"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/register/student"
                onClick={() => setMenuOpen(false)}
                className="mt-4 bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg"
              >
                Enroll Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
