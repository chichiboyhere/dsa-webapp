import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GalleryPage = () => {
  const photos = [
    {
      src: "/gallery/1.jpg",
      desc: "Dorcas AYELAGBE - DSA: 2012 & 2015. BSc Economics (FIRST CLASS), Obafemi Awolowo University (OAU)",
      span: "md:col-span-2",
    },
    {
      src: "/gallery/2.jpg",
      desc: "Bolanle ADDO - DSA: 2010 - 2013. LL.B(Hons),B.L, Obafemi Awolowo University (OAU)",
      span: "md:col-span-1",
    },
    {
      src: "/gallery/3.jpg",
      desc: "Kabir AFOLABI - DSA: 2015/16. BSc(Hons) Mechanical Engineering (FIRST CLASS), Lagos State University(LASU)",
      span: "md:col-span-1",
    },
    {
      src: "/gallery/4.jpg",
      desc: "Ofure AIRAODION - DSA: 2016/17. BNSc(Hons), RN, Ambrose Alli University (AAU)",
      span: "md:col-span-2",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">
          Meet some of our notable alumni
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl ${photo.span} h-80`}
            >
              {/* Image with Top Positioning */}
              <Image
                src={photo.src}
                alt={photo.desc}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />

              {/* Responsive Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent 
                           opacity-100 md:opacity-0 md:group-hover:opacity-100 
                           transition-opacity duration-300 flex items-end p-6"
              >
                <p className="text-white font-medium text-sm md:text-base leading-tight">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GalleryPage;
