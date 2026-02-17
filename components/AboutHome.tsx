import Image from "next/image";
import Link from "next/link";
const AboutHome = () => (
  <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
      <Image
        src="/images/about-intro.jpg"
        alt="DSA Learning Environment"
        fill
        className="object-cover"
      />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-blue-600 pl-4">
        Our Heritage of Excellence
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        DSA is more than a tutorial center; it is a launchpad. From mastering
        O&apos;Level basics to conquering Professional certifications, we
        provide a structured ecosystem designed for the modern Nigerian student.
      </p>
      <Link href="/about" className="text-blue-600 font-bold hover:underline">
        Learn More →
      </Link>
    </div>
  </section>
);

export default AboutHome;
