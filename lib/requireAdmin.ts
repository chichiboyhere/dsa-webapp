import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.error("Auth Debug: No 'token' cookie found");
    throw new Error("UNAUTHORIZED");
  }

  try {
    // 1. Verify and Decode the JWT
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // 2. Check the role in the token payload
    if (payload.role !== "ADMIN") {
      throw new Error("UNAUTHORIZED");
    }

    // 3. Optional: Verify admin still exists in DB
    const admin = await prisma.admin.findUnique({
      where: { id: payload.id as string },
    });

    if (!admin) {
      throw new Error("UNAUTHORIZED");
    }

    return admin;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new Error("UNAUTHORIZED");
  }
}

export default requireAdmin;
