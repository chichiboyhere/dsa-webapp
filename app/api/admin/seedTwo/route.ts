import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST() {
  const email = "seyi@dsa.local";
  const plainPassword = "admin123"; // change after first login

  // prevent re-seeding
  const exists = await prisma.admin.findUnique({
    where: { email },
  });

  if (exists) {
    return NextResponse.json(
      { error: "Admin already exists" },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.create({
    data: {
      email,
      name: "DSA Super Admin",
      password: hashed,
      role: "ADMIN",
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Admin created",
    credentials: {
      email,
      password: plainPassword,
    },
  });
}
