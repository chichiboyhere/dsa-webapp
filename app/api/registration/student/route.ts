import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const hashed = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
      role: "STUDENT",
      status: "AWAITING",
      // later we link to profile tables
    },
  });

  return NextResponse.json({ ok: true });
}
