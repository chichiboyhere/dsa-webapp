//components/registration/StepA
"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { Camera, Loader2, ChevronRight, Save } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//const GENDER_OPTIONS = ["Male", "Female"] as const;

const stepASchema = z
  .object({
    surname: z
      .string()
      .default("")
      .refine((val) => val.length > 0, { message: "Surname is required" }),
    firstName: z
      .string()
      .default("")
      .refine((val) => val.length > 0, { message: "First name is required" }),
    middleName: z
      .string()
      .default("")
      .refine((val) => val.length > 0, { message: "Middle name is required" }),
    dob: z.string().min(1, "Date of birth is required"),

    //     gender: z.enum(["Male", "Female"], {
    //   required_error: "Please select a gender",
    //   invalid_type_error: "Please select a gender",
    // }),
    address: z
      .string()
      .default("")
      .refine((val) => val.length > 10, {
        message: "Address should be at least 10",
      }),
    nationality: z
      .string()
      .default("")
      .refine((val) => val.length > 0, { message: "Nationality is required" }),

    state: z
      .string()
      .default("")
      .refine((val) => val.length > 0, { message: "State is required" }),

    lga: z
      .string()
      .default("")
      .refine((val) => val.length > 0, { message: "LGA is required" }),

    phone: z
      .string()
      .default("")
      .refine((val) => val.length > 10, {
        message: "Enter a valid phone number",
      }),
    email: z
      .string()
      .default("")
      .refine((val) => val.length > 10, { message: "Invalid email address" }),

    password: z
      .string()
      .default("")
      .refine((val) => val.length > 6, {
        message: "Password must be at least 6 characters",
      }),

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"], // Sets the error specifically on the confirm field
  });

export default function StepA({ next, defaultValues }: any) {
  const [uploading, setUploading] = useState(false);

  // 1. Persist data: Using 'values' ensures that if the user
  // goes back and forth, the form re-syncs with the parent state.
  const methods = useForm({
    defaultValues,
    values: defaultValues,
    resolver: zodResolver(stepASchema),
    mode: "onTouched", // Validates as the user types/clicks away
  });

  const isEditing =
    !!defaultValues.firstName ||
    !!defaultValues.photoUrl ||
    !!defaultValues.middleName ||
    !!defaultValues.surname ||
    !!defaultValues.dob ||
    !!defaultValues.gender ||
    !!defaultValues.address ||
    !!defaultValues.nationality ||
    !!defaultValues.state ||
    !!defaultValues.lga ||
    !!defaultValues.phone ||
    !!defaultValues.email;

  // We add a jump parameter to the onSubmit handler
  const handleFormSubmit = (values: any, jumpBack: boolean = false) => {
    // If jumpBack is true, we tell the parent to go to step 7
    next(values, jumpBack ? 7 : undefined);
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  // 2. Photo Preview Logic
  const [preview, setPreview] = useState<string | null>(
    defaultValues.photoUrl || null,
  );
  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile?.[0] instanceof File) {
      const objectUrl = URL.createObjectURL(photoFile[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photoFile]);

  const onSubmit = async (values: any) => {
    if (!preview && (!values.photo || values.photo.length === 0)) {
      return alert("Please upload a passport photograph.");
    }

    setUploading(true);
    try {
      // 4. Conditional Upload
      // Only upload to Cloudinary/S3 if a NEW file was selected
      if (values.photo?.[0] instanceof File) {
        const formData = new FormData();
        formData.append("file", values.photo[0]);

        const res = await fetch("/api/upload/photo", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const result = await res.json();
        values.photoUrl = result.url; // Save the URL for the review step
      } else {
        // Keep the old URL if they didn't change the photo
        values.photoUrl = defaultValues.photoUrl;
      }

      next(values);
    } catch (err) {
      alert("Photo upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 animate-in fade-in duration-500"
      >
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
            Section A: Bio Data
          </h2>

          {/* Photo Upload UI */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center group transition-all hover:border-blue-400">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                />
              ) : (
                <Camera
                  className="text-gray-300 group-hover:text-blue-400"
                  size={32}
                />
              )}
              <input
                type="file"
                {...register("photo")}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
            <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              {preview ? "Tap to change photo" : "Tap to upload passport"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput name="surname" label="Surname" required />
            <FormInput name="firstName" label="First Name" required />
            <FormInput name="middleName" label="Middle Name" />
            <FormInput name="dob" label="Date of birth" type="date" required />

            <div className="my-2">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500 cursor-pointer">
                  <input type="radio" value="Male" {...register("gender")} />{" "}
                  Male
                </label>
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500 cursor-pointer">
                  <input type="radio" value="Female" {...register("gender")} />{" "}
                  Female
                </label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-[10px] font-bold mt-1">
                {String(errors.gender.message)}
              </p>
            )}

            <FormInput name="address" label="Residential Address" />
            <FormInput name="nationality" label="Nationality" />
            <FormInput name="state" label="State of Origin" />
            <FormInput name="lga" label="LGA" />
            <FormInput name="phone" label="Phone Number" />
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput
              name="password"
              label="Create Password"
              type="password"
            />
            <FormInput
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
            />
          </div>
        </div>
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
          disabled={uploading}
          className="w-full md:w-auto float-right bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Parents / Guardians"
          )}
          {!uploading && <ChevronRight size={20} />}
        </button>
      </form>
    </FormProvider>
  );
}
