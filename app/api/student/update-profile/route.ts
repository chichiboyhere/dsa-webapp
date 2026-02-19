import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(req: Request) {
  try {
    const student = await getCurrentUser();

    // 1. Session Validation
    if (!student || !("id" in student)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { phone, address } = body;

    // 2. Data Validation
    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 },
      );
    }

    // 3. Selective Update (Security: Only allow specific fields)
    const updatedStudent = await prisma.student.update({
      where: { id: student.id },
      data: {
        phone,
        address,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      phone: updatedStudent.phone,
      address: updatedStudent.address,
    });
  } catch (error: any) {
    console.error("PROFILE_UPDATE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update profile records" },
      { status: 500 },
    );
  }
}
