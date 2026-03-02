//app/admin/messages/page.tsx
import { prisma } from "@/lib/prisma";
import { Mail, MailOpen, Trash2, Calendar } from "lucide-react";

import MarkReadButton from "@/components/admin/MarkReadButton";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inbound Messages</h1>
        <p className="text-sm text-gray-500">
          {messages.length} total messages
        </p>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="p-20 text-center bg-white rounded-2xl border border-dashed text-gray-400">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all ${
                msg.isRead
                  ? "bg-white opacity-75"
                  : "bg-white border-blue-200 shadow-md ring-1 ring-blue-50"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {!msg.isRead ? (
                      <Mail className="text-blue-600" size={18} />
                    ) : (
                      <MailOpen className="text-gray-400" size={18} />
                    )}
                    <h3
                      className={`font-bold ${!msg.isRead ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {msg.name}
                    </h3>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-slate-500">
                      {msg.interest}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />{" "}
                    {new Date(msg.createdAt).toLocaleString()} | {msg.email}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4 bg-slate-50 p-4 rounded-xl">
                    {msg.message}
                  </p>
                </div>

                <div className="flex md:flex-col justify-end gap-2">
                  {!msg.isRead && <MarkReadButton messageId={msg.id} />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
