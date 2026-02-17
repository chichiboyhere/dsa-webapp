// import { prisma } from "@/lib/prisma";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { getCBTSubjects } from "@/lib/cbtSubjects";

// export async function GET() {
//   const studentId = (await cookies()).get("studentId")?.value;
//   if (!studentId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const student = await prisma.student.findUnique({
//     where: { id: studentId },
//   });

//   if (!student) {
//     return NextResponse.json({ error: "Student not found" }, { status: 404 });
//   }

//   const subjects = getCBTSubjects(student);
//   const QUESTIONS_PER_SUBJECT = 10;

//   const questions = await prisma.cBTQuestion.findMany({
//     where: {
//       exam: student.exam,
//       subject: { in: subjects },
//     },
//   });

//   // 🔀 Group and balance
//   const grouped: Record<string, any[]> = {};
//   for (const q of questions) {
//     grouped[q.subject] = grouped[q.subject] || [];
//     grouped[q.subject].push(q);
//   }

//   const finalQuestions = subjects.flatMap((sub) =>
//     (grouped[sub] || []).slice(0, QUESTIONS_PER_SUBJECT),
//   );

//   return NextResponse.json(finalQuestions);
// }

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCBTSubjects } from "@/lib/cbtSubjects";

export async function GET() {
  const studentId = (await cookies()).get("studentId")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const subjects = getCBTSubjects(student);
  const QUESTIONS_PER_SUBJECT = 10;

  const questions: any[] = [];

  for (const subject of subjects) {
    const qs = await prisma.cBTQuestion.findMany({
      where: {
        exam: student.exam,
        subject,
      },
      take: QUESTIONS_PER_SUBJECT,
      orderBy: {
        createdAt: "desc", // swap to random if needed later
      },
    });

    questions.push(...qs);
  }

  return NextResponse.json(questions);
}
