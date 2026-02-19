import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
//import { sendApprovalSMS } from "@/lib/sms";

export async function POST(req: Request) {
  try {
    // 🔐 1. Ensure only ADMIN can call this
    await requireAdmin();

    const { id } = await req.json();

    await prisma.student.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    // const updatedStudent = await prisma.student.update({
    //   where: { id: studentId },
    //   data: { status: "ACTIVE", registrationNo: registrationNo },
    // });

    // // Trigger SMS asynchronously (don't make the Admin wait for the SMS to send)
    // if (updatedStudent.phone) {
    //   sendApprovalSMS(
    //     updatedStudent.phone,
    //     updatedStudent.firstName,
    //     registrationNo,
    //   ).then((res) => console.log("SMS Sent Status:", res));
    // }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
