"use client";

import { useState } from "react";
import Image from "next/image";

const AboutPage = () => {
  const [selectedMember, setSelectedMember] = useState<null | (typeof team)[0]>(
    null,
  );

  const team = [
    {
      name: "Dr. Adeyemi Benson",
      role: "Executive Director",
      image: "/team/ed.jpg",
      bio: "A visionary educationalist with 25 years of experience in curriculum development...",
      qualifications: [
        "Ph.D. Education",
        "M.Sc. Strategy",
        "Member, British Council Educators",
      ],
    },
    {
      name: "Mrs. Chioma Okoro",
      role: "Registrar",
      image: "/team/registrar.jpg",
      bio: "The backbone of our academic administration, ensuring seamless student transitions...",
      qualifications: ["B.Sc. Public Admin", "Certified Academic Registrar"],
    },
    {
      name: "Engr. Tunde Williams",
      role: "Head of ICT Department",
      image: "/team/ict.jpg",
      bio: "Driving the digital transformation of DSA with cutting-edge learning management systems...",
      qualifications: ["B.Eng Computer Science", "Google Certified Educator"],
    },
  ];

  return (
    <main className="pt-20">
      {/* The Story Section */}
      <section className="bg-slate-50 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-blue-900 uppercase tracking-widest font-semibold mb-4 text-sm">
            Our Heritage
          </h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 italic">
            &quot; A Pedigree of Intellectual Superiority&quot;
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
            Founded on the pillars of unyielding academic integrity and
            visionary brilliance, Dynamic Success Academy stands as a citadel of
            knowledge in the heart of Lagos. We do not merely tutor; we sculpt
            the minds of future world leaders. Our trajectory is marked by a
            relentless pursuit of pedagogical perfection, transforming the
            ambitious dreams of our students into tangible, record-breaking
            realities on the global stage.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-0">
        <div className="bg-blue-900 text-white p-16 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-4">The Mission</h3>
          <p className="text-blue-100 italic">
            To democratize access to world-class educational resources and
            foster a culture of critical thinking that transcends examination
            success.
          </p>
        </div>
        <div className="bg-slate-900 text-white p-16 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-4">The Vision</h3>
          <p className="text-slate-300 italic">
            To be Africa&apos;s foremost catalyst for academic distinction and
            professional certification excellence.
          </p>
        </div>
      </section>

      {/* Core Values - Visually Appealing Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {["Excellence", "Integrity", "Innovation", "Discipline"].map(
            (value) => (
              <div
                key={value}
                className="p-8 border-t-4 border-blue-600 shadow-lg hover:-translate-y-2 transition-transform duration-300 bg-white"
              >
                <h4 className="font-bold text-xl mb-2">{value}</h4>
                <p className="text-gray-500 text-sm">
                  The fundamental bedrock of every DSA interaction.
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Management Team */}
      <section className="py-24 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          The Leadership Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="group cursor-pointer text-center"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative h-96 w-full mb-6 grayscale group-hover:grayscale-0 transition duration-500 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-blue-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-2xl font-bold"
            >
              ×
            </button>
            <div className="md:flex">
              <div className="relative h-64 md:h-auto md:w-1/2">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <h3 className="text-2xl font-bold mb-1">
                  {selectedMember.name}
                </h3>
                <p className="text-blue-600 mb-4">{selectedMember.role}</p>
                <p className="text-gray-600 text-sm mb-4">
                  {selectedMember.bio}
                </p>
                <h4 className="font-bold text-sm uppercase mb-2">
                  Qualifications:
                </h4>
                <ul className="text-sm text-gray-500 list-disc pl-4">
                  {selectedMember.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AboutPage;
