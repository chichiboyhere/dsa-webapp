//app/register/success/page.tsx
export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center my-18">
      <h1 className="text-2xl font-bold text-green-700">
        Registration Successful!
      </h1>

      <p className="mt-3">Your payment has been confirmed.</p>
      <p className="mt-3">
        While you await approval from the admin, you can download the student
        handbook.
      </p>

      <a
        href="/handbook.pdf"
        className="inline-block mt-4 bg-blue-700 text-white px-4 py-2"
      >
        Download Handbook
      </a>
    </div>
  );
}
