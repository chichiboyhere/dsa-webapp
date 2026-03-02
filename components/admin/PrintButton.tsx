"use client"; // This is the key!

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition shadow-lg print:hidden"
    >
      <Printer size={18} /> Print Official List
    </button>
  );
}
