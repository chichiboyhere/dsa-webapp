import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

  const existing = await prisma.student.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    return NextResponse.json({ error: "Taken" }, { status: 409 });
  }

  return NextResponse.json({ message: "Available" });
}
