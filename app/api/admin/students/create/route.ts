import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = await req.json();

    // 1. Check if email already exists
    const existing = await prisma.student.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A student with this email already exists." },
        { status: 400 },
      );
    }

    // 2. Generate Registration Number (YYXXXX)
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await prisma.student.count({
      where: { registrationNo: { startsWith: year } },
    });

    const sequence = String(count + 1).padStart(4, "0");
    const registrationNo = `${year}${sequence}`;

    // 3. Hash a default password (e.g., surname in lowercase)
    const hashedPassword = await bcrypt.hash(data.surname.toLowerCase(), 10);

    // 4. Create Student
    const newStudent = await prisma.student.create({
      data: {
        ...data,
        password: hashedPassword,
        registrationNo,
        status: "ACTIVE", // Admin-created students are active by default
        approvedAt: new Date(),
        // Ensure subjects are handled as JSON
        subjects: data.subjects || [],
      },
    });

    return NextResponse.json({
      ok: true,
      registrationNo: newStudent.registrationNo,
    });
  } catch (error: any) {
    console.error("CREATE_STUDENT_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 },
    );
  }
}
