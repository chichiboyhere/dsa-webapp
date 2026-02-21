// components/ContactSnippet.tsx
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const ContactSnippet = () => (
  <section className="py-20 px-6 bg-gray-900 text-white">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6">Have Questions?</h2>
        <p className="text-gray-400 mb-8">
          Visit us today. We are open Monday - Saturday, 8:00 AM to 6:00 PM.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">
              <MapPin className="w-6 h-6" />
            </div>
            <span>
              Main Campus: 8, Liadi-disu Street, Isheri-Oshun, Alimisho, Lagos.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">
              <Phone className="w-6 h-6" />
            </div>
            <span>+234 701 577 0234</span>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold mb-4">Quick Inquiry</h3>
        <p className="text-sm text-gray-400 mb-6">
          Leave your name and number, and we&apos;ll call you back.
        </p>
        <div className="space-y-4">
          <input
            className="w-full bg-white/10 border border-white/20 p-3 rounded-lg outline-none focus:border-blue-500"
            placeholder="Your Name"
          />
          <input
            className="w-full bg-white/10 border border-white/20 p-3 rounded-lg outline-none focus:border-blue-500"
            placeholder="Phone Number"
          />
          <Link
            href="/contact"
            className="block w-full bg-blue-600 text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Read More & Contact Us
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSnippet;
