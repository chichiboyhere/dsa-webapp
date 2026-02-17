// // components/ReceiptDownloadButton.tsx
// "use client";

// import { Download } from "lucide-react"; // Optional: for a nice icon

// export default function ReceiptDownloadButton({
//   receiptUrl,
//   fileName = "DSA_Receipt.pdf",
// }: {
//   receiptUrl: string | null | undefined;
//   fileName?: string;
// }) {
//   if (!receiptUrl) return null;

//   const handleDownload = async () => {
//     try {
//       const response = await fetch(receiptUrl);
//       // CHECK 1: Did the server return an error?
//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}`);
//       }

//       // CHECK 2: Is the content actually a PDF?
//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/pdf")) {
//         const text = await response.text();
//         console.error("Expected PDF but got:", text);
//         throw new Error("The server did not return a valid PDF file.");
//       }
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");

//       link.href = url;
//       link.setAttribute("download", fileName);
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       link.parentNode?.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       alert("Could not download the receipt. Please try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
//     >
//       <Download size={16} />
//       Download Receipt
//     </button>
//   );
// }

// components/ReceiptDownloadButton.tsx
"use client";

export default function ReceiptDownloadButton({
  paymentId,
  fileName,
}: {
  paymentId: string;
  fileName: string;
}) {
  const handleDownload = async () => {
    try {
      const res = await fetch(`/api/payment/${paymentId}/receipt`);

      if (!res.ok) {
        throw new Error("Download failed");
      }

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
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="text-blue-600 underline text-sm"
    >
      Download Receipt
    </button>
  );
}
