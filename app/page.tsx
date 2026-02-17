//import OrganizationJsonLd from "@/components/OrganzationJsonLd";

//import Contact from "@/components/Contact";

import Hero from "@/components/Hero";
import About from "@/components/AboutHome";
import GalleryHome from "@/components/Gallery";

export default function Home() {
  return (
    <main className=" bg-slate-50 text-slate-900 min-h-screen ">
      {/* <OrganizationJsonLd team={team} /> */}

      <Hero />
      <About />
      <GalleryHome />
      {/* <Contact /> */}
    </main>
  );
}
