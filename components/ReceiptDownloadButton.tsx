// // components/ReceiptDownloadButton.tsx
// "use client";

// export default function ReceiptDownloadButton({
//   paymentId,
//   fileName,
// }: {
//   paymentId: string;
//   fileName: string;
// }) {
//   const handleDownload = async () => {
//     try {
//       const res = await fetch(`/api/payment/${paymentId}/receipt`);

//       if (!res.ok) {
//         throw new Error("Download failed");
//       }

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (err) {
//       alert("Could not download the receipt. Please try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="text-blue-600 underline text-sm"
//     >
//       Download Receipt
//     </button>
//   );
// }

"use client";

import { useState } from "react";
import { FileText, Loader2, Download } from "lucide-react";

export default function ReceiptDownloadButton({
  paymentId,
  fileName,
}: {
  paymentId: string;
  fileName: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/payment/${paymentId}/receipt`);
      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Could not download the receipt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-lg text-xs font-bold transition-all border border-transparent hover:border-blue-100 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <FileText size={14} />
      )}
      {loading ? "Generating..." : "Download Receipt"}
    </button>
  );
}
