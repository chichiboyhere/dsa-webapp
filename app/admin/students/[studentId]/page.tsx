// import { prisma } from "@/lib/prisma";
// //import Image from "next/image";

// //import ApproveRejectActions from "./ApproveRejectActions";
// import StudentApprovalForm from "./StudentApprovalForm";

// export default async function StudentApprovalPage({
//   params,
// }: {
//   params: Promise<{ studentId: string }>;
// }) {
//   const { studentId } = await params;
//   const student = await prisma.student.findUnique({
//     where: { id: studentId },
//     include: { payments: true },
//   });

//   if (!student) {
//     return <p>Student not found</p>;
//   }

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Student Registration Details</h1>
//       <StudentApprovalForm student={student} />
//     </div>
//   );
// }

// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mb-6">
//       <h2 className="font-semibold text-lg mb-2">{title}</h2>
//       <div className="grid gap-2">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <p>
//       <span className="font-medium">{label}:</span> {value}
//     </p>
//   );
// }

// app/admin/students/[studentId]/page.tsx
// import { prisma } from "@/lib/prisma";

// import AdminStudentForm from "@/components/admin/AdminStudentForm";
// import { notFound } from "next/navigation";

// type Props = {
//   params: {
//     studentId: string;
//   };
// };

// export default async function AdminStudentPage({
//   params,
// }: {
//   params: { studentId: string };
// }) {
//   const student = await prisma.student.findUnique({
//     where: { id: params.studentId },
//     include: {
//       payments: true,
//       cbtAttempts: {
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   });

//   if (!student) notFound();

// export default async function AdminStudentPage({ params }: Props) {
//   const { studentId } = params; // ✅ params already resolved by Next

//   const student = await prisma.student.findUnique({
//     where: { id: studentId },
//     include: {
//       payments: true,
//       cbtAttempts: {
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   });

//   if (!student) {
//     return <p>Student not found</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4">
//         Student Profile – {student.firstName} {student.surname}
//       </h1>

//       <AdminStudentForm student={student} />

//       <div className="mt-8">
//         <h2 className="font-semibold mb-2">Payments</h2>
//         <ul className="text-sm">
//           {student.payments.map((p) => (
//             <li key={p.id}>
//               ₦{p.amount} – {p.channel} – {p.status}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// app/admin/students/[studentId]/page.tsx
import { prisma } from "@/lib/prisma";

import AdminStudentForm from "@/components/admin/AdminStudentForm";
import ApproveRejectActions from "./ApproveRejectActions";

// 1. Update your type definition to reflect that params is a Promise
type Props = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function AdminStudentPage({ params }: Props) {
  // 2. Await the params before using them
  const { studentId } = await params;

  const student = await prisma.student.findUnique({
    where: { id: studentId }, // Now studentId is a string, not a Promise
    include: {
      payments: true,
      cbtAttempts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Student Profile – {student.firstName} {student.surname}
      </h1>

      <AdminStudentForm student={student} />

      <div className="mt-8">
        <h2 className="font-semibold mb-2">Payments</h2>
        <ul className="text-sm">
          {student.payments.map((p) => (
            <li key={p.id}>
              ₦{p.amount} – {p.channel} – {p.status}
            </li>
          ))}
        </ul>
      </div>
      <ApproveRejectActions student={student} />
    </div>
  );
}
