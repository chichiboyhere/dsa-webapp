// // app/api/auth/admin/login/route.ts
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const admin = await prisma.admin.findUnique({
//     where: { email },
//   });

//   if (!admin) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const ok = await bcrypt.compare(password, admin.password);
//   if (!ok) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const res = NextResponse.json({ ok: true });

//   res.cookies.set("adminId", admin.id, {
//     httpOnly: true,
//     path: "/",
//     sameSite: "lax",
//   });

//   res.cookies.set("role", "ADMIN", {
//     httpOnly: true,
//     path: "/",
//     sameSite: "lax",
//   });

//   return res;
// }

// app/api/auth/admin/login/route.ts

// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { createToken } from "@/lib/auth";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const admin = await prisma.admin.findUnique({
//     where: { email },
//   });

//   if (!admin) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const ok = await bcrypt.compare(password, admin.password);
//   if (!ok) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const token = await createToken({
//     id: admin.id,
//     role: "ADMIN",
//   });

//   const res = NextResponse.json({ ok: true });

//   res.cookies.set("auth", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//   });

//   return res;
// }

// app/api/auth/admin/login/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { signJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    console.log("Login attempt for:", email);
    if (!admin) console.log("Admin not found in DB");
    if (admin && !ok)
      console.log("Password mismatch for hashed password:", admin.password);
    // Create the JWT with ADMIN role
    const token = await signJWT({ id: admin.id, role: "ADMIN" });

    const res = NextResponse.json({ ok: true });

    // Set the unified "token" cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // Admins might need a longer session (8 hours)
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
