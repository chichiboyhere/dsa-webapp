//app/dashboard/announcements/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { ChevronLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AnnouncementDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const announcement = await prisma.broadcast.findUnique({
    where: { id },
    include: { admin: { select: { name: true } } },
  });

  if (!announcement) notFound();

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors text-sm font-bold"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <header className="mb-10 border-b pb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
            {announcement.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar size={16} />{" "}
              {new Date(announcement.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <User size={16} /> Posted by{" "}
              {announcement.admin?.name || "Administration"}
            </div>
          </div>
        </header>

        {/* FULL CONTENT: Uses 'prose' for proper formatting */}
        <article className="prose prose-blue lg:prose-lg max-w-none bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div
            className="whitespace-pre-wrap wrap-break-word text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          />
        </article>
      </div>
    </div>
  );
}
