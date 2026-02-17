import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const hashed = await bcrypt.hash(body.password, 10);

  await prisma.student.create({
    data: {
      surname: body.surname,
      firstName: body.firstName,
      middleName: body.middleName,

      dob: new Date(body.dob),
      gender: body.gender,

      email: body.email,
      password: hashed,

      address: body.address,
      phone: body.phone,

      nationality: body.nationality,
      state: body.state,
      lga: body.lga,

      photoUrl: body.photoUrl,

      guardianName: body.guardianName,
      guardianPhone: body.guardianPhone,
      guardianAddress: body.guardianAddress,
      relationship: body.relationship,

      medicalInfo: body.medical,

      department: body.department,
      exam: body.exam,
      subjects: body.subjects,

      status: "AWAITING",
    },
  });

  return NextResponse.json({ ok: true });
}
