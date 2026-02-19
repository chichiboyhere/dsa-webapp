// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { requireAdmin } from "@/lib/requireAdmin";

// export async function DELETE(req: Request) {
//   try {
//     await requireAdmin();
//     const { studentId } = await req.json();

//     // Perform a transaction to ensure all related data is wiped out safely
//     await prisma.$transaction([
//       prisma.payment.deleteMany({ where: { studentId } }),
//       prisma.cbtAttempt.deleteMany({ where: { studentId } }),
//       prisma.student.delete({ where: { id: studentId } }),
//     ]);

//     return NextResponse.json({ ok: true });
//   } catch (error: any) {
//     console.error("DELETE_ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to delete student records" },
//       { status: 500 },
//     );
//   }
// }

// app/api/admin/students/delete/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { studentId } = await req.json();

    // Use a transaction to delete all related records first
    await prisma.$transaction([
      prisma.payment.deleteMany({ where: { studentId } }),
      prisma.cBTAttempt.deleteMany({ where: { studentId } }), // Note the casing from your schema
      prisma.student.delete({ where: { id: studentId } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("DELETE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete student. They may have linked records." },
      { status: 500 },
    );
  }
}
