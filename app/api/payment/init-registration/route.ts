// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, formData } = await req.json();

//   if (!email || !formData) {
//     return NextResponse.json(
//       { error: "Invalid registration payload" },
//       { status: 400 },
//     );
//   }

//   const amount = 2000 * 100;

//   const res = await fetch("https://api.paystack.co/transaction/initialize", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email,
//       amount,
//       metadata: {
//         type: "REGISTRATION",
//         formData,
//       },
//       callback_url: `${process.env.APP_URL}/payment/verify`,
//     }),
//   });

//   const data = await res.json();

//   if (!data?.data?.authorization_url) {
//     return NextResponse.json(
//       { error: "Paystack init failed" },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json({
//     url: data.data.authorization_url,
//     reference: data.data.reference,
//   });
// }

// app/api/payment/init-registration/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // const { email, formData } = await req.json();

  // if (!email || !formData) {
  //   return NextResponse.json(
  //     { error: "Invalid registration payload" },
  //     { status: 400 },
  //   );
  // }

  // const amount = 1700 * 100; // 1,700 in kobo

  // const res = await fetch("https://api.paystack.co/transaction/initialize", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email,
  //     amount,
  //     subaccount: process.env.PAYSTACK_SUBACCOUNT, // 🔥 NEW
  //     bearer: "subaccount",
  //     metadata: {
  //       type: "REGISTRATION",
  //       formData,
  //     },
  //     callback_url: `${process.env.APP_URL}/payment/verify`,
  //   }),
  // });
  const { email, formData } = await req.json();
  const amount = 2000 * 100; // Total: 2,00 Naira

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount,
      subaccount: process.env.PAYSTACK_SUBACCOUNT, // Routes to Subaccount
      metadata: {
        type: "REGISTRATION",
        formData,
      },
      callback_url: `${process.env.APP_URL}/payment/verify`,
    }),
  });
  const data = await res.json();

  if (!data?.data?.authorization_url) {
    return NextResponse.json(
      { error: "Paystack init failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    url: data.data.authorization_url,
    reference: data.data.reference,
  });
}
