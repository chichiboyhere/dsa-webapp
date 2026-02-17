"use client";

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

      <div className="border p-4 rounded">
        <p>Registration Fee: ₦1,000</p>
        <p>Handbook: ₦700</p>

        <h3 className="font-bold mt-2">Total: ₦1,700</h3>
      </div>

      <p className="mt-3 text-sm">
        You can pay using: • Bank Transfer • Opay • Card • USSD
      </p>

      <div className="flex gap-4 mt-4">
        <button onClick={prev}>Previous</button>

        <button onClick={pay} className="bg-green-700 text-white px-4 py-2">
          Pay ₦1,700 Now
        </button>
      </div>
    </div>
  );
}
