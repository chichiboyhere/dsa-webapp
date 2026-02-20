// app/admin/students/[studentId]/page.tsx
import { prisma } from "@/lib/prisma";

import AdminStudentForm from "@/components/admin/AdminStudentForm";

export const dynamic = "force-dynamic";
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
    </div>
  );
}
