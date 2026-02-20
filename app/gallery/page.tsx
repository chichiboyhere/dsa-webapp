import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const GalleryPage = () => {
  const photos = [
    {
      src: "/gallery/1.jpg",
      desc: "Main Lecture Hall - Modern & Spacious",
      span: "md:col-span-2",
    },
    {
      src: "/gallery/2.jpg",
      desc: "Our State-of-the-Art ICT Laboratory",
      span: "md:col-span-1",
    },
    {
      src: "/gallery/3.jpg",
      desc: "2023 Matriculation Success Stories",
      span: "md:col-span-1",
    },
    {
      src: "/gallery/4.jpg",
      desc: "One-on-One Mentorship Sessions",
      span: "md:col-span-2",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">The DSA Experience</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl ${photo.span} h-80`}
            >
              <Image
                src={photo.src}
                alt={photo.desc}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">{photo.desc}</p>
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
