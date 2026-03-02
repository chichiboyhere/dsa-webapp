//app/admin/messages/actions.ts
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin");
}
