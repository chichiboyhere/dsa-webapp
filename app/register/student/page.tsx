"use client";
//app/register/student/page.tsx

//import { useState } from "react";
import { useState } from "react";
import StepA from "@/components/registration/StepA";
import StepB from "@/components/registration/StepB";
import StepC from "@/components/registration/StepC";
import StepD from "@/components/registration/StepD";
import StepE from "@/components/registration/StepE";
import StepF from "@/components/registration/StepF";
import StepG from "@/components/registration/StepG";
import StepReview from "@/components/registration/StepReview";
import Link from "next/link";

import { StudentRegistration } from "@/types/registration";

// export default function StudentWizard() {
//   const [step, setStep] = useState(1);

//   const [data, setData] = useState<Partial<StudentRegistration>>({});

//   const checkEmailAvailability = async (email: string) => {
//     const res = await fetch(`/api/registration/check-email?email=${email}`);
//     return res.ok; // returns true if email is free
//   };

//   const totalSteps = 8;
//   const percentage = (step / totalSteps) * 100;

//   const next = async (values: any) => {
//     // setData({ ...data, ...values });
//     // setStep(step + 1);
//     if (step === 1) {
//       const isAvailable = await checkEmailAvailability(values.email);
//       if (!isAvailable) {
//         alert(
//           "This email is already registered. Please login or use another email.",
//         );
//         return;
//       }
//     }
//     setData({ ...data, ...values });

//     setStep(step + 1);
//   };

//   const prev = () => setStep(step - 1);

//   const submit = async (values: any) => {
//     const finalData = { ...data, ...values };

//     const res = await fetch("/api/registration/student", {
//       method: "POST",
//       body: JSON.stringify(finalData),
//     });

//     if (res.ok) {
//       window.location.href = "/register/success";
//     } else {
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 min-h-screen my-25">
//       <div className="mb-10">
//         <div className="flex justify-between items-end mb-2">
//           <div>
//             <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
//               REGISTRATION
//             </h1>
//             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
//               Step {step} of {totalSteps}
//             </p>
//           </div>
//           <span className="text-blue-600 font-black text-xl">
//             {Math.round(percentage)}%
//           </span>
//         </div>
//         <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-blue-600 transition-all duration-500 ease-out"
//             style={{ width: `${percentage}%` }}
//           />
//         </div>
//       </div>

//       {step === 1 && <StepA next={next} defaultValues={data} />}
//       {step === 2 && <StepB next={next} prev={prev} defaultValues={data} />}
//       {step === 3 && <StepC next={next} prev={prev} defaultValues={data} />}
//       {step === 4 && <StepD next={next} prev={prev} defaultValues={data} />}
//       {step === 5 && <StepE next={next} prev={prev} defaultValues={data} />}
//       {step === 6 && <StepF next={next} prev={prev} defaultValues={data} />}
//       {step === 7 && <StepReview submit={submit} prev={prev} data={data} />}
//       {step === 8 && <StepG data={data} prev={prev} />}
//     </div>
//   );
// }

// ... (Your existing imports)

export default function StudentWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<StudentRegistration>>({});

  const totalSteps = 8;
  const percentage = (step / totalSteps) * 100;

  // Helper to scroll to the top of the form smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkEmailAvailability = async (email: string) => {
    const res = await fetch(`/api/registration/check-email?email=${email}`);
    return res.ok;
  };

  const next = async (values: any, jumpToStep?: number) => {
    // 1. Logic for Step 1 (Email Check)
    if (step === 1) {
      const isAvailable = await checkEmailAvailability(values.email);
      if (!isAvailable) {
        alert(
          "This email is already registered. Please login or use another email.",
        );
        return;
      }
    }

    // 2. Information Retention: Merge new values into central state
    setData((prev) => ({ ...prev, ...values }));

    // 3. Increment Step and Scroll
    // setStep((prev) => prev + 1);
    setStep(jumpToStep || step + 1);
    scrollToTop();
  };

  const prev = () => {
    setStep((prev) => prev - 1);
    scrollToTop();
  };

  const submit = async (values: any) => {
    const finalData = { ...data, ...values };
    const res = await fetch("/api/registration/student", {
      method: "POST",
      body: JSON.stringify(finalData),
    });

    if (res.ok) {
      window.location.href = "/register/success";
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen my-25">
      {/* Header & Progress Bar Section */}
      <div className="my-2 flex justify-between items-center gap-1.5">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Sign In
          </Link>
        </p>
        <p className="text-gray-400">
          Go back to{" "}
          <Link href="/" className="text-blue-600">
            Home
          </Link>
        </p>
      </div>
      <div className="mb-10">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
              REGISTRATION
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Step {step} of {totalSteps}
            </p>
          </div>
          <span className="text-blue-600 font-black text-xl">
            {Math.round(percentage)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Step Components: 
          Note how we pass 'data' to 'defaultValues' 
          and 'setStep' to the Review page.
      */}
      {step === 1 && <StepA next={next} defaultValues={data} />}
      {step === 2 && <StepB next={next} prev={prev} defaultValues={data} />}
      {step === 3 && <StepC next={next} prev={prev} defaultValues={data} />}
      {step === 4 && <StepD next={next} prev={prev} defaultValues={data} />}
      {step === 5 && <StepE next={next} prev={prev} defaultValues={data} />}
      {step === 6 && <StepF next={next} prev={prev} defaultValues={data} />}

      {/* Added setStep here so users can jump back from the review */}
      {step === 7 && (
        <StepReview
          next={next}
          prev={prev}
          data={data}
          setStep={(s: number) => {
            setStep(s);
            scrollToTop();
          }}
        />
      )}

      {step === 8 && <StepG data={data} prev={prev} />}
    </div>
  );
}
