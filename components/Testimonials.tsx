import Image from "next/image";

const testimonials = [
  "/testimonial/t1.jpg",
  "/testimonial/t2.jpg",
  "/testimonial/t3.jpg",
  "/testimonial/t4.jpg",
  "/testimonial/t5.jpg",
  "/testimonial/t6.jpg",
];

const Testimonials = () => (
  <section
    className="relative py-24 bg-gradient-to-b from-blue-950 to-blue-900 text-white px-6"
    id="testimonials"
  >
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Success Stories
        </h2>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Join 500+ students who achieved their dreams with DSA.
        </p>
        <p className="text-blue-300 mt-2">
          Meet our best-performing students of the 2024/25 session.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />

            <Image
              src={t}
              alt={`Student testimonial ${i + 1}`}
              width={600}
              height={800}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
