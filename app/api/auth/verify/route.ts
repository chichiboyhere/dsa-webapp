// app/api/auth/verify/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth"; // Use your existing verifyJWT

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return NextResponse.json({ role: null }, { status: 401 });

  // app/api/auth/verify/route.ts

  try {
    const payload = await verifyJWT(token);

    // 1. Explicitly check if payload is null
    if (!payload) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    // 2. Now TypeScript knows payload is safe to use
    return NextResponse.json({ role: payload.role });
  } catch (error) {
    return NextResponse.json({ role: null }, { status: 401 });
  }
}
