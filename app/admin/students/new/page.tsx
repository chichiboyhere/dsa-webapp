//app/admin/students/new
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export default function CreateStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    gender: "MALE",
    dob: "",
    address: "",
    nationality: "Nigerian",
    state: "",
    lga: "",
    guardianName: "",
    guardianPhone: "",
    guardianAddress: "",
    relationship: "",
    emergencyName: "",
    emergencyPhone: "",
    department: "",
    exam: "",
    subjects: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/students/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        dob: new Date(form.dob).toISOString(), // Ensure date format for Prisma
      }),
    });

    if (res.ok) {
      router.push("/admin/students");
      router.refresh();
    } else {
      const err = await res.json();
      alert(err.error || "Something went wrong");
      setLoading(false);
    }
  };

  const addSubject = () => {
    if (newSubject.trim() && !form.subjects.includes(newSubject.trim())) {
      setForm({ ...form, subjects: [...form.subjects, newSubject.trim()] });
      setNewSubject("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border my-20">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Enroll New Student
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <section className="space-y-4">
            <h2 className="font-semibold text-blue-600 border-b pb-2">
              Personal Details
            </h2>
            <input
              placeholder="First Name"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              placeholder="Surname"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="date"
              placeholder="DOB"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </section>

          {/* Academic Info */}
          <section className="space-y-4">
            <h2 className="font-semibold text-blue-600 border-b pb-2">
              Academics
            </h2>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            >
              <option value="">Select Department</option>
              <option value="SCIENCE">Science</option>
              <option value="ARTS">Arts</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, exam: e.target.value })}
            >
              <option value="">Select Exam</option>
              <option value="JAMB">JAMB</option>
              <option value="WAEC">WAEC</option>
            </select>

            <div className="mt-2">
              <label className="text-sm font-medium">Subjects</label>
              <div className="flex flex-wrap gap-2 my-2">
                {form.subjects.map((s, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {s}{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          subjects: form.subjects.filter((_, idx) => idx !== i),
                        })
                      }
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="flex-1 p-2 border rounded text-sm"
                  placeholder="Add Subject"
                />
                <button
                  type="button"
                  onClick={addSubject}
                  className="bg-gray-800 text-white px-3 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
