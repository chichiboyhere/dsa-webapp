import Image from "next/image";
import Link from "next/link";
const GalleryHome = () => (
  <section className="py-20 bg-gray-50 px-6">
    <h2 className="text-center text-3xl font-bold mb-12">Life at DSA</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div className="relative h-64 rounded-xl overflow-hidden">
        <Image
          src="/gallery/1.jpg"
          alt="ICT Center"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-64 rounded-xl overflow-hidden">
        <Image
          src="/gallery/2.jpg"
          alt="Lecture Hall"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-64 rounded-xl overflow-hidden">
        <Image
          src="/gallery/3.jpg"
          alt="Seminar Session"
          fill
          className="object-cover"
        />
      </div>
    </div>
    <div className="text-center mt-10">
      <Link
        href="/gallery"
        className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition"
      >
        View Full Gallery
      </Link>
    </div>
  </section>
);
export default GalleryHome;
