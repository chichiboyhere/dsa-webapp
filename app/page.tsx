//import OrganizationJsonLd from "@/components/OrganzationJsonLd";

//import Contact from "@/components/Contact";

import Hero from "@/components/Hero";
import About from "@/components/AboutHome";
import GalleryHome from "@/components/Gallery";
import ProgramsSnippet from "@/components/ProgramsSnippet";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactSnippet from "@/components/ContactSnippet";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Success Academy - Home page",
  description:
    "The home of academic excellence and success through thorough preparation and a commitment to settle for nothing but the very best",
  keywords: [
    "Excellence",
    "Commitment to Success",
    "Diligence",
    "Determination to succeed",
    "DSA",
  ],
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className=" bg-slate-50 text-slate-900 min-h-screen pt-20">
        {/* <OrganizationJsonLd team={team} /> */}

        <Hero />
        <About />
        <ProgramsSnippet />

        <Testimonials />
        <GalleryHome />
        <ContactSnippet />
        <WhatsAppButton />
      </main>
      <Footer />
    </>
  );
}
