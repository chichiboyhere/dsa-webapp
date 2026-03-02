//app/admin/students/page.tsx

import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Printer, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import PrintButton from "@/components/admin/PrintButton";
import { Edit, Search } from "lucide-react";
import DeleteStudentButton from "@/components/admin/DeleteStudentButton";

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 25;

  const [students, totalCount] = await Promise.all([
    prisma.student.findMany({
      where: {
        status: "ACTIVE",
        OR: q
          ? [
              { firstName: { contains: q, mode: "insensitive" } },
              { surname: { contains: q, mode: "insensitive" } },
              { registrationNo: { contains: q, mode: "insensitive" } },
            ]
          : undefined,
      },
      orderBy: { surname: "asc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.student.count({ where: { status: "ACTIVE" } }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      {/* HEADER: Hidden when printing */}
      <div className="flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold">Approved Students</h1>
        <PrintButton />
      </div>

      {/* SEARCH BOX */}
      <form action="/admin/students" className="relative w-full md:w-72">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name or Reg No..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
        />
      </form>

      {/* TABLE: The 'printable-table' class activates our CSS above */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left printable-table">
          <thead className="bg-gray-50 uppercase text-[10px] font-bold tracking-widest text-gray-400">
            <tr>
              <th className="px-6 py-4">S/N</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Reg No</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4 print:hidden text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((s, index) => (
              <tr
                key={s.id}
                className="text-sm hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Photo: visible on screen, usually hidden on official print lists but you can keep it */}
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={s.photoUrl || "/images/avatar-placeholder.png"}
                        alt="Student"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-900">
                      {s.surname}, {s.firstName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-blue-600 font-bold">
                  {s.registrationNo}
                </td>
                <td className="px-6 py-4">{s.department}</td>

                {/* ACTIONS: We hide these specifically when printing */}
                <td className="px-6 py-4 text-right print-hidden">
                  <div className="flex justify-end items-center gap-2">
                    <Link
                      href={`/admin/students/${s.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Student"
                    >
                      <Edit size={18} />
                    </Link>

                    <DeleteStudentButton
                      studentId={s.id}
                      studentName={`${s.firstName} ${s.surname}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION: Hidden when printing */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 print:hidden mt-8">
          <Link
            href={`/admin/students?page=${currentPage - 1}${q ? `&q=${q}` : ""}`}
            className={`p-2 rounded-lg border ${currentPage <= 1 ? "pointer-events-none opacity-30" : "hover:bg-gray-100"}`}
          >
            <ChevronLeft size={20} />
          </Link>
          <span className="text-sm font-bold text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`/admin/students?page=${currentPage + 1}${q ? `&q=${q}` : ""}`}
            className={`p-2 rounded-lg border ${currentPage >= totalPages ? "pointer-events-none opacity-30" : "hover:bg-gray-100"}`}
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}
