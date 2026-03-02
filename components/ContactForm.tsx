"use client";

import React, { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage } from "@/app/contact/actions";

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition self-start disabled:opacity-50"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = React.useActionState(
    sendContactMessage,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 gap-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition"
          />
        </div>

        <select
          name="interest"
          required
          className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition bg-transparent"
        >
          <option value="">Interested in...</option>
          <option value="O'Level">O'Level (JAMB/WAEC)</option>
          <option value="A'Level">A'Level (JUPEB/IJMB)</option>
          <option value="professional">Professional Exams (ICAN)</option>
        </select>

        <textarea
          name="message"
          required
          rows={4}
          placeholder="Your Message"
          className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition"
        />

        <SubmitButton />
      </form>

      {state?.message && (
        <div
          className={`mt-6 p-4 rounded-xl text-sm font-medium transition ${
            state.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {state.message}
        </div>
      )}
    </>
  );
}
