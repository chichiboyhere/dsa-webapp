"use client";

import { useForm, FormProvider } from "react-hook-form";

export default function StepD({ next, prev, defaultValues }: any) {
  const methods = useForm({ defaultValues });

  const onSubmit = (values: any) => next(values);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="font-bold mb-2">PROGRAM SELECTION</h2>

        <label>Department</label>
        <select
          {...methods.register("department")}
          className="w-full border p-2"
        >
          <option value="SCIENCE">Science</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="ART">Art</option>
        </select>

        <label className="mt-3 block">Exam</label>
        <select {...methods.register("exam")} className="w-full border p-2">
          <option value="WAEC">WAEC</option>
          <option value="JAMB">JAMB</option>
        </select>

        <div className="flex gap-4 mt-4">
          <button type="button" onClick={prev}>
            Previous
          </button>

          <button className="bg-blue-600 text-white px-4 py-2">Next</button>
        </div>
      </form>
    </FormProvider>
  );
}
