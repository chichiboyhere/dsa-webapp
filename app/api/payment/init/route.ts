// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, formData } = await req.json();

//   const response = await fetch(
//     "https://api.paystack.co/transaction/initialize",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         amount: 1700 * 100,
//         metadata: {
//           formData,
//           type: "DSA_REG",
//         },
//         callback_url: `${process.env.APP_URL}/payment/verify`,
//       }),
//     },
//   );

//   if (!response.ok) {
//     const text = await response.text();
//     console.error("Paystack error:", text);
//     return NextResponse.json(
//       { error: "Paystack init failed" },
//       { status: 500 },
//     );
//   }

//   const data = await response.json();

//   return NextResponse.json({
//     url: data.data.authorization_url,
//     reference: data.data.reference,
//   });
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { calculateFee } from "@/lib/pricing";

export async function POST(req: Request) {
  const { type } = await req.json();

  if (!type || !["TUITION", "CBT"].includes(type)) {
    return NextResponse.json(
      { error: "Invalid payment type" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const studentId = cookieStore.get("studentId")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const amount = calculateFee(type); // returns NAIRA

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: student.email,
      amount: amount * 100, // convert to kobo
      metadata: {
        type,
        studentId,
      },
      callback_url: `${process.env.APP_URL}/payment/verify`,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json(
      { error: "Payment initialization failed", details: error },
      { status: 500 },
    );
  }

  const data = await res.json();

  return NextResponse.json({
    url: data.data.authorization_url,
    reference: data.data.reference,
  });
}
