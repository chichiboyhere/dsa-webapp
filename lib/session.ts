// lib/session.ts
import { cookies } from "next/headers";
import { verifyJWT } from "./auth";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = await verifyJWT(token);
  if (!payload) return null;

  // Fetch the user based on the role stored in the JWT
  if (payload.role === "ADMIN") {
    return await prisma.admin.findUnique({ where: { id: payload.id } });
  }

  if (payload.role === "STUDENT") {
    return await prisma.student.findUnique({
      where: { id: payload.id },
      include: { payments: true }, // common includes for students
    });
  }

  return null;
}
