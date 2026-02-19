// app/api/payment/[id]/receipt/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ✅ UNWRAP PARAMS PROPERLY

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const payload = await verifyJWT(token);

  if (!payload || payload.role !== "STUDENT") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const payment = await prisma.payment.findUnique({
    where: { id }, // ✅ now id exists
  });

  if (!payment) {
    return new NextResponse("Payment not found", { status: 404 });
  }

  if (payment.studentId !== payload.id) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!payment.receiptUrl) {
    return new NextResponse("Receipt not available", { status: 404 });
  }

  const fileRes = await fetch(payment.receiptUrl);

  if (!fileRes.ok) {
    console.error("Cloudinary fetch failed:", fileRes.status);
    return new NextResponse("Receipt fetch failed", { status: 500 });
  }

  const buffer = await fileRes.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="DSA_Receipt_${payment.reference}.pdf"`,
    },
  });
}
