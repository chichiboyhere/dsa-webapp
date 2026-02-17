// "use client";

// import { useEffect } from "react";
// import axios from "axios";

// export default function VerifyPayment() {
//   useEffect(() => {
//     const verify = async () => {
//       const params = new URLSearchParams(window.location.search);
//       const reference = params.get("reference");

//       const res = await axios.post("/api/payment/verify", {
//         reference,
//       });

//       if (res.data.status === "success") {
//         window.location.href = "/register/success";
//       } else {
//         alert("Payment verification failed");
//       }
//     };

//     verify();
//   }, []);

//   return <p>Verifying payment...</p>;
// }

// "use client";

// import { useEffect } from "react";
// import axios from "axios";

// export default function VerifyPayment() {
//   useEffect(() => {
//     const verify = async () => {
//       const params = new URLSearchParams(window.location.search);
//       const reference = params.get("reference");

//       await axios.get(`/api/payment/verify?reference=${reference}`);
//     };

//     verify();
//   }, []);

//   return (
//     <div className="p-10 text-center">
//       <h2 className="text-xl font-bold">Verifying your payment...</h2>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference = params.get("reference");

      if (!reference) {
        setStatus("Missing payment reference");
        return;
      }

      try {
        await axios.get(`/api/payment/verify?reference=${reference}`);
        setStatus("Payment verified. Redirecting...");
        setTimeout(() => {
          router.push("/register/success");
        }, 1500);
      } catch (err) {
        setStatus("Payment verification failed.");
      }
    };

    verify();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">{status}</h2>
        <p className="text-sm text-gray-500 mt-2">
          Please do not refresh this page.
        </p>
      </div>
    </div>
  );
}
