//app/admin/approvals/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
//import Link from "next/link";

export const dynamic = "force-dynamic";
export default function AdminApprovals() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/students/pending")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading…</p>;
  if (!students.length)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">No pending registrations 🎉</p>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 py-12 my-12 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Pending Student Registrations
      </h1>

      <div className="space-y-6">
        {students.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-center gap-4 transition hover:shadow-md"
          >
            {s.photoUrl && (
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src={s.photoUrl}
                  alt="Student photo"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}

            <div className="flex-1 text-center md:text-left">
              <p className="font-semibold text-lg text-gray-800">
                {s.firstName} {s.surname}
              </p>
              <p className="text-sm text-gray-600 break-words">{s.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {s.department} – {s.exam}
              </p>
            </div>

            <div className="w-full md:w-auto">
              <button
                onClick={() => router.push(`/admin/students/${s.id}`)}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-lg font-medium"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
