"use client";
import { markAsRead } from "@/app/admin/messages/actions";
import { Check } from "lucide-react";
import { useTransition } from "react";

export default function MarkReadButton({ messageId }: { messageId: string }) {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => markAsRead(messageId))}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
    >
      <Check size={14} /> {isPending ? "Updating..." : "Mark as Read"}
    </button>
  );
}
