//components/admin/BroadcastEditor.tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
});

export default function BroadcastEditor({ adminId }: { adminId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!title || !content) return alert("Please fill all fields");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        body: JSON.stringify({ title, content, adminId }),
      });
      if (res.ok) {
        alert("Broadcast sent successfully!");
        setTitle("");
        setContent("");
      }
    } catch (err) {
      alert("Failed to send broadcast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
      <input
        type="text"
        placeholder="Message Title (e.g., Important: Holiday Notice)"
        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="h-64 mb-12">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-full rounded-xl"
        />
      </div>

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
      >
        {loading ? "Sending..." : "Publish Broadcast to Students"}
      </button>
    </div>
  );
}
