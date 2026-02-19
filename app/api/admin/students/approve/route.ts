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
//app/api/admin/students/approve/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { studentId, action, updates } = await req.json();

    // if (action === "REJECTED") {
    //   await prisma.student.delete({ where: { id: studentId } });
    //   return NextResponse.json({ ok: true, message: "Student removed" });
    // }
    if (action === "REJECTED") {
      await prisma.student.update({
        where: { id: studentId },
        data: {
          status: "REJECTED",
          approvedAt: null,
        },
      });

      return NextResponse.json({ ok: true, message: "Student rejected" });
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
        // const count = await prisma.student.count({
        //   where: { registrationNo: { startsWith: year } },
        // });
        // const sequence = String(count + 1).padStart(4, "0");
        // registrationNo = `${year}${sequence}`;
        // Find the latest registrationNo for this year
        const lastStudent = await prisma.student.findFirst({
          where: {
            registrationNo: {
              startsWith: year,
            },
          },
          orderBy: {
            registrationNo: "desc",
          },
        });

        let nextNumber = 1;

        if (lastStudent?.registrationNo) {
          const lastSequence = parseInt(
            lastStudent.registrationNo.slice(2),
            10,
          );
          nextNumber = lastSequence + 1;
        }

        const sequence = String(nextNumber).padStart(4, "0");
        registrationNo = `${year}${sequence}`;
      }

      // Update student with potential edits + Status change + RegNo

      const sanitizedData = {
        ...updates,
        dob: updates?.dob ? new Date(updates.dob) : undefined,
      };

      await prisma.student.update({
        where: { id: studentId },
        data: {
          ...sanitizedData,
          status: "ACTIVE",
          registrationNo,
          approvedAt: new Date(),
        },
      });

      return NextResponse.json({ ok: true, registrationNo });
    }
  } catch (error) {
    console.error("Approval error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
