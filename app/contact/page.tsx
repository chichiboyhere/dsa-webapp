//app/contact/page.tsx

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
//import { sendContactMessage } from "./actions";
import ContactForm from "@/components/ContactForm";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 flex flex-col">
        {/* Background Image Header */}
        <div className="relative h-[40vh] w-full">
          <Image
            src="/images/contact.png"
            alt="Get in touch"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white uppercase tracking-tighter">
              Contact Us
            </h1>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 mb-20">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
            {/* Contact Details */}
            <div className="bg-slate-900 text-white p-12 md:w-2/5">
              <h2 className="text-3xl font-bold mb-8">Reach Out</h2>
              <div className="space-y-8">
                <div>
                  <p className="text-blue-400 text-sm uppercase font-bold tracking-widest">
                    Address
                  </p>
                  <p className="text-lg mt-1">
                    8, Liadi-disu Street, Isheri-Oshun, Alimisho, Lagos.
                  </p>
                </div>
                <div>
                  <p className="text-blue-400 text-sm uppercase font-bold tracking-widest">
                    Phone
                  </p>
                  <p className="text-lg mt-1">+234 7015770234</p>
                  {/* <p className="text-lg">+234 (0) 900-SUCCESS</p> */}
                </div>
                <div>
                  <p className="text-blue-400 text-sm uppercase font-bold tracking-widest">
                    Email
                  </p>
                  <p className="text-[12px] mt-1">
                    contact@dynamicsuccessacademy.com
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-12 md:w-3/5 bg-white">
              <div className="p-12 md:w-3/5 bg-white">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default ContactPage;
