import Link from "next/link";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-bold mb-6">DSA</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Lagos&apos; premier destination for academic distinction. We
            transform potential into performance through unrivaled tutoring
            excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-6 text-blue-400 uppercase text-xs tracking-widest">
            Navigation
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/about" className="hover:text-white transition">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-white transition">
                Exams Covered
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition">
                Campus Life
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Exams (SEO Keywords) */}
        <div>
          <h4 className="font-bold mb-6 text-blue-400 uppercase text-xs tracking-widest">
            Exams
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>JAMB / WAEC / NECO</li>
            <li>JUPEB / IJMB</li>
            <li>ICAN / CIBN</li>
            <li>CIPM / ICSAN</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-6 text-blue-400 uppercase text-xs tracking-widest">
            Visit Us
          </h4>
          <address className="not-italic text-sm text-gray-400 leading-relaxed">
            Main Campus: [Insert Lagos Address Here]
            <br />
            Lagos, Nigeria.
            <br />
            <br />
            T: +234 800 123 4567
            <br />
            E: info@dynamicsuccess.edu.ng
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 text-center text-xs text-gray-500">
        © {currentYear} Dynamic Success Academy. All Rights Reserved.
      </div>
    </footer>
  );
};
export default Footer;
