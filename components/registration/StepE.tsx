"use client";

import { useForm } from "react-hook-form";
import { SUBJECT_CONFIG } from "@/lib/subjects";

export default function StepE({ next, prev, defaultValues }: any) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const department = watch("department");
  const exam = watch("exam");

  const config =
    SUBJECT_CONFIG[exam as "WAEC" | "JAMB"]?.[
      department as "SCIENCE" | "COMMERCIAL" | "ART"
    ];

  if (!config) {
    return <p>Please select department and exam first.</p>;
  }

  const onSubmit = (values: any) => {
    // const selected = values.subjects || [];

    // if (exam === "WAEC") {
    //   if (selected.length > config.maxElectives) {
    //     alert(`You can only pick ${config.maxElectives} electives`);
    //     return;
    //   }
    // }

    const electives = values.subjects ?? [];

    if (electives.length > config.maxElectives) {
      alert(`You can only pick ${config.maxElectives} electives`);
      return;
    }

    next({
      //subjects: [...config.compulsory, ...(values.subjects || [])],
      subjects: [...config.compulsory, ...values.subjects],
      tradeSubject: values.tradeSubject,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-xl mb-3">SECTION E – SUBJECTS</h2>

      <h3 className="font-semibold">Compulsory Subjects</h3>

      <ul className="mb-4">
        {config.compulsory.map((s) => (
          <li key={s}>✓ {s}</li>
        ))}
      </ul>

      {exam === "WAEC" && (
        <>
          <h3 className="font-semibold">
            Choose {config.maxElectives} Electives
          </h3>

          {config.electives.map((sub) => (
            <label key={sub} className="block">
              <input type="checkbox" value={sub} {...register("subjects")} />{" "}
              {sub}
            </label>
          ))}

          {/* ---- TRADE SUBJECT ---- */}
          <h3 className="font-semibold mt-4">Select ONE Trade Subject</h3>

          {[
            "Marketing",
            "Digital Technologies",
            "Fashion Design & Garment Making",
          ].map((sub) => (
            <label key={sub} className="block">
              <input
                type="radio"
                value={sub}
                {...register("tradeSubject")}
                required
              />{" "}
              {sub}
            </label>
          ))}
        </>
      )}
      {exam === "JAMB" && (
        <>
          <h3 className="font-semibold">
            Choose {config.maxElectives} Electives
          </h3>
          {config.electives.map((sub) => (
            <label key={sub} className="block">
              <input type="checkbox" value={sub} {...register("subjects")} />{" "}
              {sub}
            </label>
          ))}
        </>
      )}

      <div className="flex gap-4 mt-4">
        <button type="button" onClick={prev}>
          Previous
        </button>

        <button className="bg-blue-600 text-white px-4 py-2">Next</button>
      </div>
    </form>
  );
}
