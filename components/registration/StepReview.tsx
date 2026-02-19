// "use client";

// export default function StepReview({
//   data,
//   prev,
// }: {
//   data: any;
//   prev: () => void;
// }) {
//   const submit = async () => {
//     const res = await fetch("/api/registration", {
//       method: "POST",
//       body: JSON.stringify(data),
//     });

//     if (res.ok) {
//       window.location.href = "/register/success";
//     } else {
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Review Your Details</h2>

//       <pre className="bg-gray-100 p-4 text-sm">
//         {JSON.stringify(data, null, 2)}
//       </pre>

//       <div className="flex gap-4 mt-4">
//         <button onClick={prev} className="border px-4 py-2">
//           Previous
//         </button>

//         <button onClick={submit} className="bg-blue-600 text-white px-4 py-2">
//           Submit Registration
//         </button>
//       </div>
//     </div>
//   );
// }

//components/registraion/StepReview
// "use client";
// import { User, BookOpen, AlertCircle, Users, Cross } from "lucide-react";

// export default function StepReview({ data, next, prev }: any) {
//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
//       <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
//         <AlertCircle className="text-blue-600 shrink-0" />
//         <p className="text-sm text-blue-800">
//           Please review your details. Once payment is made, some fields may
//           require admin approval to change.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Personal Details Card */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-2 mb-4 text-blue-600">
//             <User size={18} />
//             <h3 className="font-bold uppercase text-xs tracking-widest">
//               Personal Details
//             </h3>
//           </div>
//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="text-gray-500">Name:</span>{" "}
//               <strong>
//                 {data.firstName} {data.middleName} {data.surname}
//               </strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Date of Birth:</span>{" "}
//               <strong>{data.dob}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Gender:</span>{" "}
//               <strong>{data.gender}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Residential Address:</span>{" "}
//               <strong>{data.address}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Email:</span>{" "}
//               <strong>{data.email}</strong>
//             </p>

//             <p>
//               <span className="text-gray-500">Phone:</span>{" "}
//               <strong>{data.phone}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Nationality:</span>{" "}
//               <strong>{data.nationality}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">State of Origin:</span>{" "}
//               <strong>{data.state}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Local Govt Area:</span>{" "}
//               <strong>{data.lga}</strong>
//             </p>
//           </div>
//         </div>

//         {/* Parents/Guardian Selection Card */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-2 mb-4 text-purple-600">
//             <Users size={18} />
//             <h3 className="font-bold uppercase text-xs tracking-widest">
//               Parents/Guardian
//             </h3>
//           </div>
//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="text-gray-500">Mr/Mrs:</span>{" "}
//               <strong>{data.guardianName}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Relationship:</span>{" "}
//               <strong>{data.relationship}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Address:</span>{" "}
//               <strong>{data.guardianAddress}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Phone:</span>{" "}
//               <strong>{data.guardianPhone}</strong>
//             </p>
//           </div>
//         </div>

//         {/* Health Card */}
//         {data.medicalInfo && (
//           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//             <div className="flex items-center gap-2 mb-4 text-purple-600">
//               <Cross size={18} color="red" />
//               <h3 className="font-bold uppercase text-xs tracking-widest">
//                 Health Information
//               </h3>
//             </div>
//             <div className="space-y-2 text-sm">
//               <p>
//                 <span className="text-gray-500">
//                   Any Medical Conditions / Allergies:
//                 </span>{" "}
//                 <strong>{data.medicalInfo}</strong>
//               </p>
//               <p>
//                 <span className="text-gray-500">Emergency Contact:</span>{" "}
//                 <strong>{data.emergencyName}</strong>
//               </p>
//               <p>
//                 <span className="text-gray-500">Emergency Phone:</span>{" "}
//                 <strong>{data.emergencyPhone}</strong>
//               </p>
//             </div>
//           </div>
//         )}
//         {/* Program Selection Card */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-2 mb-4 text-purple-600">
//             <BookOpen size={18} />
//             <h3 className="font-bold uppercase text-xs tracking-widest">
//               Academics
//             </h3>
//           </div>
//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="text-gray-500">Dept:</span>{" "}
//               <strong>{data.department}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Exam:</span>{" "}
//               <strong>{data.exam}</strong>
//             </p>
//             <p>
//               <span className="text-gray-500">Subjects:</span>{" "}
//               <span className="text-[10px] font-bold">
//                 {data.subjects?.join(", ")}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between items-center pt-6 border-t">
//         <button
//           onClick={prev}
//           className="text-gray-500 font-bold hover:underline"
//         >
//           Back to Agreement
//         </button>
//         <button
//           onClick={() => next(data)}
//           className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-100 hover:scale-105 transition-transform"
//         >
//           Confirm & Pay ₦2,000
//         </button>
//       </div>
//     </div>
//   );
// }
//components/registration/StepReview.tsx
"use client";
import {
  User,
  BookOpen,
  AlertCircle,
  Users,
  Cross,
  PencilLine,
} from "lucide-react";
import Image from "next/image";

export default function StepReview({ data, next, prev, setStep }: any) {
  // Helper to render an "Edit" button for each section
  const EditButton = ({ step }: { step: number }) => (
    <button
      onClick={() => setStep(step)}
      className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-700 uppercase tracking-tighter bg-blue-50 px-2 py-1 rounded-lg transition-colors"
    >
      <PencilLine size={12} /> Edit
    </button>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
        <AlertCircle className="text-blue-600 shrink-0" />
        <p className="text-sm text-blue-800">
          Please review your details. Once payment is made, some fields may
          require admin approval to change.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Details Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600">
              <User size={18} />
              <h3 className="font-bold uppercase text-xs tracking-widest">
                Personal Details
              </h3>
            </div>
            <EditButton step={1} />
          </div>

          <div className="flex gap-4 mb-4 items-center border-b pb-4 border-gray-50">
            {data.photoUrl && (
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={data.photoUrl}
                  alt="Passport"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">
                Full Name
              </p>
              <p className="text-sm font-black text-gray-800">
                {data.firstName} {data.middleName} {data.surname}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                DOB
              </span>
              <strong>{data.dob || "—"}</strong>
            </div>
            <div>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Gender
              </span>
              <strong>{data.gender || "—"}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Email
              </span>
              <strong className="break-all">{data.email || "—"}</strong>
            </div>
          </div>
        </div>

        {/* Parents/Guardian Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Users size={18} />
              <h3 className="font-bold uppercase text-xs tracking-widest">
                Parents/Guardian
              </h3>
            </div>
            <EditButton step={2} />
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Mr/Mrs
              </span>
              <strong>{data.guardianName || "—"}</strong>
            </div>
            <div>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Relationship
              </span>
              <strong>{data.relationship || "—"}</strong>
            </div>
            <div>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Phone
              </span>
              <strong>{data.guardianPhone || "—"}</strong>
            </div>
          </div>
        </div>

        {/* Health Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-red-500">
              <Cross size={18} />
              <h3 className="font-bold uppercase text-xs tracking-widest">
                Health Info
              </h3>
            </div>
            <EditButton step={4} />
          </div>
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Condition/Allergies
              </span>
              <strong>{data.medicalInfo || "None Stated"}</strong>
            </p>
            <p>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Emergency Contact
              </span>
              <strong>
                {data.emergencyName} ({data.emergencyPhone})
              </strong>
            </p>
          </div>
        </div>

        {/* Program Selection Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <BookOpen size={18} />
              <h3 className="font-bold uppercase text-xs tracking-widest">
                Academics
              </h3>
            </div>
            <EditButton step={5} />
          </div>
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Dept / Exam
              </span>
              <strong>
                {data.department} — {data.exam}
              </strong>
            </p>
            <div>
              <span className="text-[10px] block text-gray-400 uppercase font-bold">
                Subjects
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.subjects?.map((s: string) => (
                  <span
                    key={s}
                    className="bg-gray-100 text-[9px] px-2 py-0.5 rounded-md font-bold text-gray-600"
                  >
                    {s}
                  </span>
                )) || "None"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
        <button
          onClick={prev}
          className="text-gray-400 text-sm font-bold hover:text-gray-600 transition-colors"
        >
          Back to Agreement
        </button>
        <button
          onClick={() => next(data)}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          Confirm & Pay ₦2,000
        </button>
      </div>
    </div>
  );
}
