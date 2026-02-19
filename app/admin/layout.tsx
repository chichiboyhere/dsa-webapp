// // app/admin/layout.tsx
// import Link from "next/link";
// import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-6">
//         <h2 className="text-xl font-bold mb-6">DSA Admin</h2>

//         <nav className="space-y-3">
//           <Link href="/admin" className="block hover:font-semibold">
//             Dashboard
//           </Link>

//           <Link href="/admin/approvals" className="block hover:font-semibold">
//             Pending Approvals
//           </Link>

//           <Link href="/admin/students" className="block hover:font-semibold">
//             Students
//           </Link>

//           <Link href="/admin/settings" className="block hover:font-semibold">
//             Settings
//           </Link>
//         </nav>
//         <Link
//           href="/admin/students/new"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
//         >
//           <span>+</span> Add New Student
//         </Link>

//         <div className="mt-10">
//           <AdminLogoutButton />
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">{children}</main>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Users,
  CheckCircle,
  Settings,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    {
      href: "/admin/approvals",
      label: "Pending",
      icon: <CheckCircle size={20} />,
    },
    { href: "/admin/students", label: "Students", icon: <Users size={20} /> },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 mt-20">
      {/* Mobile Top Navigation (Visible only on small screens) */}
      {/* Mobile Top Navigation */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b overflow-x-auto scrollbar-hide">
        <div className="flex whitespace-nowrap p-3 gap-3 min-w-max">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold border border-gray-100 active:scale-95 transition-transform"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
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
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/admin/students/new"
            className="mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-xl font-medium shadow-md shadow-blue-200 hover:bg-blue-700"
          >
            <PlusCircle size={18} /> New Student
          </Link>

          <div className="absolute bottom-8 left-6 right-6">
            <AdminLogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
        {children}
      </main>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
