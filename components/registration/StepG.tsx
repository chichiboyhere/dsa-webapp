//components/registration/StepG.tsx
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function StepG({ data, prev }: any) {
  const pay = async () => {
    console.log("FINAL REG DATA", data);
    console.log("Payment data received:", data); // ← add this to confirm

    console.log("PAYSTACK METADATA PHOTO:", data.photoUrl);

    if (!data?.email) {
      alert("Registration data missing. Please go back and complete the form.");
      return;
    }

    if (!data.subjects || !Array.isArray(data.subjects)) {
      alert("Subjects missing. Please review registration.");
      return;
    }
    const res = await fetch("/api/payment/init-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        formData: data,
      }),
    });

    const result = await res.json();

    if (!result?.url) {
      console.error("Payment init failed:", result);
      alert("Payment could not be initialized. Please try again.");
      return;
    }

    window.location.href = result.url;
  };

  const test = () => {
    console.log("Payment data received:", data);

    console.log("PAYSTACK METADATA PHOTO:", data.photoUrl);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-bold text-xl mb-4">SECTION G – PAYMENT</h2>

      <div className=" p-4  border-2 text-sm rounded-md">
        <p>Registration Fee: ₦1,000</p>
        <p>Handbook: ₦1000</p>

        <h3 className="font-bold mt-2">Total: ₦2,000</h3>
      </div>

      <p className="mt-3 text-sm">
        You can pay using: • Bank Transfer • Opay • Card • USSD
      </p>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={prev}
          className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <button
          onClick={pay}
          className="bg-green-700 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
        >
          Pay ₦2,000 Now
        </button>
      </div>
    </div>
  );
}
