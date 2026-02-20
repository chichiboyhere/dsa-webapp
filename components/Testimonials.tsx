// components/Testimonials.tsx
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chinedu Okoro",
    score: "324 JAMB",
    text: "The CBT practice at DSA was the game changer. I felt like I was writing a mock exam every day until the real one became easy.",
    image: "/student1.jpg",
  },
  {
    name: "Amina Yusuf",
    score: "7 Distinctions (WAEC)",
    text: "The teachers here don't just teach subjects; they teach you how to approach questions. I'm now studying Medicine at UI.",
    image: "/student2.jpg",
  },
];

const Testimonials = () => (
  <section className="py-20 bg-blue-900 text-white px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
        <p className="text-blue-200">
          Join 500+ students who achieved their dreams with DSA.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl relative border border-white/10"
          >
            <Quote className="absolute top-4 right-4 text-blue-400 w-8 h-8 opacity-50" />
            <p className="text-lg italic mb-6">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full" />{" "}
              {/* Replace with Image */}
              <div>
                <h4 className="font-bold">{t.name}</h4>
                <span className="text-sm bg-blue-600 px-2 py-1 rounded text-white font-mono uppercase">
                  {t.score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
