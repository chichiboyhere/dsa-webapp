//components/registration/StepF.tsx
"use client";

import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CODE_OF_CONDUCT = `
*Code of Conduct for Students*

The College’s Code of Conduct must be strictly observed by all students to ensure the maintenance of proper academic discipline, order, and decorum.

1. Students must attend all lectures and practical sessions regularly.
2. Students must pay all required fees and participate in monthly examinations organized by the College.
3. Upon submission of all required documents to the Management, students shall be issued an **Identity Number**. This number serves to identify bona fide students and grants them permission to participate in College activities and programs. It must be produced on request. The Identity Number becomes invalid after the expiration of a session.
4. Students must conduct themselves in a manner that does not disturb lecturers, fellow students, or other classes within the College premises.
5. If it becomes necessary to leave the classroom or lecture hall, students must seek exit permission from the coordinating officer(s) on duty.
6. Students are not permitted to move around the school hall or stand in front of the school during lectures.
7. No student may display notices, posters, or banners within the College premises without prior approval from Management. Defaulters will face strict disciplinary action.
8. Smoking, consumption of harmful drugs, and intake of alcohol are strictly prohibited. Such offenses may result in a warning, expulsion, and possible handover to law enforcement authorities.
9. If the presence of any student is deemed detrimental to the best interest of the College, Management reserves the right to request the student’s withdrawal without assigning reasons. Such decisions are final and binding.
10. The use of mobile phones during lectures is strictly prohibited unless permission is granted by the facilitator or lecturer. Offenders will be penalized, and their devices confiscated.
11. Students must not engage in any activity, inside or outside the College, that compromises discipline or tarnishes the College’s image.
12. Students are prohibited from disclosing College matters to the press without authorization.
13. Indecent dressing, including the wearing of brief underwear or garments that unduly expose sensitive body parts, is prohibited. Repeat offenders may face expulsion after a second warning.
14. Loitering and unauthorized gatherings are not permitted within the College premises.
15. Sexual relationships between students are prohibited.
16. Theft of another student’s materials or property is forbidden. This offense may result in indefinite suspension.
17. Fighting with fellow students, lecturers, or Management is prohibited and may result in suspension or expulsion.
18. Dating among students is prohibited and may lead to suspension.
19. Examination malpractice will result in the cancellation of results and/or a ban from future examinations.
20. Unruly behavior such as bullying, insubordination, or disobedience towards staff or Management is prohibited and punishable by suspension or expulsion.
21. Students must not write on classroom walls or cause damage to any property within the College premises. Offenders will bear the cost of repairs.
22. Any matters not covered in this Code of Conduct shall be resolved at the discretion of the College Management.

*Disciplinary Measures for Violations*
Any act of misbehavior, misconduct, indiscipline, or violation of the above rules may attract one or more of the following sanctions:

* Verbal or written warning to the student.
* Written warning to the student’s parents/guardians.
* Denial of admission for the next academic year.
* Temporary or permanent expulsion from the College.
* Rustication for a specified period.
* Involvement of law enforcement agencies.
`;

export default function StepF({ next, prev, defaultValues }: any) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const agreed = watch("agreedToConduct");

  const onSubmit = (values: any) => {
    if (!values.agreedToConduct) {
      return alert("You must agree to the Code of Conduct");
    }

    next(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" p-2 text-gray-400 ">
      <h2 className="font-bold text-xl mb-3">
        SECTION F – AGREEMENT WITH CODE OF CONDUCT
      </h2>

      <textarea
        className="w-full h-60 border-2 p-3 text-sm rounded-md"
        readOnly
        value={CODE_OF_CONDUCT}
      />

      <label className="block mt-3">
        <input type="checkbox" {...register("agreedToConduct")} /> &nbsp;I
        solemnly and sincerely promise to abide by all the rules and stated
        above.
      </label>
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={prev}
          className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
          Proceed to Payment <ChevronRight size={20} />
        </button>
      </div>
    </form>
  );
}
