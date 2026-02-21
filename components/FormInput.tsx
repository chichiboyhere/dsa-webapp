//componets/FormInput.tsx

"use client";

import { useFormContext } from "react-hook-form";

export default function FormInput({
  name,
  label,
  type = "text",
  ...props
}: any) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
        {label}
      </label>
      <input
        type={type}
        // THIS IS THE MISSING PIECE:
        {...register(name)}
        // Keep other props like placeholder or autoFocus
        {...props}
        className="w-full p-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-black"
      />

      {errors[name] && (
        <p className="text-red-600 text-[10px] font-bold uppercase mt-1">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
