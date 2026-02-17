"use client";

export default function StepReview({
  data,
  prev,
}: {
  data: any;
  prev: () => void;
}) {
  const submit = async () => {
    const res = await fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = "/register/success";
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Review Your Details</h2>

      <pre className="bg-gray-100 p-4 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>

      <div className="flex gap-4 mt-4">
        <button onClick={prev} className="border px-4 py-2">
          Previous
        </button>

        <button onClick={submit} className="bg-blue-600 text-white px-4 py-2">
          Submit Registration
        </button>
      </div>
    </div>
  );
}
