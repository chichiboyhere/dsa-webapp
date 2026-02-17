"use client";

import { useState } from "react";

import Overview from "./sections/Overview";
import Bio from "./sections/Bio";
import Payments from "./sections/Payments";
import CBT from "./sections/CBT";
import Handbook from "./sections/Handbook";
import LogoutButton from "@/components/LogoutButton";
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {student.firstName}</h1>
        <LogoutButton />
      </div>

      {/* Tab Nav */}
      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-2 capitalize ${
              active === tab
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {active === "overview" && <Overview student={student} />}
      {active === "bio" && <Bio student={student} />}
      {active === "payments" && <Payments student={student} />}
      {active === "cbt" && <CBT student={student} />}
      {active === "handbook" && <Handbook student={student} />}
      {active === "cbthistory" && <CBTHistory student={student} />}
    </>
  );
}
