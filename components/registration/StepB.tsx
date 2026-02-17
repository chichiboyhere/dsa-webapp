"use client";

import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";

export default function StepB({ next, prev, defaultValues }: any) {
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
          SECTION B – PARENT / GUARDIAN DETAILS
        </h2>
        .
        <FormInput name="guardianName" label="Mr / Mrs" />
        <FormInput name="relationship" label="Relationship to Student" />
        <FormInput name="guardianPhone" label="Phone Number" />
        <FormInput name="guardianAddress" label="Residential Address" />
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
