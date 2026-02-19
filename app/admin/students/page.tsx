// //app/admin/students/page.tsx
// import { prisma } from "@/lib/prisma";
// import Link from "next/link";
// import { Edit, Trash2, Eye } from "lucide-react";
// import DeleteStudentButton from "@/components/admin/DeleteStudentButton";
// import Image from "next/image";

// export default async function AdminStudentsPage() {
//   const students = await prisma.student.findMany({
//     where: { status: "ACTIVE" }, // Only show approved students here
//     orderBy: { surname: "asc" },
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Bona fide Students</h1>
//         <p className="text-sm text-gray-500">{students.length} Total</p>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
//               <tr>
//                 <th className="px-6 py-4">Student</th>
//                 <th className="px-6 py-4">Reg No</th>
//                 <th className="px-6 py-4">Department</th>
//                 <th className="px-6 py-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {students.map((s) => (
//                 <tr
//                   key={s.id}
//                   className="hover:bg-blue-50/50 transition-colors group"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
//                         <Image
//                           src={s.photoUrl || "/placeholder-user.png"}
//                           alt={`${s.firstName} thumbnail`}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900 leading-none">
//                           {s.surname}, {s.firstName}
//                         </p>
//                         <p className="text-[11px] text-gray-500 mt-1">
//                           {s.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 font-mono text-sm font-bold text-blue-600">
//                     {s.registrationNo}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {s.department}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex justify-end gap-2">
//                       <td className="px-6 py-4">
//                         <div className="flex justify-end gap-2">
//                           <Link
//                             href={`/admin/students/${s.id}`}
//                             className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
//                           >
//                             <Edit size={18} />
//                           </Link>

//                           <DeleteStudentButton
//                             studentId={s.id}
//                             studentName={`${s.firstName} ${s.surname}`}
//                           />
//                         </div>
//                       </td>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/admin/students/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Search } from "lucide-react";
import DeleteStudentButton from "@/components/admin/DeleteStudentButton";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function AdminStudentsPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const students = await prisma.student.findMany({
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
  });

  return (
    <div className="space-y-6 pt-18">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bona fide Students
          </h1>
          <p className="text-sm text-gray-500">
            {students.length} Total Approved
          </p>
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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Reg No</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-blue-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image
                          src={s.photoUrl || "/placeholder-user.png"}
                          alt={`${s.firstName} thumbnail`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 leading-none">
                          {s.surname}, {s.firstName}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">
                          {s.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm font-bold text-blue-600">
                    {s.registrationNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {s.department}
                  </td>

                  <td className="px-6 py-4 text-right">
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
        {students.length === 0 && (
          <div className="p-20 text-center text-gray-500">
            No students found matching "{q}"
          </div>
        )}
      </div>
    </div>
  );
}
