// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const user = await getCurrentUser();

// Type guard: Check if user exists and is an Admin (doesn't have a 'status' field like students do)
// or simply check a property unique to your Admin model.
if (!user || "status" in user) {
  redirect("/admin-login");
}

export default async function AdminPage() {
  const totalStudents = await prisma.student.count();
  const pending = await prisma.student.count({
    where: { status: "AWAITING_APPROVAL" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

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
