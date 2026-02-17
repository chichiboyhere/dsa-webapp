import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCBTSubjects } from "@/lib/cbtSubjects";

export async function POST(req: Request) {
  const studentId = (await cookies()).get("studentId")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { answers } = await req.json();

  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const questionIds = Object.keys(answers);

  const questions = await prisma.cBTQuestion.findMany({
    where: { id: { in: questionIds } },
  });

  let score = 0;
  for (const q of questions) {
    if (answers[q.id] === q.answer) score++;
  }

  const subjects = getCBTSubjects(student);

  const attempt = await prisma.cBTAttempt.create({
    data: {
      studentId,
      exam: student.exam,
      subjects,
      score,
      total: questions.length,
    },
  });

  return NextResponse.json({
    score,
    total: questions.length,
    attemptId: attempt.id,
  });
}
