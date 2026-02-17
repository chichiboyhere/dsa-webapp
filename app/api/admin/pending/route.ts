import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const students = await prisma.student.findMany({
    where: { status: "AWAITING_APPROVAL" },
    select: {
      id: true,
      surname: true,
      firstName: true,
      email: true,
      photoUrl: true,
    },
  });

  return NextResponse.json(students);
}
