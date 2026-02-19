// //components/registration/StepA.tsx
// "use client";

// import { useForm, FormProvider } from "react-hook-form";
// import FormInput from "@/components/FormInput";

// export default function StepA({ next, defaultValues }: any) {
//   const methods = useForm({
//     defaultValues,
//   });

//   const onSubmit = async (values: any) => {
//     if (values.password !== values.passwordConfirm)
//       return alert("Passwords do not match");
//     next(values);

//     // 1️⃣ Ensure a file was selected
//     if (!values.photo?.[0]) {
//       alert("Please upload a passport photograph.");
//       return;
//     }

//     // 2️⃣ Upload to Cloudinary
//     const formData = new FormData();
//     formData.append("file", values.photo[0]);

//     const res = await fetch("/api/upload/photo", {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) {
//       alert("Photo upload failed. Please retry.");
//       return;
//     }

//     const result = await res.json();

//     // 3️⃣ Attach URL to form values
//     values.photoUrl = result.url;

//     // 4️⃣ Sanity check (NOW it makes sense)
//     if (!values.photoUrl) {
//       alert("Photo upload failed. Please retry.");
//       return;
//     }

//     // 5️⃣ Move to next step
//     next(values);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         <h2 className="font-bold mb-2">SECTION A – BIO DATA</h2>

//         <FormInput name="surname" label="Surname" />
//         <FormInput name="firstName" label="First Name" />
//         <FormInput name="middleName" label="Middle Name" />

//         <FormInput name="dob" label="Date of Birth" type="date" />
//         <div className="my-2">
//           <label className="block font-medium">Gender</label>

//           <label className="mr-4">
//             <input type="radio" value="Male" {...methods.register("gender")} />{" "}
//             Male
//           </label>

//           <label>
//             <input
//               type="radio"
//               value="Female"
//               {...methods.register("gender")}
//             />{" "}
//             Female
//           </label>
//         </div>

//         <FormInput name="email" label="Email" />
//         <FormInput name="password" label="Password" type="password" />
//         <FormInput
//           name="passwordConfirm"
//           label="Confirm Password"
//           type="password"
//         />

//         <FormInput name="address" label="Residential Address" />
//         <FormInput name="phone" label="Phone Number" />

//         <FormInput name="nationality" label="Nationality" />
//         <FormInput name="state" label="State of Origin" />
//         <FormInput name="lga" label="LGA of Origin" />
//         <FormInput name="photo" label="Upload ID Photo" type="file" />

//         <button className="bg-blue-600 text-white px-4 py-2">Next</button>
//       </form>
//     </FormProvider>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import FormInput from "@/components/FormInput";
// import { Camera, Loader2, ChevronRight } from "lucide-react";
// import Image from "next/image";

// export default function StepA({ next, defaultValues }: any) {
//   const [preview, setPreview] = useState<string | null>(
//     defaultValues.photoUrl || null,
//   );
//   const [uploading, setUploading] = useState(false);

//   const methods = useForm({ defaultValues });
//   const photoFile = methods.watch("photo");

//   // Handle local preview logic
//   useEffect(() => {
//     if (photoFile?.[0]) {
//       const objectUrl = URL.createObjectURL(photoFile[0]);
//       setPreview(objectUrl);
//       return () => URL.revokeObjectURL(objectUrl);
//     }
//   }, [photoFile]);

//   const onSubmit = async (values: any) => {
//     if (values.password !== values.passwordConfirm)
//       return alert("Passwords do not match");
//     if (!values.photo?.[0] && !preview)
//       return alert("Please upload a passport photograph.");

//     setUploading(true);
//     try {
//       // Only upload if a new file was selected (skips if they went back/forth)
//       if (values.photo?.[0]) {
//         const formData = new FormData();
//         formData.append("file", values.photo[0]);

//         const res = await fetch("/api/upload/photo", {
//           method: "POST",
//           body: formData,
//         });
//         if (!res.ok) throw new Error("Upload failed");

//         const result = await res.json();
//         values.photoUrl = result.url;
//       }

//       next(values);
//     } catch (err) {
//       alert("Photo upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className="space-y-6 animate-in fade-in duration-500"
//       >
//         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
//           <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
//             Section A: Bio Data
//           </h2>

//           {/* Photo Upload UI */}
//           <div className="flex flex-col items-center mb-8">
//             <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center group transition-all hover:border-blue-400">
//               {preview ? (
//                 <Image
//                   src={preview}
//                   alt="Preview"
//                   className="w-full h-full object-cover"
//                   width={600}
//                   height={600}
//                 />
//               ) : (
//                 <Camera
//                   className="text-gray-300 group-hover:text-blue-400"
//                   size={32}
//                 />
//               )}
//               <input
//                 type="file"
//                 {...methods.register("photo")}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept="image/*"
//               />
//             </div>
//             <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
//               Tap to upload passport
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormInput name="surname" label="Surname" />
//             <FormInput name="firstName" label="First Name" />
//             <FormInput name="middleName" label="Middle Name" />
//             <FormInput name="dob" label="Date of birth" type="date" />

//             <div className="my-2">
//               <label className="block  text-[10px] font-black uppercase text-gray-400">
//                 Gender
//               </label>

//               <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                 <input
//                   type="radio"
//                   value="Male"
//                   {...methods.register("gender")}
//                 />{" "}
//                 Male
//               </label>

//               <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                 <input
//                   type="radio"
//                   value="Female"
//                   {...methods.register("gender")}
//                 />{" "}
//                 Female
//               </label>
//             </div>

//             <FormInput name="address" label="Residential Address" />
//             <FormInput name="nationality" label="Nationality" />
//             <FormInput name="state" label="State of Origin" />
//             <FormInput name="lga" label="Local Governement Area" />
//             <FormInput name="phone" label="Phone Number" />
//             <FormInput name="email" label="Email Address" type="email" />
//             <FormInput
//               name="password"
//               label="Create Password"
//               type="password"
//             />
//             <FormInput
//               name="passwordConfirm"
//               label="Confirm Password"
//               type="password"
//             />
//           </div>
//         </div>

//         <button
//           disabled={uploading}
//           className="w-full md:w-auto float-right bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50"
//         >
//           {uploading ? (
//             <Loader2 className="animate-spin" size={20} />
//           ) : (
//             "Parents / Guardians"
//           )}
//           {!uploading && <ChevronRight size={20} />}
//         </button>
//       </form>
//     </FormProvider>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { Camera, Loader2, ChevronRight, Save } from "lucide-react";
import Image from "next/image";

export default function StepA({ next, defaultValues }: any) {
  const [uploading, setUploading] = useState(false);

  // 1. Persist data: Using 'values' ensures that if the user
  // goes back and forth, the form re-syncs with the parent state.
  const methods = useForm({
    defaultValues,
    values: defaultValues,
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

  const { watch, register, handleSubmit } = methods;

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
    // 3. Strict Validation Checks
    if (values.password !== values.passwordConfirm) {
      return alert("Passwords do not match. Please re-enter.");
    }

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
