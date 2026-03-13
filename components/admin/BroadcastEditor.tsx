//components/admin/BroadcastEditor.tsx
"use client";
import dynamic from "next/dynamic";
import { useState, useRef, useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

// We use dynamic import for Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
});

export default function BroadcastEditor({ adminId }: { adminId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const quillRef = useRef<any>(null); // Reference to the editor instance

  // --- Multimedia Handler Logic ---
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    // Accept images and PDFs
    input.setAttribute("accept", "image/*,application/pdf");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload/photo", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) throw new Error("Upload failed");

        const quill = quillRef.current?.getEditor();
        const range = quill?.getSelection();

        if (file.type.includes("image")) {
          // If it's an image, embed it directly in the text
          quill.insertEmbed(range.index, "image", data.url);
        } else {
          // If it's a PDF/File, insert it as a clickable link
          quill.insertText(range.index, " [Attachment: Click to View File] ", {
            link: data.url,
            bold: true,
            color: "#2563eb", // blue-600
          });
        }
      } catch (err) {
        alert("File upload failed. Please try again.");
      }
    };
  };

  // --- Quill Configuration ---
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"], // "image" button will trigger our imageHandler
          ["clean"],
        ],
        handlers: {
          image: imageHandler, // Hijack the image button
        },
      },
    }),
    [],
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list", // This covers both bullet and ordered lists
    "link",
    "image",
  ];

  const handleSend = async () => {
    if (!title || !content) return alert("Please fill all fields");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="h-80 mb-16">
        {" "}
        {/* Increased height for better editing */}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="h-full rounded-xl"
          placeholder="Type your announcement and use the image icon to upload files..."
        />
      </div>

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md"
      >
        {loading ? "Publishing..." : "Publish Broadcast to Students"}
      </button>
    </div>
  );
}
