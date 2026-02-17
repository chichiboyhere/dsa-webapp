"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
//import Link from "next/link";

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
  if (!students.length) return <p>No pending registrations 🎉</p>;

  return (
    <div className="p-6 my-12 min-h-screen">
      <h1 className="text-xl font-bold mb-6">Pending Student Registrations</h1>

      <div className="space-y-4">
        {students.map((s) => (
          <div
            key={s.id}
            className="border rounded p-4 flex gap-4 items-center"
          >
            {s.photoUrl && (
              <Image
                src={s.photoUrl}
                alt="Student photo"
                width={80}
                height={80}
                className="rounded"
              />
            )}

            <div className="flex-1">
              <p className="font-semibold text-lg">
                {s.firstName} {s.surname}
              </p>
              <p className="text-sm text-gray-600">{s.email}</p>
              <p className="text-sm">
                {s.department} – {s.exam}
              </p>
            </div>

            <button
              onClick={() => router.push(`/admin/students/${s.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
