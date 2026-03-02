//app/dashboard/sections/NoticeBoard.tsx
import { prisma } from "@/lib/prisma";
import { Bell, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function NoticeBoard() {
  const broadcasts = await prisma.broadcast.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { admin: { select: { name: true } } },
  });

  if (broadcasts.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Bell size={18} className="animate-bounce" />
          <h2 className="font-bold tracking-tight">Latest Announcements</h2>
        </div>
        <Link
          href="/dashboard/announcements"
          className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-slate-50">
        {broadcasts.map((post) => (
          <div
            key={post.id}
            className="p-5 hover:bg-slate-50 transition-colors group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {post.category || "General"}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors mb-2">
              {post.title}
            </h3>

            {/* SAFE HTML RENDERING */}
            <div
              className="text-sm text-slate-600 line-clamp-2 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/dashboard/announcements/${post.id}`}
                className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
              >
                Read Full Announcement <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
