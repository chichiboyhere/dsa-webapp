// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { title, content, adminId } = await req.json();

//     const broadcast = await prisma.broadcast.create({
//       data: {
//         title,
//         content,
//         adminId, // Ensure this exists in your Admin table
//       },
//     });

//     return NextResponse.json(broadcast);
//   } catch (error) {
//     return NextResponse.json({ error: "Broadcast failed" }, { status: 500 });
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content, adminId } = await req.json();

    if (!adminId) throw new Error("Admin ID is required");

    const broadcast = await prisma.broadcast.create({
      data: {
        title,
        content,
        adminId,
      },
    });

    return NextResponse.json({ success: true, broadcast });
  } catch (error: any) {
    console.error("Broadcast Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
