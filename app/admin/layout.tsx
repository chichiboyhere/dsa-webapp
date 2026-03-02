//app/admin/layout.tsx

import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  LayoutDashboard,
  CheckCircle,
  Users,
  Settings,
  Mail,
  Megaphone,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data safely on the server
  const unreadCount = await prisma.contactMessage.count({
    where: { isRead: false },
  });

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/messages", label: "Messages", icon: <Mail size={20} /> },
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
    {
      href: "/admin/broadcast",
      label: "Broadcast",
      icon: <Megaphone size={20} />,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 mt-20">
        <AdminSidebar unreadCount={unreadCount} navLinks={navLinks} />
        <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
