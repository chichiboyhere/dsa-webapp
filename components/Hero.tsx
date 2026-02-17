import Image from "next/image";
// Use a library like Embla Carousel or Framer Motion for the slider logic
const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Slide Placeholder */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-1.jpg"
          alt="DSA Students in a modern classroom"
          fill
          priority
          className="object-cover brightness-50"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Empowering Minds,{" "}
          <span className="text-blue-400">Defining Futures.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200">
          Lagos&apos;s premier academy for O&apos;Level, A&pos;Level, and
          Professional excellence. Your journey to academic distinction starts
          here.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="rounded-full bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700">
            Enroll Now
          </button>
          <button className="rounded-full border-2 border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-blue-900">
            View Programs
          </button>
        </div>
      </div>

      {/* Slider Controls Placeholder */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
        <span className="h-2 w-8 rounded-full bg-blue-600"></span>
        <span className="h-2 w-8 rounded-full bg-gray-400/50"></span>
        <span className="h-2 w-8 rounded-full bg-gray-400/50"></span>
      </div>
    </section>
  );
};
export default Hero;
