import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  await prisma.cBTQuestion.createMany({
    data: [
      {
        subject: "Mathematics",
        question: "What is 2 + 2?",
        options: ["2", "3", "4", "5"],
        correct: "4",
      },
      {
        subject: "English",
        question: "Choose the correct spelling",
        options: ["Recieve", "Receive", "Receeve", "Recive"],
        correct: "Receive",
      },
      {
        subject: "Physics",
        question: "Unit of force is?",
        options: ["Newton", "Joule", "Watt", "Volt"],
        correct: "Newton",
      },
    ],
  });

  return NextResponse.json({ ok: true });
}
