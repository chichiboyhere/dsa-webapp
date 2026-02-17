import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const studentId = (await cookies()).get("studentId")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // OPTIONAL: randomize questions
  const questions = await prisma.cBTQuestion.findMany({
    take: 10,
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      question: true,
      options: true,
    },
  });

  return NextResponse.json(questions);
}
