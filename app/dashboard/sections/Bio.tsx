// app/dashboard/sections/Bio.tsx
"use client";
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

export default function Bio({ student }: any) {
  //const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: student.phone,
    currentPassword: "",
    newPassword: "",
    address: student.address || "",
  });

  // Inside Bio.tsx
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSave = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/student/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000); // Reset after 3 seconds
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* {msg && <p className="text-sm mb-3">{msg}</p>} */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Personal Info
          </h3>
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              Full Name
            </p>
            <p className="font-semibold text-gray-800">
              {student.firstName} {student.surname}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              Email
            </p>
            <p className="font-semibold text-gray-800">{student.email}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Contact Details
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-bold">
                Phone Number
              </label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-[10px] text-gray-400 uppercase font-bold">
                Current Password
              </label>
              <input
                value={form.currentPassword}
                type="password"
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
                className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-[10px] text-gray-400 uppercase font-bold">
                New Password
              </label>
              <input
                value={form.newPassword}
                type="password"
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-[10px] text-gray-400 uppercase font-bold">
                Address
              </label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={status === "loading"}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold shadow-lg transition-all ${
                status === "success"
                  ? "bg-green-500 text-white"
                  : status === "error"
                    ? "bg-red-500 text-white"
                    : "bg-blue-600 text-white shadow-blue-100"
              }`}
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {status === "success"
                ? "Saved!"
                : status === "error"
                  ? "Failed"
                  : "Save Changes"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
