import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // MOVE THE LOGIC HERE
  const user = await getCurrentUser();

  // Type guard: Check if user exists and is an Admin
  if (!user || "status" in user) {
    redirect("/admin-login");
  }

  const totalStudents = await prisma.student.count();
  const pending = await prisma.student.count({
    where: { status: "AWAITING_APPROVAL" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold ">Admin Dashboard</h1>

        <Link href="/admin/students/new">
          <button className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-800 text-white rounded-xl hover:bg-black shadow-lg transition-all font-bold">
            Add New Student
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        <div className="border bg-white p-6 rounded">
          <p className="text-gray-500">Total Students</p>
          <p className="text-3xl font-bold">{totalStudents}</p>
        </div>

        <div className="border bg-white p-6 rounded">
          <p className="text-gray-500">Pending Approvals</p>
          <p className="text-3xl font-bold">{pending}</p>
        </div>
      </div>
    </div>
  );
}
