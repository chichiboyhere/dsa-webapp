// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { requireAdmin } from "@/lib/requireAdmin";

// export async function POST(req: Request) {
//   try {
//     // 🔐 1. Ensure only ADMIN can call this
//     await requireAdmin();

//     const { studentId, action } = await req.json();

//     const student = await prisma.student.findUnique({
//       where: { id: studentId },
//     });

//     if (!student) {
//       return NextResponse.json({ error: "Student not found" }, { status: 404 });
//     }

//     // 🚨 Reject flow
//     if (action === "REJECTED") {
//       await prisma.student.update({
//         where: { id: studentId },
//         data: {
//           status: "REJECTED",
//           approvedAt: new Date(),
//         },
//       });

//       return NextResponse.json({ ok: true, status: "REJECTED" });
//     }

//     // 🚨 Prevent double approval
//     if (student.registrationNo) {
//       return NextResponse.json({ ok: true });
//     }

//     // 2️⃣ Get current year (last 2 digits)
//     const year = new Date().getFullYear().toString().slice(-2);

//     // 3️⃣ Count students approved this year
//     const count = await prisma.student.count({
//       where: {
//         registrationNo: {
//           startsWith: year,
//         },
//       },
//     });

//     // 4️⃣ Generate next registration number
//     const sequence = String(count + 1).padStart(4, "0");
//     const registrationNo = `${year}${sequence}`;

//     // 5️⃣ Approve student
//     await prisma.student.update({
//       where: { id: studentId },
//       data: {
//         status: "ACTIVE",
//         registrationNo,
//         approvedAt: new Date(),
//       },
//     });

//     return NextResponse.json({
//       ok: true,
//       status: "ACTIVE",
//       registrationNo,
//     });
//   } catch {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { studentId, action, updates } = await req.json();

    if (action === "REJECTED") {
      await prisma.student.delete({ where: { id: studentId } });
      return NextResponse.json({ ok: true, message: "Student removed" });
    }

    if (action === "APPROVED") {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
      });
      if (!student)
        return NextResponse.json({ error: "Not found" }, { status: 404 });

      // Only generate Reg No if they don't have one
      let registrationNo = student.registrationNo;

      if (!registrationNo) {
        const year = new Date().getFullYear().toString().slice(-2);
        // Find the count of students for THIS year to increment correctly
        const count = await prisma.student.count({
          where: { registrationNo: { startsWith: year } },
        });
        const sequence = String(count + 1).padStart(4, "0");
        registrationNo = `${year}${sequence}`;
      }

      // Update student with potential edits + Status change + RegNo
      await prisma.student.update({
        where: { id: studentId },
        data: {
          ...updates, // Save any changes made by admin during approval
          status: "ACTIVE",
          registrationNo,
          approvedAt: new Date(),
        },
      });

      return NextResponse.json({ ok: true, registrationNo });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
