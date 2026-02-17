// import { NextResponse } from "next/server";

// export async function POST() {
//   const res = NextResponse.json({ ok: true });

//   //Clear auth cookies
//   res.cookies.set("studentId", "", {
//     httpOnly: true,
//     path: "/",
//     maxAge: 0,
//   });

//   res.cookies.set("role", "", {
//     httpOnly: true,
//     path: "/",
//     maxAge: 0,
//   });

//   res.cookies.delete("studentId");
//   res.cookies.delete("adminId");
//   res.cookies.delete("role");

//   return res;
// }

// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear the unified JWT token
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Set expiry to the past
  });

  return res;
}
