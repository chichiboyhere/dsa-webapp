"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Trash2, Plus, X, UserCheck, UserMinus } from "lucide-react";

export default function AdminStudentForm({ student }: { student: any }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Helper to format Date object to YYYY-MM-DD for the input field
  const formatDate = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    firstName: student.firstName,
    surname: student.surname,
    middleName: student.middleName,
    // dob: student.dob,
    dob: formatDate(student.dob),
    gender: student.gender,
    address: student.address,
    nationality: student.nationality,
    state: student.state,
    lga: student.lga,
    guardianName: student.guardianName,
    relationship: student.relationship,
    guardianAddress: student.guardianAddress,
    guardianPhone: student.guardianPhone,
    email: student.email,
    phone: student.phone,
    department: student.department,
    photoUrl: student.photoUrl,
    disciplinaryStatus: student.disciplinaryStatus || "SATISFACTORY",
    disciplinaryNote: student.disciplinaryNote || "",
    subjects: Array.isArray(student.subjects) ? student.subjects : [],
    tradeSubject: student.tradeSubject || "",
  });

  const tradeOptions = ["Marketing", "Digital Technologies", "Fashion Design"];
  const genderOptions = ["Male", "Female"];

  const handleAction = async (action: "APPROVED" | "REJECTED" | "UPDATE") => {
    if (!confirm(`Are you sure you want to ${action.toLowerCase()}?`)) return;

    setLoading(true);
    const endpoint =
      action === "UPDATE"
        ? "/api/admin/students/update"
        : "/api/admin/students/approve";

    // Prepare data: convert DOB string back to ISO Date for Prisma
    const submissionData = {
      ...form,
      dob: new Date(form.dob).toISOString(),
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student.id,
        action,
        updates: submissionData,
      }),
    });

    if (res.ok) {
      router.push(action === "UPDATE" ? "/admin/students" : "/admin/approvals");
      router.refresh();
    } else {
      alert("Failed to process request");
      setLoading(false);
    }
  };
  const [newSubject, setNewSubject] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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

  // const handleAction = async (action: "APPROVED" | "REJECTED" | "UPDATE") => {
  //   const confirmMsg =
  //     action === "UPDATE"
  //       ? "Update student records?"
  //       : `Are you sure you want to ${action.toLowerCase()} this student?`;

  //   if (!confirm(confirmMsg)) return;

  //   setLoading(true);
  //   // Note: If action is "UPDATE", use your update endpoint, else use approve endpoint
  //   const endpoint =
  //     action === "UPDATE"
  //       ? "/api/admin/students/update"
  //       : "/api/admin/students/approve";

  //   const res = await fetch(endpoint, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ studentId: student.id, action, updates: form }),
  //   });

  //   if (res.ok) {
  //     router.push(action === "UPDATE" ? "/admin/students" : "/admin/approvals");
  //     router.refresh();
  //   } else {
  //     alert("Failed to process request");
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 max-w-5xl mx-auto my-8">
      <div className="p-1 bg-blue-600" /> {/* Top accent bar */}
      <div className="p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Profile & Status Section */}
          <div className="flex flex-col items-center space-y-6 w-full lg:w-1/3">
            <div className="relative group">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transition-transform group-hover:scale-[1.02]">
                <Image
                  src={form.photoUrl || "/placeholder-user.png"}
                  alt="Student"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
              >
                <Camera size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="w-full space-y-4">
              <div className="text-center">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${
                    student.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Disciplinary Standing
                </label>
                <select
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={form.disciplinaryStatus}
                  onChange={(e) =>
                    setForm({ ...form, disciplinaryStatus: e.target.value })
                  }
                >
                  <option value="DISTINCTIVE">
                    🌟 Distinctive / Emulation
                  </option>
                  <option value="SATISFACTORY">✅ Satisfactory</option>
                  <option value="UNDER_WATCH">⚠️ Under Watch</option>
                  <option value="DISCIPLINED">🚫 Disciplinary </option>
                </select>
              </div>

              {(form.disciplinaryStatus === "UNDER_WATCH" ||
                form.disciplinaryStatus === "PROBATION") && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                    Disciplinary Notes
                  </label>
                  <textarea
                    className="w-full mt-1 p-3 bg-red-50 border border-red-100 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Provide details for the watch list..."
                    rows={4}
                    value={form.disciplinaryNote}
                    onChange={(e) =>
                      setForm({ ...form, disciplinaryNote: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Detailed Information Section */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  First Name
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Middle Name
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.middleName}
                  onChange={(e) =>
                    setForm({ ...form, middleName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Surname
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.surname}
                  onChange={(e) =>
                    setForm({ ...form, surname: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Gender
                </label>

                <div className="flex flex-wrap gap-4">
                  {genderOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={opt}
                        checked={form.gender === opt}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Email Address
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none text-gray-500"
                  value={form.email}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Phone Number
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Address
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Nationality
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.nationality}
                  onChange={(e) =>
                    setForm({ ...form, nationality: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  State
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Local Govt Area
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.lga}
                  onChange={(e) => setForm({ ...form, lga: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Parent/Guardian
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.guardianName}
                  onChange={(e) =>
                    setForm({ ...form, guardianName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Relationship
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.relationship}
                  onChange={(e) =>
                    setForm({ ...form, relationship: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Parent/Guardian Address
                </label>
                <input
                  className="w-full bg-gray-50 border-b-2 border-transparent p-3 rounded-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  value={form.guardianAddress}
                  onChange={(e) =>
                    setForm({ ...form, guardianAddress: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Subjects Section */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                Registered Subjects{" "}
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px]">
                  {form.subjects.length}
                </span>
              </label>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                {form.subjects.map((sub: string, i: number) => (
                  <span
                    key={i}
                    className="flex items-center bg-white shadow-sm text-gray-700 px-4 py-1.5 rounded-xl text-sm font-medium border border-gray-100 group"
                  >
                    {sub}
                    <button
                      onClick={() => removeSubject(i)}
                      className="ml-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              {student.exam === "WAEC" && (
                <div className="p-4 bg-blue-50 rounded-xl space-y-3 border border-blue-100">
                  <label className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Required Trade Subject (WAEC Only)
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {tradeOptions.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="tradeSubject"
                          value={opt}
                          checked={form.tradeSubject === opt}
                          onChange={(e) =>
                            setForm({ ...form, tradeSubject: e.target.value })
                          }
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Physics"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSubject()}
                />
                <button
                  onClick={addSubject}
                  className="bg-gray-800 text-white p-2 px-6 rounded-xl hover:bg-black transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-8">
          {student.status === "AWAITING_APPROVAL" ? (
            <>
              <button
                disabled={loading}
                onClick={() => handleAction("REJECTED")}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-bold"
              >
                <Trash2 size={18} /> Reject & Expel
              </button>
              <button
                disabled={loading}
                onClick={() => handleAction("APPROVED")}
                className="flex items-center justify-center gap-2 px-10 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all font-bold"
              >
                <UserCheck size={18} />{" "}
                {loading ? "Processing..." : "Approve & Generate ID"}
              </button>
            </>
          ) : (
            <button
              disabled={loading}
              onClick={() => handleAction("UPDATE")}
              className="flex items-center justify-center gap-2 px-10 py-3 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg transition-all font-bold"
            >
              Update Records
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
