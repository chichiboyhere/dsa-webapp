"use client";

import Image from "next/image";
import { QrCode, Download, Printer } from "lucide-react";

export default function IDCard({ student }: any) {
  const handlePrint = () => window.print();

  return (
    <div className="max-w-md mx-auto group">
      {/* The Card Container */}
      <div
        id="id-card"
        className="relative aspect-[3/2] w-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden text-white p-6 border-4 border-white/10 print:shadow-none print:border-blue-600"
      >
        {/* Background Decor */}
        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-white/10 backdrop-blur-sm" />

        {/* Header */}
        <div className="relative flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-black tracking-tighter uppercase leading-tight">
              DSA Academy
            </h2>
            <p className="text-[8px] opacity-80 font-bold uppercase tracking-widest">
              Student Identification
            </p>
          </div>
          <div className="bg-white p-1 rounded-lg">
            <QrCode className="text-blue-900" size={32} />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex gap-4 mt-2">
          {/* Photo */}
          <div className="relative w-24 h-28 rounded-xl border-2 border-white/50 overflow-hidden bg-gray-200">
            <Image
              src={student.photoUrl || "/placeholder-user.png"}
              alt="Student"
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-black uppercase leading-none mb-1">
              {student.surname}
            </h3>
            <p className="text-sm font-bold opacity-90 mb-3">
              {student.firstName} {student.middleName || ""}
            </p>

            <div className="space-y-1">
              <div className="flex flex-col">
                <span className="text-[7px] uppercase opacity-70 font-bold">
                  Reg Number
                </span>
                <span className="text-sm font-mono font-bold text-yellow-300">
                  {student.registrationNo}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] uppercase opacity-70 font-bold">
                  Department
                </span>
                <span className="text-[10px] font-bold uppercase">
                  {student.department}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-3 left-6 right-6 flex justify-between items-center">
          <p className="text-[9px] font-bold opacity-60">
            Valid until: {new Date().getFullYear() + 1}
          </p>
          <div className="h-6 w-16 bg-white/20 rounded border border-white/20" />{" "}
          {/* Signature space */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3 justify-center no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
        >
          <Printer size={16} /> Print Card
        </button>
      </div>
    </div>
  );
}
