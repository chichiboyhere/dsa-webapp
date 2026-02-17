//app/dashboard/sections/Payments.tsx

"use client";

import { useState } from "react";
import { getTuitionStatus } from "@/lib/tuition";
import ReceiptDownloadButton from "@/components/ReceiptDownloadButton";
export default function Payments({ student }: any) {
  const [loading, setLoading] = useState<string | null>(null);

  const pay = async (type: "TUITION" | "CBT") => {
    setLoading(type);

    const res = await fetch("/api/payment/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };
  const tuition = getTuitionStatus(student.tuitionPaidAt);
  return (
    <div className="space-y-6">
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Tuition</h2>

        {tuition.status === "ACTIVE" && (
          <p className="text-green-600">
            Tuition active ({tuition.daysLeft} days left)
          </p>
        )}

        {tuition.status !== "ACTIVE" && (
          <button
            onClick={() => pay("TUITION")}
            className="bg-blue-600 text-white px-4 py-2"
          >
            {tuition.status === "EXPIRED" ? "Renew Tuition" : "Pay Tuition"}
          </button>
        )}
      </div>

      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">CBT</h2>

        <button
          onClick={() => pay("CBT")}
          disabled={loading === "CBT"}
          className="bg-purple-600 text-white px-4 py-2"
        >
          Pay CBT
        </button>
      </div>
      {/* <button
          onClick={() => getReceipt()}
         
          className="bg-purple-600 text-white px-4 py-2"
        >
          Pay CBT
        </button> */}

      {student.payments?.map((payment: any) => (
        <div
          key={payment.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p className="font-medium">{payment.description || "School Fee"}</p>
            <p className="text-xs text-gray-500">
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-700">
              ₦{payment.amount.toLocaleString()}
            </p>
            {/* Pass the receiptUrl from your Payment model */}
            {/* <ReceiptDownloadButton
              receiptUrl={payment.receiptUrl}
              fileName={`DSA_Receipt_${payment.reference}.pdf`}
            /> */}

            <ReceiptDownloadButton
              paymentId={payment.id}
              fileName={`DSA_Receipt_${payment.reference}.pdf`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
