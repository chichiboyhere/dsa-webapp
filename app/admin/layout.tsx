// app/admin/layout.tsx
import Link from "next/link";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold mb-6">DSA Admin</h2>

        <nav className="space-y-3">
          <Link href="/admin" className="block hover:font-semibold">
            Dashboard
          </Link>

          <Link href="/admin/approvals" className="block hover:font-semibold">
            Pending Approvals
          </Link>

          <Link href="/admin/students" className="block hover:font-semibold">
            Students
          </Link>

          <Link href="/admin/settings" className="block hover:font-semibold">
            Settings
          </Link>
        </nav>
        <Link
          href="/admin/students/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          <span>+</span> Add New Student
        </Link>

        <div className="mt-10">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
