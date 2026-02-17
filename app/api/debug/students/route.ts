import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(students);
}
