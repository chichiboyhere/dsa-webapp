import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCBTStatus } from "@/lib/cbt";
import CBTInterface from "@/components/cbt/CBTInterface";

export default async function StartCBT() {
  const studentId = (await cookies()).get("studentId")?.value;
  if (!studentId) redirect("/login");

  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  const cbt = getCBTStatus(student?.cbtExpiresAt);

  if (cbt.status !== "ACTIVE") {
    redirect("/dashboard");
  }

  return <CBTInterface student={student} />;
}
