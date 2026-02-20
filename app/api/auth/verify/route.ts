// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose"; // Or your preferred JWT library

// export async function GET() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ authenticated: false }, { status: 401 });
//   }

//   try {
//     // Verify your JWT here (example using jose)
//     await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

//     return NextResponse.json({ authenticated: true });
//   } catch (err) {
//     return NextResponse.json({ authenticated: false }, { status: 401 });
//   }
// }

// app/api/auth/verify/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth"; // Use your existing verifyJWT

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return NextResponse.json({ role: null }, { status: 401 });

  try {
    const payload = await verifyJWT(token);
    return NextResponse.json({ role: payload.role }); // Returns "ADMIN" or "STUDENT"
  } catch {
    return NextResponse.json({ role: null }, { status: 401 });
  }
}
