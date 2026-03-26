// // app/api/webhooks/paystack/route.ts
// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = req.headers.get("x-paystack-signature");

//   if (!signature) {
//     return NextResponse.json({ error: "No signature" }, { status: 400 });
//   }

//   const hash = crypto
//     .createHmac("sha512", process.env.PAYSTACK_SECRET!)
//     .update(body)
//     .digest("hex");

//   if (hash !== signature) {
//     return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//   }

//   const event = JSON.parse(body);

//   if (event.event === "charge.success") {
//     const data = event.data;
//     const reference = data.reference;

//     // Prevent duplicate processing
//     const existing = await prisma.payment.findUnique({
//       where: { reference },
//     });

//     if (existing) {
//       return NextResponse.json({ ok: true });
//     }

//     const formData = data.metadata?.formData;

//     if (!formData) {
//       return NextResponse.json({ ok: true });
//     }

//     // Find or create student
//     let student = await prisma.student.findUnique({
//       where: { email: formData.email },
//     });

//     if (!student) {
//       const bcrypt = await import("bcryptjs");
//       const hashed = await bcrypt.hash(formData.password, 10);

//       student = await prisma.student.create({
//         data: {
//           surname: formData.surname,
//           firstName: formData.firstName,
//           middleName: formData.middleName,

//           dob: new Date(formData.dob),
//           gender: formData.gender,

//           email: formData.email,
//           password: hashed,

//           address: formData.address,
//           phone: formData.phone,
//           nationality: formData.nationality,
//           state: formData.state,
//           lga: formData.lga,

//           guardianName: formData.guardianName,
//           guardianPhone: formData.guardianPhone,
//           guardianAddress: formData.guardianAddress,
//           relationship: formData.relationship,

//           emergencyName: formData.emergencyName,
//           emergencyPhone: formData.emergencyPhone,

//           medicalInfo: formData.medicalInfo,

//           department: formData.department,
//           exam: formData.exam,
//           subjects: formData.subjects,
//           tradeSubject: formData.tradeSubject,

//           agreedToConduct:
//             formData.agreedToConduct === true ||
//             formData.agreedToConduct === "true",

//           status: "ACTIVE",
//           paymentStatus: "PAID",
//           paymentRef: reference,
//           amountPaid: data.amount / 100,
//         },
//       });
//     }

//     await prisma.payment.create({
//       data: {
//         studentId: student.id,
//         reference,
//         amount: data.amount / 100,
//         channel: data.channel,
//         status: "SUCCESS",
//       },
//     });
//   }

//   return NextResponse.json({ ok: true });
// }

import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let body: string;
  try {
    body = await req.text();
  } catch (err) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const signature = req.headers.get("x-paystack-signature");
  if (!signature)
    return NextResponse.json({ error: "No signature" }, { status: 400 });

  // 1. Validate Signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  // 2. Only process successful charges
  if (event.event === "charge.success") {
    const data = event.data;
    const reference = data.reference;
    const formData = data.metadata?.formData;

    if (!formData) {
      console.error(
        `[Paystack Webhook] Missing metadata for ref: ${reference}`,
      );
      return NextResponse.json({ ok: true });
    }

    try {
      // 3. Database Transaction (Atomic Operation)
      // This ensures both Student and Payment are created, or neither is.
      await prisma.$transaction(async (tx) => {
        // Check if payment already processed
        const existingPayment = await tx.payment.findUnique({
          where: { reference },
        });

        if (existingPayment) return;

        // Find or create student
        let student = await tx.student.findUnique({
          where: { email: formData.email },
        });

        if (!student) {
          const bcrypt = await import("bcryptjs");
          const hashed = await bcrypt.hash(formData.password, 10);

          student = await tx.student.create({
            data: {
              surname: formData.surname,
              firstName: formData.firstName,
              middleName: formData.middleName,
              dob: new Date(formData.dob),
              gender: formData.gender,
              email: formData.email,
              password: hashed,
              address: formData.address,
              phone: formData.phone,
              nationality: formData.nationality,
              state: formData.state,
              lga: formData.lga,
              guardianName: formData.guardianName,
              guardianPhone: formData.guardianPhone,
              guardianAddress: formData.guardianAddress,
              relationship: formData.relationship,
              emergencyName: formData.emergencyName,
              emergencyPhone: formData.emergencyPhone,
              medicalInfo: formData.medicalInfo,
              department: formData.department,
              exam: formData.exam,
              subjects: formData.subjects, // Ensure this is JSON or String[]
              tradeSubject: formData.tradeSubject,
              agreedToConduct: Boolean(formData.agreedToConduct),
              status: "ACTIVE",
              paymentStatus: "PAID",
              paymentRef: reference,
              amountPaid: data.amount / 100,
            },
          });
        }

        // Create the payment record linked to student
        await tx.payment.create({
          data: {
            studentId: student.id,
            reference,
            amount: data.amount / 100,
            channel: data.channel,
            status: "SUCCESS",
          },
        });
      });

      console.log(`[Paystack Webhook] Success: ${reference}`);
      return NextResponse.json(
        { message: "Processed successfully" },
        { status: 200 },
      );
    } catch (dbError) {
      // CRITICAL: If the DB is down (Neon limit), we return a 500.
      // Paystack will see the 500 and retry sending this webhook every few hours.
      console.error("[Paystack Webhook] Database Error:", dbError);
      return NextResponse.json(
        { error: "Database unavailable" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
