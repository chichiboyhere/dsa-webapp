import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  try {
    // 🔐 1. Ensure only ADMIN can call this
    await requireAdmin();

    const { id } = await req.json();

    await prisma.student.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
