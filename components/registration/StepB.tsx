// //components/registration/StepB.tsx
// "use client";

// import { useForm, FormProvider } from "react-hook-form";
// import FormInput from "@/components/FormInput";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function StepB({ next, prev, defaultValues }: any) {
//   const methods = useForm({
//     defaultValues,
//   });

//   const onSubmit = (values: any) => {
//     next(values);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)} className="min-h-screen">
//         <h2 className="font-bold mb-2">
//           SECTION B – PARENT / GUARDIAN DETAILS
//         </h2>
//         .
//         <FormInput name="guardianName" label="Mr / Mrs" />
//         <FormInput name="relationship" label="Relationship to Student" />
//         <FormInput name="guardianPhone" label="Phone Number" />
//         <FormInput name="guardianAddress" label="Residential Address" />
//         <div className="flex justify-between items-center pt-4">
//           <button
//             type="button"
//             onClick={prev}
//             className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
//           >
//             <ChevronLeft size={20} /> Back
//           </button>
//           <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
//             Health <ChevronRight size={20} />
//           </button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

"use client";

import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

export default function StepB({ next, prev, defaultValues }: any) {
  const methods = useForm({
    defaultValues,
  });

  // Logic to see if we've already filled this out
  // (i.e., we are coming back from the Review page)
  const isEditing = !!defaultValues.guardianName;

  // We add a jump parameter to the onSubmit handler
  const handleFormSubmit = (values: any, jumpBack: boolean = false) => {
    // If jumpBack is true, we tell the parent to go to step 7
    next(values, jumpBack ? 7 : undefined);
  };

  return (
    <FormProvider {...methods}>
      {/* Notice: We remove the direct onSubmit from the form tag 
          so our buttons can specify whether they want to 'jump' or 'continue'
      */}
      <form
        onSubmit={methods.handleSubmit((data) => handleFormSubmit(data, false))}
        className="min-h-screen"
      >
        <h2 className="font-bold mb-2 uppercase text-blue-600">
          SECTION B – PARENT / GUARDIAN DETAILS
        </h2>

        <div className="space-y-4 mb-8">
          <FormInput name="guardianName" label="Mr / Mrs" />
          <FormInput name="relationship" label="Relationship to Student" />
          <FormInput name="guardianPhone" label="Phone Number" />
          <FormInput name="guardianAddress" label="Residential Address" />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={prev}
            className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} /> Back
          </button>

          <div className="flex gap-3">
            {/* ONLY SHOW THIS IF EDITING:
                This button manually triggers handleSubmit with a 'true' flag 
            */}
            {isEditing && (
              <button
                type="button"
                onClick={methods.handleSubmit((data) =>
                  handleFormSubmit(data, true),
                )}
                className="bg-gray-800 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg"
              >
                <Save size={18} /> Update & Review
              </button>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
            >
              Health <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
