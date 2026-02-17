// // import { getTuitionStatus } from "@/lib/tuition";

// // export default function CBT({ student }: any) {
// //   const tuition = getTuitionStatus(student.tuitionPaidAt);

// //   if (tuition.status !== "ACTIVE") {
// //     return (
// //       <p className="text-red-600">
// //         You must have active tuition to access CBT.
// //       </p>
// //     );
// //   }

// //   return (
// //     <div>
// //       <p>CBT available.</p>
// //       {/* Next: CBT engine */}
// //     </div>
// //   );
// // }

// import { getCBTStatus } from "@/lib/cbt";

// export default function CBTSection({ student }: any) {
//   const cbt = getCBTStatus(student.cbtExpiresAt);

//   if (cbt.status === "ACTIVE") {
//     return (
//       <div className="border p-4 rounded">
//         <p className="text-green-600">
//           CBT Active ({cbt.daysLeft} days left)
//         </p>

//         <a
//           href="/cbt"
//           className="inline-block mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
//         >
//           Start CBT
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="border p-4 rounded">
//       <p className="mb-2">
//         {cbt.status === "EXPIRED"
//           ? "CBT access expired"
//           : "CBT not purchased"}
//       </p>

//       <button
//         onClick={() => pay("CBT")}
//         className="bg-indigo-600 text-white px-4 py-2"
//       >
//         Pay CBT
//       </button>
//     </div>
//   );
// }

"use client";

import { getCBTStatus } from "@/lib/cbt";

export default function CBTSection({ student }: any) {
  const cbt = getCBTStatus(student.cbtExpiresAt);

  const pay = async (type: "CBT") => {
    const res = await fetch("/api/payment/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Payment initialization failed");
      return;
    }

    // Redirect to Paystack
    window.location.href = data.url;
  };

  if (cbt.status === "ACTIVE") {
    return (
      <div className="border p-4 rounded">
        <p className="text-green-600">CBT Active ({cbt.daysLeft} days left)</p>

        <a
          href="/cbt/start"
          className="inline-block mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Start CBT
        </a>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded">
      <p className="mb-2">
        {cbt.status === "EXPIRED" ? "CBT access expired" : "CBT not purchased"}
      </p>

      <button
        onClick={() => pay("CBT")}
        className="bg-indigo-600 text-white px-4 py-2"
      >
        Pay CBT
      </button>
    </div>
  );
}
