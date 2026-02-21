import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      email: "admin@dsa.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin seeded successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
