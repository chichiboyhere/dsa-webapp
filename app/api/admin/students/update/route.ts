// app/api/admin/students/update/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  await requireAdmin();

  const { studentId, updates } = await req.json();

  await prisma.student.update({
    where: { id: studentId },
    data: updates,
  });

  return NextResponse.json({ ok: true });
}
