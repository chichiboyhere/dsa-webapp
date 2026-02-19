//components/registration/StepC.tsx

"use client";

import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StepC({ next, prev, defaultValues }: any) {
  const methods = useForm({
    defaultValues,
  });

  const onSubmit = (values: any) => {
    next(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="font-bold mb-2">
          SECTION C – HEALTH & EMERGENCY INFORMATION
        </h2>

        <FormInput
          name="medicalInfo"
          label="Any Medical Conditions / Allergies"
        />

        <FormInput name="emergencyName" label="Emergency Contact Name" />

        <FormInput name="emergencyPhone" label="Emergency Contact Number" />

        <div className="flex justify-between items-center ">
          <button
            type="button"
            onClick={prev}
            className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
            Exam <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
