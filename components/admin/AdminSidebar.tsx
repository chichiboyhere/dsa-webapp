"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminSidebar({
  unreadCount,
  navLinks,
}: {
  unreadCount: number;
  navLinks: any[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b overflow-x-auto">
        <div className="flex p-3 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold border"
            >
              {link.icon} <span>{link.label}</span>
              {link.label === "Messages" && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <h2 className="hidden md:block text-2xl font-bold text-blue-600 mb-8">
            DSA Admin
          </h2>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-700"
              >
                <div className="flex items-center gap-3">
                  {link.icon} {link.label}
                </div>
                {link.label === "Messages" && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
