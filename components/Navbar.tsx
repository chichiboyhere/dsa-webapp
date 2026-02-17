"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 ">
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About Us
          </Link>

          {/* Simple Dropdown Concept for Programs */}
          <div className="group relative cursor-pointer py-2">
            <Link href="/programs" className="hover:text-blue-600 transition">
              Programs
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-xl border border-gray-100 min-w-[200px] rounded-lg overflow-hidden">
              <Link
                href="/programs#olevel"
                className="block px-4 py-3 hover:bg-blue-50 text-xs"
              >
                O&apos;LEVEL TRACK
              </Link>
              <Link
                href="/programs#alevel"
                className="block px-4 py-3 hover:bg-blue-50 text-xs"
              >
                A&apos;LEVEL TRACK
              </Link>
              <Link
                href="/programs#professional"
                className="block px-4 py-3 hover:bg-blue-50 text-xs"
              >
                PROFESSIONAL TRACK
              </Link>
            </div>
          </div>

          <Link href="/gallery" className="hover:text-blue-600 transition">
            Gallery
          </Link>
          <Link
            href="/register/student"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
