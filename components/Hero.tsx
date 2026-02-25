"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/hero1.png",
    heading: "Excellence in Learning. Confidence for Life.",
    subtext:
      "Structured preparation for WAEC, JAMB & CBT examinations delivered by experienced educators in a focused environment.",
    primaryBtn: "Explore Programs",
    secondaryBtn: "Apply Now",
    links: ["/programs", "/register/student"],
  },
  {
    image: "/hero2.png",
    heading: "Smart Preparation for a Digital Future",
    subtext:
      "Interactive CBT practice, technology-enabled instruction, and personalized academic support to help students stay ahead.",
    primaryBtn: "Try CBT Practice",
    secondaryBtn: "View Facilities",
    links: ["/#", "/#"],
  },
  {
    image: "/hero3.jpg",
    heading: "Turning Hard Work Into Outstanding Results",
    subtext:
      "We empower students with discipline, mentorship, and strategies that consistently deliver academic success.",
    primaryBtn: "See Success Stories",
    secondaryBtn: "Contact Us",
    links: ["/#testimonials", "/contact"],
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[index];

  return (
    <section className="relative w-full h-[85vh] overflow-hidden z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt="Hero slide"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
            <div className="text-white max-w-3xl">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              >
                {currentSlide.heading}
              </motion.h1>

              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-base md:text-lg lg:text-xl opacity-90 mb-8"
              >
                {currentSlide.subtext}
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary */}
                <Link
                  href={currentSlide.links[0]}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold shadow-lg text-center"
                >
                  {currentSlide.primaryBtn}
                </Link>

                {/* Secondary */}
                <Link
                  href={currentSlide.links[1]}
                  className="px-8 py-3 bg-white/10 backdrop-blur border border-white/40 hover:bg-white/20 transition rounded-xl font-semibold text-center"
                >
                  {currentSlide.secondaryBtn}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
