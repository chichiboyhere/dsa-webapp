//app/admin/settings/page.tsx
"use client";

import { useState } from "react";

export default function AdminPasswordChange() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current, next }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || "Failed");
    } else {
      setMsg("Password changed successfully");
      setCurrent("");
      setNext("");
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <div className="max-w-md border p-6 rounded">
        <h2 className="font-bold mb-4 text-black">Change Password</h2>

        {msg && <p className="text-sm mb-3 text-black">{msg}</p>}

        <input
          className="border p-2 w-full mb-3 text-black"
          type="password"
          placeholder="Current password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 text-black"
          type="password"
          placeholder="New password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />

        <button onClick={submit} className="bg-blue-600 text-white w-full py-2">
          Update Password
        </button>
      </div>
    </div>
  );
}
