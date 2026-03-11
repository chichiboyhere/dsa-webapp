//app/api/admin/students/create/route.ts

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

    // 2. Robust Registration Number Generation (Matches your Approval logic)
    const year = new Date().getFullYear().toString().slice(-2);
    const lastStudent = await prisma.student.findFirst({
      where: { registrationNo: { startsWith: year } },
      orderBy: { registrationNo: "desc" },
    });

    let nextNumber = 1;
    if (lastStudent?.registrationNo) {
      const lastSequence = parseInt(lastStudent.registrationNo.slice(2), 10);
      nextNumber = lastSequence + 1;
    }
    const registrationNo = `${year}${String(nextNumber).padStart(4, "0")}`;

    // 3. Hash default password
    const hashedPassword = await bcrypt.hash(data.surname.toLowerCase(), 10);

    // 4. Sanitize and Create Student
    // We explicitly destructure to avoid passing UI state (like 'loading') to Prisma
    const newStudent = await prisma.student.create({
      data: {
        surname: data.surname,
        firstName: data.firstName,
        middleName: data.middleName || null,
        email: data.email,
        password: hashedPassword,
        dob: new Date(data.dob),
        gender: data.gender,
        address: data.address,
        phone: data.phone,
        nationality: data.nationality,
        state: data.state,
        lga: data.lga,
        photoUrl: data.photoUrl || null,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        guardianAddress: data.guardianAddress,
        relationship: data.relationship,
        medicalInfo: data.medicalInfo || null,
        emergencyName: data.emergencyName || null,
        emergencyPhone: data.emergencyPhone || null,
        department: data.department,
        exam: data.exam,
        subjects: data.subjects || [],
        tradeSubject: data.tradeSubject || null,
        registrationNo,
        status: "ACTIVE",
        approvedAt: new Date(),
        // Default values for other required schema fields
        agreedToConduct: true,
        role: "STUDENT",
      },
    });

    return NextResponse.json({
      ok: true,
      registrationNo: newStudent.registrationNo,
    });
  } catch (error: any) {
    console.error("CREATE_STUDENT_ERROR:", error);
    // Log the specific Prisma error for debugging
    return NextResponse.json(
      { error: error.message || "Failed to create student" },
      { status: 500 },
    );
  }
}
