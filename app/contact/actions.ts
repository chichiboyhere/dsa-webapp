"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendContactMessage(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const interest = formData.get("interest") as string;
    const message = formData.get("message") as string;

    await prisma.contactMessage.create({
      data: { name, email, interest, message },
    });

    revalidatePath("/admin");

    return {
      success: true,
      message:
        "Your message has been sent successfully! We'll get back to you shortly.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
