//app/dashboard/sections/Payments.tsx

"use client";

import { useState } from "react";
import { calculateFee } from "@/lib/pricing"; // Import this to show price in modal
import ReceiptDownloadButton from "@/components/ReceiptDownloadButton";
import { Fragment } from "react";

export const dynamic = "force-dynamic";
export default function Payments({ student }: any) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"TUITION" | "CBT" | null>(
    null,
  );

  const handleOpenModal = (type: "TUITION" | "CBT") => {
    setSelectedType(type);
    setModalOpen(true);
  };

  const initiatePayment = async () => {
    if (!selectedType) return;
    setLoading(true);
    try {
      const res = await fetch("/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: " + data.error);
        setLoading(false);
      }
    } catch (err) {
      alert("Payment failed to initialize");
      setLoading(false);
    }
  };

  // Logic for the tuition status
  const today = new Date();
  const isPaidThisMonth =
    student.tuitionPaidAt &&
    new Date(student.tuitionPaidAt).getMonth() === today.getMonth();

  return (
    <div className="space-y-6 p-4">
      {/* Tuition Card */}
      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <h2 className="font-bold text-xl mb-4 text-gray-800">
          Tuition Management
        </h2>
        {isPaidThisMonth ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700">
            ✓ Your tuition is active for this month.
          </div>
        ) : (
          <button
            onClick={() => handleOpenModal("TUITION")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            {student.tuitionPaidAt ? "Renew Tuition" : "Pay Tuition"}
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>
            <p className="text-gray-600 mb-6">
              You are about to pay for{" "}
              <span className="font-bold">{selectedType}</span>. Based on
              today&apos; date ({new Date().toLocaleDateString()}), the fee is:
              <br />
              <span className="text-2xl font-black text-blue-600">
                ₦{calculateFee(selectedType!).toLocaleString()}
              </span>
            </p>

            <div className="flex gap-3">
              <button
                disabled={loading}
                onClick={initiatePayment}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Processing..." : "Proceed to Paystack"}
              </button>
              <button
                disabled={loading}
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Table (Existing Logic) */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Payment History</h3>
        {student.payments?.map((payment: any) => (
          <Fragment key={payment.id}>
            {" "}
            {/* 2. Use Fragment with key */}
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <p className="font-medium">{payment.adminNote || "Fee"}</p>
                <p className="text-xs text-gray-500">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">
                  ₦{payment.amount.toLocaleString()}
                </p>
                <ReceiptDownloadButton
                  paymentId={payment.id}
                  fileName={`DSA_Receipt_${payment.reference}.pdf`}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
