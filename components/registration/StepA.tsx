"use client";

import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";

export default function StepA({ next, defaultValues }: any) {
  const methods = useForm({
    defaultValues,
  });

  const onSubmit = async (values: any) => {
    if (values.password !== values.passwordConfirm)
      return alert("Passwords do not match");
    next(values);

    // 1️⃣ Ensure a file was selected
    if (!values.photo?.[0]) {
      alert("Please upload a passport photograph.");
      return;
    }

    // 2️⃣ Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", values.photo[0]);

    const res = await fetch("/api/upload/photo", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Photo upload failed. Please retry.");
      return;
    }

    const result = await res.json();

    // 3️⃣ Attach URL to form values
    values.photoUrl = result.url;

    // 4️⃣ Sanity check (NOW it makes sense)
    if (!values.photoUrl) {
      alert("Photo upload failed. Please retry.");
      return;
    }

    // 5️⃣ Move to next step
    next(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="font-bold mb-2">SECTION A – BIO DATA</h2>

        <FormInput name="surname" label="Surname" />
        <FormInput name="firstName" label="First Name" />
        <FormInput name="middleName" label="Middle Name" />

        <FormInput name="dob" label="Date of Birth" type="date" />
        <div className="my-2">
          <label className="block font-medium">Gender</label>

          <label className="mr-4">
            <input type="radio" value="Male" {...methods.register("gender")} />{" "}
            Male
          </label>

          <label>
            <input
              type="radio"
              value="Female"
              {...methods.register("gender")}
            />{" "}
            Female
          </label>
        </div>

        <FormInput name="email" label="Email" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
        />

        <FormInput name="address" label="Residential Address" />
        <FormInput name="phone" label="Phone Number" />

        <FormInput name="nationality" label="Nationality" />
        <FormInput name="state" label="State of Origin" />
        <FormInput name="lga" label="LGA of Origin" />
        <FormInput name="photo" label="Upload ID Photo" type="file" />

        <button className="bg-blue-600 text-white px-4 py-2">Next</button>
      </form>
    </FormProvider>
  );
}
