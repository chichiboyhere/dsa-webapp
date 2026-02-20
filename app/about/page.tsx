"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const team = [
    {
      name: "Seyi Alade",
      role: "Executive Director",
      image: "/team/ed.jpg",
      bio: "Seyi ALADE is a seasoned human resources professional and dynamic educator with many years of teaching experience in leading Nigerian schools. He is the Founder and Director of Dynamic Success Academy. He trained as a professional teacher at Tai Solarin University of Education and Corona College of Education, where he earned a B.Sc. (Ed.) in Economics and a Professional Diploma in Educational Leadership and Management (PDELM), respectively. He also holds an M.Sc. in Economics from the University of Lagos, a National Diploma in Accountancy from Lagos State Polytechnic, and an Advanced Diploma in Leadership and Management (Finance option) with Distinction from Tuazama Leadership School of Management, USA.Seyi is a Certified Microfinance Banker (CIBN), an Associate of the Nigerian Institute of Management (Chartered), and an Associate of the Institute of Chartered Economists of Nigeria (ICEN). He is a Fellow of the Institute of Management Consulting (IMC Nigeria), a registered member of the Teachers Registration Council of Nigeria (TRCN), a full member of the Association of Economists and Statisticians of Nigeria, and an Associate Member of the Chartered Institute of Personnel Management of Nigeria (CIPM).Known for his clear, simple, and impactful teaching style, Seyi is highly respected by his students and professional peers.",
      qualifications: [
        "B.Sc.(Ed)",
        "M.Sc. Economics",
        "CIBN, CIMB, CIPM, ICAN, ICEN, IMC, TRCN, CIPM",
      ],
    },
    {
      name: "Olajide Onaolapo",
      role: "Registrar",
      image: "/team/registrar.jpg",
      bio: "Olajide Onaolapo is a distinguished and seasoned educator with extensive experience across both the private and public sectors in Nigeria. He is a graduate of the University of Lagos and holds a Bachelor of Arts in Education (History), Second Class Honours (Upper Division), as well as a Master of Arts in History and Strategic Studies. A certified member of the Teachers Registration Council of Nigeria (TRCN), he exemplifies academic excellence, professional integrity, and a strong commitment to educational leadership.",
      qualifications: ["B.A (Ed). Public Admin", "TRCN"],
    },
    {
      name: "Babatunde Jikunu",
      role: "Head of ICT Department",
      image: "/team/ict.jpg",
      bio: "Babatunde JIKUNU, a foremost alumnus of Dynamic Success Academy (2009–2010), is a distinguished graduate of the Federal University of Technology, Akure, Ondo State, Nigeria, where he earned a Bachelor of Engineering in Metallurgical and Materials Engineering. His career in data analytics commenced with a notable achievement, successfully reconciling a large database backlog, streamlining records, and significantly improving data accuracy across medical centres. Through his strong technical expertise and passion for teaching, Babatunde JIKUNU continues to inspire younger generations, fostering innovation, analytical thinking, and excellence in technology-driven education.",
      qualifications: [
        "B.Eng Metallurgical and Materials Engineering",
        "Certified Data Analyst",
      ],
    },
    {
      name: "Olushola CUMMINGS",
      role: "Head of Arts/Humanities Department",
      image: "/team/cummings.jpg",
      bio: "Olushola CUMMINGS is a seasoned educator with over three decades of teaching experience, specializing in *Politics, Government, and Christian Religious Studies (CRS). A graduate of Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria, he furthered his studies in missions and theology at Redeemer’s Bible College. He has taught with distinction across leading academic platforms, and his career reflects a deep commitment to *academic excellence, moral instruction, and holistic student development",
      qualifications: ["B.Sc", "Certified Teacher of Theology"],
    },
    {
      name: "Agboola Olayiwola",
      role: "Head of Science Department",
      image: "/team/agboola.jpg",
      bio: "Agboola Olayiwola is a graduate of Ogun State University, now Olabisi Onabanjo University, where he earned a Bachelor of Agriculture (B.Agric.), majoring in Plant Breeding and Cytogenetics. He is the author of Organic Chemistry Made Easy for Schools and Colleges, a scholarly resource designed to strengthen foundational understanding of organic chemistry among secondary and tertiary learners. A dynamic and experienced educator, Agboola has extensive expertise in teaching Biology and Chemistry. He remains deeply committed to nurturing learners, providing rigorous academic support, and upholding high academic standards, with particular emphasis on the medical and health sciences",
      qualifications: [
        "B.Agric Plant Breeding and Cytogenetics",
        "Certified Teacher and Author",
      ],
    },
  ];

  const [selectedMember, setSelectedMember] = useState<null | (typeof team)[0]>(
    null,
  );

  return (
    <>
      <Navbar />
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
              {/* Founded on the pillars of unyielding academic integrity and
            visionary brilliance, Dynamic Success Academy stands as a citadel of
            knowledge in the heart of Lagos. We do not merely tutor; we sculpt
            the minds of future world leaders. Our trajectory is marked by a
            relentless pursuit of pedagogical perfection, transforming the
            ambitious dreams of our students into tangible, record-breaking
            realities on the global stage. */}
              <b>Dynamic Success Academy (DSA)</b>, based in Lagos, is a
              registered, result driven academic centre committed to helping
              students and professionals succeed in key examinations through
              structured instruction, rigorous past question practice, and
              targeted learning support designed to deliver measurable exam
              success. The institute was founded in September 2009 and was first
              incorporated on 20 February 2019. It was subsequently incorporated
              as a limited liability company on <b>29 December 2025</b>, with
              registration number <b>9135185</b>. Why DSA DSA delivers high
              quality teaching and academic support, with a strong emphasis on
              progress tracking and the maintenance of consistent academic
              standards. Our core strengths include:{" "}
              <li className="list-none">
                <b>Experienced facilitators and tutors</b>
              </li>{" "}
              <li className="list-none">
                <b>A clear and structured learning framework</b>
              </li>{" "}
              <li className="list-none">
                <b>A supportive and disciplined study environment</b>
              </li>
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-0">
          <div className="bg-blue-900 text-white p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">The Mission</h3>
            <p className="text-blue-100 italic">
              {/* To democratize access to world-class educational resources and
            foster a culture of critical thinking that transcends examination
            success. */}
              To deliver high-quality, value-driven education that develops
              competent, God-fearing, well-balanced, and confident individuals
              equipped to excel in the opportunities and challenges of a dynamic
              and evolving world.
            </p>
          </div>
          <div className="bg-slate-900 text-white p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">The Vision</h3>
            <p className="text-slate-300 italic">
              {/* To be Africa&apos;s foremost catalyst for academic distinction and
            professional certification excellence. */}
              To raise academically excellent, intellectually disciplined, and
              globally competitive learners.
            </p>
          </div>
        </section>

        {/* Core Values - Visually Appealing Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              "Excellence",
              "Integrity",
              "Competence",
              "Discipline",
              "Purpose-Driven",
            ].map((value) => (
              <div
                key={value}
                className="p-8 border-t-4 border-blue-600 shadow-lg hover:-translate-y-2 transition-transform duration-300 bg-white"
              >
                <h4 className="font-bold text-xl mb-2">{value}</h4>
                <p className="text-gray-500 text-sm">
                  The fundamental bedrock of every DSA interaction.
                </p>
              </div>
            ))}
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
        {/* Profile Modal */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="sticky top-4 ml-auto mr-4 text-2xl font-bold text-gray-700 hover:text-red-600 z-10"
              >
                ×
              </button>

              <div className="md:flex">
                {/* Image */}
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:w-1/2">
                  <h3 className="text-2xl font-bold mb-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-blue-600 mb-4">{selectedMember.role}</p>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {selectedMember.bio}
                  </p>

                  <h4 className="font-bold text-sm uppercase mb-2">
                    Qualifications
                  </h4>
                  <ul className="text-sm text-gray-500 list-disc pl-4 space-y-1">
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

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AboutPage;
