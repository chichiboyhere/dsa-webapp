//app/dashboard/DashboardTabs
"use client";

import { useState } from "react";

import Overview from "./sections/Overview";
import Bio from "./sections/Bio";
import Payments from "./sections/Payments";
import CBT from "./sections/CBT";
import Handbook from "./sections/Handbook";
//import LogoutButton from "@/components/LogoutButton";
import CBTHistory from "./sections/CBTHistory";

const tabs = [
  "overview",
  "bio",
  "payments",
  "cbt",
  "handbook",
  "cbthistory",
] as const;

export default function DashboardTabs({ student }: any) {
  const [active, setActive] = useState<(typeof tabs)[number]>("overview");

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-12 ">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Portal
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back, {student.firstName}
          </p>
        </div>
        {/* <LogoutButton /> */}
      </div>

      {/* Visual Progress Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex justify-between items-center max-w-xl mx-auto">
          <Step label="Applied" done />
          <Step
            label="Approved"
            done={student.status === "ACTIVE"}
            current={student.status === "AWAITING_APPROVAL"}
          />
          <Step label="Certified" done={false} />
        </div>
      </div>

      {/* Scrollable Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              active === tab
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-500">
        {active === "overview" && <Overview student={student} />}

        {active === "bio" && <Bio student={student} />}

        {active === "payments" && <Payments student={student} />}

        {/* {active === "cbt" && <CBT student={student} />} */}

        {active === "handbook" && <Handbook />}

        {/* {active === "cbthistory" && <CBTHistory student={student} />} */}
        {/* ... other sections ... */}
      </div>
    </>
  );

  function Step({ label, done, current }: any) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            done
              ? "bg-green-500 border-green-500 text-white"
              : current
                ? "border-blue-600 text-blue-600 animate-pulse"
                : "border-gray-100 text-gray-300"
          }`}
        >
          {done ? "✓" : "•"}
        </div>
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">
          {label}
        </span>
      </div>
    );
  }
}
