//
// "use client";

// import { useForm } from "react-hook-form";
// import { SUBJECT_CONFIG } from "@/lib/subjects";

// export default function StepE({ next, prev, defaultValues }: any) {
//   const { register, handleSubmit, watch } = useForm({
//     defaultValues,
//   });

//   const department = watch("department");
//   const exam = watch("exam");

//   const config =
//     SUBJECT_CONFIG[exam as "WAEC" | "JAMB"]?.[
//       department as "SCIENCE" | "COMMERCIAL" | "ART"
//     ];

//   if (!config) {
//     return <p>Please select department and exam first.</p>;
//   }

//   const onSubmit = (values: any) => {
//     const electives = values.subjects ?? [];

//     if (electives.length > config.maxElectives) {
//       alert(`You can only pick ${config.maxElectives} electives`);
//       return;
//     }

//     next({
//       //subjects: [...config.compulsory, ...(values.subjects || [])],
//       subjects: [...config.compulsory, ...values.subjects],
//       tradeSubject: values.tradeSubject,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h2 className="font-bold text-xl mb-3">SECTION E – SUBJECTS</h2>

//       <h3 className="font-semibold">Compulsory Subjects</h3>

//       <ul className="mb-4">
//         {config.compulsory.map((s) => (
//           <li key={s}>✓ {s}</li>
//         ))}
//       </ul>

//       {exam === "WAEC" && (
//         <>
//           <h3 className="font-semibold">
//             Choose {config.maxElectives} Electives
//           </h3>

//           {config.electives.map((sub) => (
//             <label key={sub} className="block">
//               <input type="checkbox" value={sub} {...register("subjects")} />{" "}
//               {sub}
//             </label>
//           ))}

//           {/* ---- TRADE SUBJECT ---- */}
//           <h3 className="font-semibold mt-4">Select ONE Trade Subject</h3>

//           {[
//             "Marketing",
//             "Digital Technologies",
//             "Fashion Design & Garment Making",
//           ].map((sub) => (
//             <label key={sub} className="block">
//               <input
//                 type="radio"
//                 value={sub}
//                 {...register("tradeSubject")}
//                 required
//               />{" "}
//               {sub}
//             </label>
//           ))}
//         </>
//       )}
//       {exam === "JAMB" && (
//         <>
//           <h3 className="font-semibold">
//             Choose {config.maxElectives} Electives
//           </h3>
//           {config.electives.map((sub) => (
//             <label key={sub} className="block">
//               <input type="checkbox" value={sub} {...register("subjects")} />{" "}
//               {sub}
//             </label>
//           ))}
//         </>
//       )}

//       <div className="flex gap-4 mt-4">
//         <button type="button" onClick={prev}>
//           Previous
//         </button>

//         <button className="bg-blue-600 text-white px-4 py-2">Next</button>
//       </div>
//     </form>
//   );
// }

//components/registration/StepE.tsx
"use client";

import { useForm } from "react-hook-form";
import { SUBJECT_CONFIG } from "@/lib/subjects";
import { Check, Info, ChevronLeft, ChevronRight } from "lucide-react";

export default function StepE({ next, prev, defaultValues }: any) {
  // const { register, handleSubmit, watch, setValue } = useForm({
  //   defaultValues: {
  //     ...defaultValues,
  //     subjects: defaultValues.subjects || [],
  //   },
  // });

  // const department = watch("department");
  // const exam = watch("exam");
  // const selectedElectives = watch("subjects") || [];

  // const config =
  //   SUBJECT_CONFIG[exam as "WAEC" | "JAMB"]?.[
  //     department as "SCIENCE" | "COMMERCIAL" | "ART"
  //   ];

  // if (!config)
  //   return (
  //     <p className="text-center py-10 font-bold text-red-500">
  //       Please go back and select Department/Exam.
  //     </p>
  //   );

  const toggleSubject = (sub: string) => {
    const current = [...selectedElectives];
    if (current.includes(sub)) {
      setValue(
        "subjects",
        current.filter((s) => s !== sub),
      );
    } else if (current.length < config.maxElectives) {
      setValue("subjects", [...current, sub]);
    }
  };

  // const onSubmit = (values: any) => {
  //   if (selectedElectives.length < config.maxElectives) {
  //     return alert(
  //       `Please select exactly ${config.maxElectives} more subjects.`,
  //     );
  //   }
  //   next({
  //     subjects: [...config.compulsory, ...selectedElectives],
  //     tradeSubject: values.tradeSubject,
  //   });
  // };
  const department = defaultValues.department;
  const exam = defaultValues.exam;

  const config = SUBJECT_CONFIG[exam]?.[department];

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      ...defaultValues,
      // CRITICAL FIX: Only load subjects that ARE NOT in the compulsory list
      subjects: defaultValues.subjects
        ? defaultValues.subjects.filter(
            (s: string) => !config?.compulsory.includes(s),
          )
        : [],
    },
  });

  const selectedElectives = watch("subjects") || [];

  // Logic to determine if we are in "Review/Edit Mode"
  // If subjects were already saved once, show the "Save & Return" button
  const isEditing = defaultValues.subjects?.length > 0;

  const onSubmit = (values: any, jumpBack: boolean = false) => {
    if (selectedElectives.length !== config.maxElectives) {
      return alert(`Please select exactly ${config.maxElectives} electives.`);
    }

    const finalSubjects = [...config.compulsory, ...selectedElectives];

    // Pass the target step (7 is Review) if jumpBack is true
    next(
      {
        subjects: finalSubjects,
        tradeSubject: values.tradeSubject,
      },
      jumpBack ? 7 : undefined,
    );
  };
  return (
    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="space-y-6 animate-in fade-in zoom-in-95 duration-500"
    // >
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, false))}
      className="space-y-6 animate-in fade-in zoom-in-95 duration-500"
    >
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
          Section E: Subjects
        </h2>
        <p className="text-gray-400 text-sm mb-8 font-medium">
          Configure your {exam} curriculum for {department}
        </p>

        {/* Compulsory Section */}
        <div className="mb-8">
          <h3 className="text-[10px] font-black uppercase text-gray-500 mb-3 flex items-center gap-2">
            Compulsory Subjects{" "}
            <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-400">
              Fixed
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {config.compulsory.map((s: string) => (
              <div
                key={s}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100 flex items-center gap-2"
              >
                <Check size={14} strokeWidth={3} /> {s}
              </div>
            ))}
          </div>
        </div>

        {/* Electives Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[10px] font-black uppercase text-gray-500 flex items-center gap-2">
              Select {config.maxElectives} Electives
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-1 rounded-lg ${selectedElectives.length === config.maxElectives ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}
            >
              {selectedElectives.length} / {config.maxElectives} SELECTED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {config.electives.map((sub: string) => {
              const isSelected = selectedElectives.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubject(sub)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border-2 text-left ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "border-gray-50 bg-gray-50 text-gray-600 hover:border-gray-200"
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trade Subject (WAEC only) */}
        {exam === "WAEC" && (
          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <h3 className="text-[10px] font-black uppercase text-amber-700 mb-3 flex items-center gap-2">
              <Info size={14} /> One Trade Subject Required
            </h3>
            <div className="space-y-2">
              {["Marketing", "Digital Technologies", "Fashion Design"].map(
                (sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:shadow-sm transition-shadow"
                  >
                    <input
                      type="radio"
                      value={sub}
                      {...register("tradeSubject")}
                      required
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm font-bold text-gray-700">
                      {sub}
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={prev}
          className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
        >
          <ChevronLeft size={20} /> Back
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, true))}
            className="bg-gray-800 text-white px-6 py-4 rounded-2xl font-bold hover:bg-black transition-all"
          >
            Save & Review
          </button>
        )}
        <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
          Agreement <ChevronRight size={20} />
        </button>
      </div>
    </form>
  );
}
