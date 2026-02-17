"use client";

import { useRouter } from "next/navigation";

export default function ApproveRejectActions({
  studentId,
}: {
  studentId: string;
}) {
  const router = useRouter();

  const act = async (action: "APPROVED" | "REJECTED") => {
    await fetch("/api/admin/students/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, action }),
    });

    router.push("/admin/approvals");
    router.refresh();
  };

  return (
    <div className="flex gap-4 mt-8">
      <button
        onClick={() => act("APPROVED")}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Approve
      </button>

      <button
        onClick={() => act("REJECTED")}
        className="bg-red-600 text-white px-6 py-2 rounded"
      >
        Reject
      </button>
    </div>
  );
}
