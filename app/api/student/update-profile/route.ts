import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  try {
    const student = await getCurrentUser();

    // 1. Session Validation
    if (!student || !("id" in student)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { phone, address, currentPassword, newPassword } = body;

    // 2. Data Validation
    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 },
      );
    }

    // 3. Password Validation
    const valid = await bcrypt.compare(currentPassword, student.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Current password incorrect" },
        { status: 400 },
      );
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    const password = hashed;

    // 4. Selective Update (Security: Only allow specific fields)
    const updatedStudent = await prisma.student.update({
      where: { id: student.id },
      data: {
        phone,
        address,
        password,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      phone: updatedStudent.phone,
      address: updatedStudent.address,
      password: updatedStudent.password,
    });
  } catch (error: any) {
    console.error("PROFILE_UPDATE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update profile records" },
      { status: 500 },
    );
  }
}
