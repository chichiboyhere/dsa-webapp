import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();

    const { current, next } = await req.json();

    const valid = await bcrypt.compare(current, admin.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Current password incorrect" },
        { status: 400 },
      );
    }

    const hashed = await bcrypt.hash(next, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashed },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
