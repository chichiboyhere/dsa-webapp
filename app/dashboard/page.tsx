// // app/dashboard/page.tsx
// import { getCurrentUser } from "@/lib/session";
// import DashboardTabs from "./DashboardTabs";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const student = await getCurrentUser();

//   // Guard clause: proxy.ts usually handles this, but this is a safe fallback
//   if (!student || !("status" in student)) {
//     redirect("/login");
//   }

//   return (
//     <div className="p-8 max-w-6xl mx-auto my-10">
//       <h1 className="text-xl">Welcome, {student.name}</h1>
//       <DashboardTabs student={student} />
//     </div>
//   );
// }

import { getCurrentUser } from "@/lib/session";
import DashboardTabs from "./DashboardTabs";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function DashboardPage() {
  const student = await getCurrentUser();

  if (!student || !("status" in student)) redirect("/login");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50/50 py-20">
        <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-12">
          {/* Disciplinary Alert System */}
          {(student.disciplinaryStatus === "UNDER_WATCH" ||
            student.disciplinaryStatus === "DISCIPLINED") && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="text-amber-600 shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold text-amber-900 text-sm">
                  Notice from Administration
                </h3>
                <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                  {student.disciplinaryNote ||
                    "Please visit the admin office regarding your current standing."}
                </p>
              </div>
            </div>
          )}

          <DashboardTabs student={student} />
        </div>
      </div>
      <Footer />
    </>
  );
}
