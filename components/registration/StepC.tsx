// "use client";

// import { useForm, FormProvider } from "react-hook-form";
// import FormInput from "@/components/FormInput";

// export default function StepC({ next, prev, defaultValues }: any) {
//   const methods = useForm({
//     defaultValues,
//   });

//   const onSubmit = (values: any) => {
//     next(values);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         <h2 className="font-bold mb-2">
//           SECTION C – HEALTH & EMERGENCY INFORMATION
//         </h2>
//         .
//         <FormInput
//           name="medicalInfo"
//           label="Any Medical Conditions / Allergies"
//         />
//         <FormInput name="emergencyName" label="Emergency Contact Name" />
//         <FormInput name="emergencyPhone" label="Emergency Contact Number" />
//         <div className="flex gap-4 mt-4">
//           <button type="button" onClick={prev}>
//             Previous
//           </button>

//           <button className="bg-blue-600 text-white px-4 py-2">Next</button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

"use client";

import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";

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
