// //app/api/payment/init/route.ts

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { cookies } from "next/headers";
// import { calculateFee } from "@/lib/pricing";
// import { verifyJWT } from "@/lib/auth";

// export async function POST(req: Request) {
//   const { type } = await req.json();

//   if (!type || !["TUITION", "CBT"].includes(type)) {
//     return NextResponse.json(
//       { error: "Invalid payment type" },
//       { status: 400 },
//     );
//   }

//   // const cookieStore = await cookies();
//   // const studentId = cookieStore.get("studentId")?.value;
//   //New JWT replacement starts
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const payload = await verifyJWT(token);

//   if (!payload || payload.role !== "STUDENT") {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }
//   //New JWT replacement ends

//   if (!studentId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const student = await prisma.student.findUnique({
//     where: { id: studentId },
//   });

//   if (!student) {
//     return NextResponse.json({ error: "Student not found" }, { status: 404 });
//   }

//   const amount = calculateFee(type); // returns NAIRA

//   const res = await fetch("https://api.paystack.co/transaction/initialize", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: student.email,
//       amount: amount * 100, // convert to kobo
//       metadata: {
//         type,
//         studentId,
//       },
//       callback_url: `${process.env.APP_URL}/payment/verify`,
//     }),
//   });

//   if (!res.ok) {
//     const error = await res.text();
//     return NextResponse.json(
//       { error: "Payment initialization failed", details: error },
//       { status: 500 },
//     );
//   }

//   const data = await res.json();

//   return NextResponse.json({
//     url: data.data.authorization_url,
//     reference: data.data.reference,
//   });
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { calculateFee } from "@/lib/pricing";
import { verifyJWT } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    if (!type || !["TUITION", "CBT"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid payment type" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyJWT(token);

    // Extract studentId from the JWT payload
    if (!payload || payload.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentId = payload.id; // Map payload ID to studentId

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const amount = calculateFee(type);

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: student.email,
        amount: amount * 100, // Paystack expects Kobo
        metadata: {
          type,
          studentId,
        },
        callback_url: `${process.env.APP_URL}/payment/verify`,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Paystack Init Failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("PAYMENT_INIT_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
