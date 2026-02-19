// "use client";

// import { useState } from "react";
// import Image from "next/image";

// export default function StudentApprovalForm({ student }: any) {
//   const [form, setForm] = useState({
//     firstName: student.firstName,
//     surname: student.surname,
//     email: student.email,
//     phone: student.phone,
//     department: student.department,
//     exam: student.exam,
//     subjects: student.subjects,
//   });

//   const update = (key: string, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const save = async () => {
//     await fetch("/api/admin/students/update", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         studentId: student.id,
//         data: form,
//       }),
//     });

//     alert("Student record updated");
//   };

//   const approve = async () => {
//     await fetch("/api/admin/students/approve", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ studentId: student.id }),
//     });

//     window.location.href = "/admin/approvals";
//   };

//   const reject = async () => {
//     await fetch("/api/admin/students/reject", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ studentId: student.id }),
//     });

//     window.location.href = "/admin/approvals";
//   };

//   return (
//     <div className="space-y-4">
//       {student.photoUrl && (
//         <Image
//           src={student.photoUrl}
//           alt="Student photo"
//           width={80}
//           height={80}
//           className="rounded"
//         />
//       )}
//       <input
//         className="border p-2 w-full"
//         value={form.firstName}
//         onChange={(e) => update("firstName", e.target.value)}
//       />

//       <input
//         className="border p-2 w-full"
//         value={form.surname}
//         onChange={(e) => update("surname", e.target.value)}
//       />

//       <input
//         className="border p-2 w-full"
//         value={form.email}
//         onChange={(e) => update("email", e.target.value)}
//       />

//       <input
//         className="border p-2 w-full"
//         value={form.phone}
//         onChange={(e) => update("phone", e.target.value)}
//       />
//       <input
//         className="border p-2 w-full"
//         value={form.department}
//         onChange={(e) => update("department", e.target.value)}
//       />
//       <input
//         className="border p-2 w-full"
//         value={form.subjects}
//         onChange={(e) => update("subjects", e.target.value)}
//       />

//       <div className="flex gap-4 pt-4">
//         <button
//           onClick={save}
//           className="bg-gray-700 text-white px-4 py-2 rounded"
//         >
//           Save Changes
//         </button>

//         <button
//           onClick={approve}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Approve
//         </button>

//         <button
//           onClick={reject}
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Reject
//         </button>
//       </div>
//     </div>
//   );
// }

//app/admin/students/[studentId]/StudentApprovalForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminStudentForm({ student }: { student: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: student.firstName,
    surname: student.surname,
    email: student.email,
    phone: student.phone,
    department: student.department,
    subjects: Array.isArray(student.subjects) ? student.subjects : [],
  });

  const [newSubject, setNewSubject] = useState("");

  const addSubject = () => {
    if (newSubject.trim() && !form.subjects.includes(newSubject.trim())) {
      setForm({ ...form, subjects: [...form.subjects, newSubject.trim()] });
      setNewSubject("");
    }
  };

  const removeSubject = (index: number) => {
    setForm({
      ...form,
      subjects: form.subjects.filter((_: any, i: number) => i !== index),
    });
  };

  const handleAction = async (action: "APPROVED" | "REJECTED") => {
    if (
      !confirm(`Are you sure you want to ${action.toLowerCase()} this student?`)
    )
      return;

    setLoading(true);
    const res = await fetch("/api/admin/students/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student.id, action, updates: form }),
    });

    if (res.ok) {
      router.push("/admin/approvals");
      router.refresh();
    } else {
      alert("Failed to process request");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 border-4 border-blue-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={student.photoUrl || "/placeholder-user.png"}
              alt="Student"
              fill
              className="object-cover"
            />
          </div>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
            {student.status}
          </span>
        </div>

        {/* Form Section */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              First Name
            </label>
            <input
              className="w-full border-b p-2 outline-none focus:border-blue-500 transition"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Surname
            </label>
            <input
              className="w-full border-b p-2 outline-none focus:border-blue-500 transition"
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
            />
          </div>

          {/* Subjects JSON Editor */}
          <div className="md:col-span-2 mt-4">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Registered Subjects
            </label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {form.subjects.map((sub: string, i: number) => (
                <span
                  key={i}
                  className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                >
                  {sub}
                  <button
                    onClick={() => removeSubject(i)}
                    className="ml-2 text-blue-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 border rounded p-2 text-sm"
                placeholder="Add new subject..."
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubject()}
              />
              <button
                onClick={addSubject}
                type="button"
                className="bg-gray-100 px-4 py-2 rounded text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end gap-4 border-t pt-6">
        <button
          disabled={loading}
          onClick={() => handleAction("REJECTED")}
          className="px-6 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
        >
          Reject & Discard
        </button>
        <button
          disabled={loading}
          onClick={() => handleAction("APPROVED")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition font-medium"
        >
          {loading ? "Processing..." : "Approve Student"}
        </button>
      </div>
    </div>
  );
}
