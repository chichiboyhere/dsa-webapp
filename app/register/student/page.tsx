"use client";

import { useState } from "react";
import StepA from "@/components/registration/StepA";
import StepB from "@/components/registration/StepB";
import StepC from "@/components/registration/StepC";
import StepD from "@/components/registration/StepD";
import StepE from "@/components/registration/StepE";
import StepF from "@/components/registration/StepF";
import StepG from "@/components/registration/StepG";
//import StepReview from "@/components/registration/StepReview";

import { StudentRegistration } from "@/types/registration";

export default function StudentWizard() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState<Partial<StudentRegistration>>({});

  const next = (values: any) => {
    setData({ ...data, ...values });
    setStep(step + 1);
  };

  const prev = () => setStep(step - 1);

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
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 pt-6">
        STUDENT REGISTRATION FORM
      </h1>

      {step === 1 && <StepA next={next} defaultValues={data} />}
      {step === 2 && <StepB next={next} prev={prev} defaultValues={data} />}
      {step === 3 && <StepC next={next} prev={prev} defaultValues={data} />}
      {step === 4 && <StepD next={next} prev={prev} defaultValues={data} />}
      {step === 5 && <StepE next={next} prev={prev} defaultValues={data} />}
      {step === 6 && <StepF next={next} prev={prev} defaultValues={data} />}
      {step === 7 && <StepG data={data} prev={prev} />}
      {/* {step === 8 && <StepReview submit={submit} prev={prev} data={data} />} */}
    </div>
  );
}
