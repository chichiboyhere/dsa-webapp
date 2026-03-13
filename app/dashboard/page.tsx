// app/dashboard/page.tsx

import { getCurrentUser } from "@/lib/session";
import DashboardTabs from "./DashboardTabs";
import { redirect } from "next/navigation";
import { AlertCircle, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import NoticeBoard from "./sections/NoticeBoard";
import Link from "next/link";

export default async function DashboardPage() {
  const student = await getCurrentUser();

  if (!student || !("status" in student)) redirect("/login");

  const broadcasts = await prisma.broadcast.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

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
          {broadcasts.length > 0 && (
            <div className="my-10 flex ">
              <h1 className="text-2xl font-bold text-gray-800  ">
                Announcement
              </h1>
            </div>
          )}
          {broadcasts.map((msg) => (
            <div
              key={msg.id}
              className="border-l-4 border-blue-600 bg-white p-6 my-4 rounded-r-2xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {msg.title}
                </h4>
                <span className="text-[10px] text-slate-400 whitespace-nowrap ml-4">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* The Preview: Limits to 2 lines and hides overflow */}
              <div
                className="text-sm text-slate-600 line-clamp-2 mb-4 prose prose-sm"
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />

              <Link
                href={`/dashboard/announcements/${msg.id}`}
                className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
              >
                Read Full Announcement <ChevronRight size={14} />
              </Link>
            </div>
          ))}

          <DashboardTabs
            student={student}
            noticeBoardContent={<NoticeBoard />}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
