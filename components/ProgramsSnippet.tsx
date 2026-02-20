// components/ProgramsSnippet.tsx
import { GraduationCap, BookOpen, Briefcase } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "O'Level Track",
    desc: "Intensive coaching for WAEC, NECO, and GCE. We focus on clearing all subjects in one sitting.",
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    link: "/programs#olevel",
  },
  {
    title: "A'Level Track",
    desc: "Prepare for IJMB, JUPEB, and Cambridge A-Levels to secure 200L university admission.",
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    link: "/programs#alevel",
  },
  {
    title: "Professional Track",
    desc: "Digital literacy, ICAN, and specialized certifications for career growth.",
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    link: "/programs#professional",
  },
];

const ProgramsSnippet = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
      <div className="max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Our Specialized Tracks
        </h2>
        <p className="text-gray-600">
          Tailored learning paths designed to take you from where you are to
          where you want to be.
        </p>
      </div>
      <Link
        href="/programs"
        className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
      >
        View All Programs
      </Link>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {programs.map((p, i) => (
        <div
          key={i}
          className="group p-8 border border-gray-100 rounded-2xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white"
        >
          <div className="mb-6 p-4 bg-blue-50 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
            {p.icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{p.title}</h3>
          <p className="text-gray-500 mb-6 line-clamp-3">{p.desc}</p>
          <Link
            href={p.link}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold"
          >
            Read More{" "}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      ))}
    </div>
  </section>
);

export default ProgramsSnippet;
