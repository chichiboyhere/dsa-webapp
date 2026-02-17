"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  type?: string;
};

export default function FormInput({ name, label, type = "text" }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      <input
        type={type}
        {...register(name)}
        className="w-full border p-2 rounded"
      />

      {errors[name] && (
        <p className="text-red-600 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
