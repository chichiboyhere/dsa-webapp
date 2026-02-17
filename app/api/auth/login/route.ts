// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const student = await prisma.student.findUnique({
//     where: { email },
//   });

//   if (!student) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   if (student.status !== "ACTIVE") {
//     return NextResponse.json(
//       { error: "Account not approved yet" },
//       { status: 403 },
//     );
//   }

//   const valid = await bcrypt.compare(password, student.password);

//   if (!valid) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   // set cookie
//   const res = NextResponse.json({ ok: true });

//   res.cookies.set("studentId", student.id, {
//     httpOnly: true,
//     path: "/",
//     sameSite: "lax",
//   });

//   res.cookies.set("role", "STUDENT", {
//     httpOnly: true,
//     path: "/",
//     sameSite: "lax",
//   });

//   return res;
// }

// app/api/auth/login/route.ts

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { createToken } from "@/lib/auth";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const student = await prisma.student.findUnique({
//     where: { email },
//   });

//   if (!student) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   if (student.status !== "ACTIVE") {
//     return NextResponse.json(
//       { error: "Account not approved yet" },
//       { status: 403 },
//     );
//   }

//   const valid = await bcrypt.compare(password, student.password);
//   if (!valid) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const token = await createToken({
//     id: student.id,
//     role: "STUDENT",
//   });

//   const res = NextResponse.json({ ok: true });

//   res.cookies.set("auth", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//   });

//   return res;
// }

// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const student = await prisma.student.findUnique({ where: { email } });

  if (!student || student.status !== "ACTIVE") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, student.password);
  if (!valid)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = await signJWT({ id: student.id, role: "STUDENT" });
  const res = NextResponse.json({ ok: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2, // 2 hours
  });

  return res;
}
