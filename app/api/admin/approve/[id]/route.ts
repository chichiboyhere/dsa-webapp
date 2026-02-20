//app/api/admin/approve/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const year = new Date().getFullYear().toString().slice(-2);

  const lastStudent = await prisma.student.findFirst({
    where: {
      registrationNo: { startsWith: year },
    },
    orderBy: {
      registrationNo: "desc",
    },
  });

  const nextNumber = lastStudent
    ? parseInt(lastStudent.registrationNo!.slice(2)) + 1
    : 1;

  const registrationNo = year + nextNumber.toString().padStart(4, "0");

  await prisma.student.update({
    where: { id: id },
    data: {
      status: "APPROVED",
      registrationNo,
      approvedAt: new Date(),
    },
  });

  return NextResponse.redirect(
    new URL("/admin/approvals", process.env.APP_URL!),
  );
}
