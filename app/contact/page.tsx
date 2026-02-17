import Image from "next/image";

const ContactPage = () => {
  return (
    <main className="min-h-screen pt-20 flex flex-col">
      {/* Background Image Header */}
      <div className="relative h-[40vh] w-full">
        <Image
          src="/images/contact-hero.jpg"
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
                  123 Academy Way, Victoria Island / Ikeja, Lagos, Nigeria
                </p>
              </div>
              <div>
                <p className="text-blue-400 text-sm uppercase font-bold tracking-widest">
                  Phone
                </p>
                <p className="text-lg mt-1">+234 (0) 800-DYNAMIC</p>
                <p className="text-lg">+234 (0) 900-SUCCESS</p>
              </div>
              <div>
                <p className="text-blue-400 text-sm uppercase font-bold tracking-widest">
                  Email
                </p>
                <p className="text-lg mt-1">admissions@dsa.edu.ng</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-12 md:w-3/5 bg-white">
            <form className="grid grid-cols-1 gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition"
                />
              </div>
              <select className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition bg-transparent">
                <option>Interested in...</option>
                <option>O&apos;Level (JAMB/WAEC)</option>
                <option>A&apos;Level (JUPEB/IJMB)</option>
                <option>Professional Exams (ICAN)</option>
              </select>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="border-b-2 border-gray-200 py-3 focus:border-blue-600 outline-none transition"
              ></textarea>
              <button className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition self-start">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ContactPage;
