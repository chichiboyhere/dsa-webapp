//components/registration/StepD.tsx
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function StepD({ next, prev, defaultValues }: any) {
  const methods = useForm({ defaultValues });

  const onSubmit = (values: any) => next(values);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="font-bold mb-2">PROGRAM SELECTION</h2>

        <label className="text-[14px] font-black uppercase text-gray-400 tracking-widest ml-1">
          Department
        </label>
        <select
          {...methods.register("department")}
          className="w-full  p-2 text-gray-400 border-2 rounded-md"
        >
          <option value="SCIENCE">Science</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="ART">Art</option>
        </select>

        <label className="text-[14px] mt-3 block font-black uppercase text-gray-400 tracking-widest ml-1">
          Exam
        </label>
        <select
          {...methods.register("exam")}
          className="w-full  p-2 text-gray-400 border-2 rounded-md"
        >
          <option value="WAEC">WAEC</option>
          <option value="JAMB">JAMB</option>
        </select>

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={prev}
            className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} /> Back
          </button>

          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
            Subjects <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
