//app/admin/students/new

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CreateStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  // Photo State
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
    address: "",
    nationality: "Nigerian",
    state: "",
    lga: "",
    medicalInfo: "",
    guardianName: "",
    guardianPhone: "",
    guardianAddress: "",
    relationship: "",
    emergencyName: "",
    emergencyPhone: "",
    department: "",
    exam: "",
    subjects: [] as string[],
    tradeSubject: "",
  });
  const tradeOptions = ["Marketing", "Digital Technologies", "Fashion Design"];
  const genderOptions = ["Male", "Female"];
  // Handle Photo Preview
  useEffect(() => {
    if (!photoFile) return;
    const url = URL.createObjectURL(photoFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = "";

      // 1. Upload Photo if selected
      if (photoFile) {
        const formData = new FormData();
        formData.append("file", photoFile);
        const uploadRes = await fetch("/api/upload/photo", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Photo upload failed");
        const uploadData = await uploadRes.json();
        photoUrl = uploadData.url;
      }

      // 2. Create Student
      const res = await fetch("/api/admin/students/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photoUrl, // Send the uploaded URL to the API
          dob: new Date(form.dob).toISOString(),
        }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Something went wrong");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="font-semibold text-blue-600 border-b pb-2">
              Personal Details
            </h2>

            {/* Improved Photo Upload */}
            <div className="flex flex-col items-center py-4">
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-blue-400 flex items-center justify-center transition-all cursor-pointer">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Camera className="text-gray-300" size={32} />
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                />
              </div>
              <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase">
                {preview ? "Change Passport" : "Upload Passport"}
              </p>
            </div>

            {/* Input fields... similar to your code but using setForm consistently */}
            <input
              placeholder="First Name"
              required
              className="w-full p-2 border rounded"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              placeholder="Middle Name"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, middleName: e.target.value })}
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
            <div className="flex flex-wrap gap-4">
              <p className="text-sm font-medium text-gray-700">Gender</p>
              {genderOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={opt}
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
            <input
              placeholder="Phone Number"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              placeholder="Residential Address"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              placeholder="Nationality"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, nationality: e.target.value })
              }
            />
            <input
              placeholder="State"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />

            <input
              placeholder="LGA"
              required
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, lga: e.target.value })}
            />
          </section>

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
              required
              onChange={(e) => setForm({ ...form, exam: e.target.value })}
            >
              <option value="">Select Exam</option>
              <option value="JAMB">JAMB</option>
              <option value="WAEC">WAEC</option>
            </select>

            <div className="mt-2">
              <label className="text-sm font-medium">
                Subjects (Please add one subject at a time)
              </label>
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

            {/* Conditional Trade Subjects Logic */}
            {form.exam === "WAEC" && (
              <div className="p-4 bg-blue-50 rounded-xl space-y-3 border border-blue-100 animate-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Required Trade Subject (WAEC Only)
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Marketing", "Digital Technologies", "Fashion Design"].map(
                    (opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="tradeSubject"
                          value={opt}
                          checked={form.tradeSubject === opt}
                          onChange={(e) =>
                            setForm({ ...form, tradeSubject: e.target.value })
                          }
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {opt}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Subjects Adder... (Keep your existing subjects logic here) */}
          </section>
          <section className="space-y-4">
            <h2 className="font-semibold text-blue-600 border-b pb-2">
              Parent/Guardian
            </h2>
            <input
              placeholder="Parent/Guardian Name"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, guardianName: e.target.value })
              }
            />
            <input
              placeholder="Parent/Guardian Phone"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, guardianPhone: e.target.value })
              }
            />
            <input
              placeholder="Parent/Guardian Address"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, guardianAddress: e.target.value })
              }
            />
            <input
              placeholder="Relationship to Student"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, relationship: e.target.value })
              }
            />
          </section>
          {/* Medical Info */}
          <section className="space-y-4">
            <h2 className="font-semibold text-blue-600 border-b pb-2">
              Medical
            </h2>
            <input
              placeholder="Medical Condition"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, medicalInfo: e.target.value })
              }
            />
            <input
              placeholder="Emergency Contact Name"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, emergencyName: e.target.value })
              }
            />
            <input
              placeholder="Emergency Contact Phone"
              required
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, emergencyPhone: e.target.value })
              }
            />
          </section>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Registering..." : "Register Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
