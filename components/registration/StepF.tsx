"use client";

import { useForm } from "react-hook-form";

const CODE_OF_CONDUCT = `
The College’s Code of Conduct must be strictly observed...

1. Students must attend all lectures...
2. Students must pay all required fees...
3. Identity Number shall be issued...
4. No disturbance of lectures...
5. Exit permission must be sought...
6. No roaming during lectures...
7. No posters without approval...
8. No smoking, drugs, alcohol...
9. Management may request withdrawal...
10. No phones during lectures...
11. No conduct that tarnishes image...
12. No disclosure to press...
13. Indecent dressing prohibited...
14. No loitering...
15. No sexual relationships...
16. No theft...
17. No fighting...
18. No dating...
19. No exam malpractice...
20. No unruly behavior...
21. No destruction of property...
22. Management discretion applies.

DISCIPLINARY MEASURES:
- Warning
- Parent notification
- Denial of admission
- Expulsion
- Rustication
- Law enforcement
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-xl mb-3">
        SECTION F – AGREEMENT WITH CODE OF CONDUCT
      </h2>

      <textarea
        className="w-full h-60 border p-3 text-sm"
        readOnly
        value={CODE_OF_CONDUCT}
      />

      <label className="block mt-3">
        <input type="checkbox" {...register("agreedToConduct")} />I have read
        and agree to abide by all the above rules
      </label>

      <div className="flex gap-4 mt-4">
        <button type="button" onClick={prev}>
          Previous
        </button>

        <button className="bg-blue-600 text-white px-4 py-2" disabled={!agreed}>
          Proceed to Payment
        </button>
      </div>
    </form>
  );
}
