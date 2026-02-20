import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProgramCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 border-l-4 border-blue-600 shadow-md hover:shadow-xl transition-shadow duration-300">
    <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const ProgramsPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-slate-50 min-h-screen">
        {/* Header */}
        <section className="bg-slate-900 py-20 px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Academic Excellence Tracks
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400">
            From foundational secondary education to advanced professional
            certifications, our curriculum is engineered for success.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
          {/* O'Level Sub-section */}
          <section id="olevel">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/3 sticky top-28">
                <h2 className="text-blue-600 font-black text-6xl opacity-20 mb-[-20px]">
                  01
                </h2>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  O&apos;Level Foundations
                </h3>
                <p className="text-gray-600 mb-6">
                  Mastering the fundamentals for secondary school exit and
                  university entry requirements.
                </p>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/olevel-focus.jpg"
                    alt="Students studying for JAMB"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProgramCard
                  title="JAMB (UTME)"
                  description="Intensive coaching focused on speed, accuracy, and high-score strategies for University entry."
                />
                <ProgramCard
                  title="WAEC / NECO"
                  description="Comprehensive syllabus coverage for the West African and National Examination Councils."
                />
                <ProgramCard
                  title="GCE"
                  description="Specialized private candidate preparation for both WAEC and NECO GCE series."
                />
                <ProgramCard
                  title="NABTEB"
                  description="Technical and business-focused examination preparation for vocational excellence."
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* A'Level Sub-section */}
          <section id="alevel">
            <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
              <div className="md:w-1/3 sticky top-28">
                <h2 className="text-blue-600 font-black text-6xl opacity-20 mb-[-20px]">
                  02
                </h2>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Advanced Level Studies
                </h3>
                <p className="text-gray-600 mb-6">
                  Direct Entry pathways for students seeking 200-Level
                  university admission.
                </p>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/alevel-focus.jpg"
                    alt="A-Level Lecture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProgramCard
                  title="JUPEB"
                  description="Joint Universities Preliminary Examinations Board. A guaranteed path to leading Nigerian universities."
                />
                <ProgramCard
                  title="IJMB"
                  description="Interim Joint Matriculation Board. Over 30 years of pedigree in Direct Entry admissions."
                />
                <ProgramCard
                  title="GCE A'Level"
                  description="International standard preparation for advanced level Cambridge and local variants."
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Professional Exams Sub-section */}
          <section id="professional">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/3 sticky top-28">
                <h2 className="text-blue-600 font-black text-6xl opacity-20 mb-[-20px]">
                  03
                </h2>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Professional Certifications
                </h3>
                <p className="text-gray-600 mb-6">
                  Elevate your career with globally recognized professional
                  qualifications.
                </p>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/pro-focus.jpg"
                    alt="Professional Exam Hall"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProgramCard
                  title="ICAN / CIBN"
                  description="Strategic tutoring for aspiring Chartered Accountants and Bankers."
                />
                <ProgramCard
                  title="CIPM / AMNIM"
                  description="Developing leaders in Human Resources and Professional Management."
                />
                <ProgramCard
                  title="ICSAN"
                  description="Specialized training for Chartered Secretaries and Administrators."
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};
export default ProgramsPage;
