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
