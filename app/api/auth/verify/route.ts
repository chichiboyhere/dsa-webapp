// app/api/auth/verify/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth"; // Use your existing verifyJWT

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return NextResponse.json({ role: null }, { status: 401 });

  try {
    const payload = await verifyJWT(token);

    // Add this check to satisfy TypeScript
    if (!payload) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    // Now TypeScript knows 'payload' isn't null here
    return NextResponse.json({ role: payload.role });
  } catch {
    return NextResponse.json({ role: null }, { status: 401 });
  }
}
