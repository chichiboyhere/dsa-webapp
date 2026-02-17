// app/dashboard/page.tsx
// import { prisma } from "@/lib/prisma";
// import { cookies } from "next/headers";
// import { verifyJWT } from "@/lib/auth"; // Import your JWT helper
// import DashboardTabs from "./DashboardTabs";

// export default async function DashboardPage() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   // 1. If no token exists, the user isn't logged in
//   if (!token) return null;

//   // 2. Decrypt the token to get the studentId
//   const payload = await verifyJWT(token);

//   // 3. Check if payload exists and the role is correct
//   if (!payload || payload.role !== "STUDENT") {
//     return null;
//   }

//   const student = await prisma.student.findUnique({
//     where: { id: payload.id }, // Use the ID from the JWT payload
//     include: {
//       payments: true,
//       cbtAttempts: {
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   });

//   if (!student) return null;

//   const safeStudent = {
//     ...student,
//     cbtAttempts: student?.cbtAttempts ?? [],
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto my-10">
//       <h1 className="text-xl">Student Dashboard</h1>
//       <DashboardTabs student={safeStudent} />
//     </div>
//   );
// }

// app/dashboard/page.tsx
import { getCurrentUser } from "@/lib/session";
import DashboardTabs from "./DashboardTabs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const student = await getCurrentUser();

  // Guard clause: proxy.ts usually handles this, but this is a safe fallback
  if (!student || !("status" in student)) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-6xl mx-auto my-10">
      <h1 className="text-xl">Welcome, {student.name}</h1>
      <DashboardTabs student={student} />
    </div>
  );
}
