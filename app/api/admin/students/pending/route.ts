// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { requireAdmin } from "@/lib/requireAdmin";

// export async function GET() {
//   await requireAdmin();
//   const students = await prisma.student.findMany({
//     where: { status: "AWAITING_APPROVAL" },
//     orderBy: { createdAt: "asc" },
//     select: {
//       id: true,
//       surname: true,
//       firstName: true,
//       email: true,
//       phone: true,
//       photoUrl: true,
//       department: true,
//       exam: true,
//       createdAt: true,
//     },
//   });

//   return NextResponse.json(students);
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  try {
    // Await the admin check
    await requireAdmin();

    const students = await prisma.student.findMany({
      where: { status: "AWAITING_APPROVAL" },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        surname: true,
        firstName: true,
        email: true,
        phone: true,
        photoUrl: true,
        department: true,
        exam: true,
        createdAt: true,
      },
    });

    return NextResponse.json(students);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
