import Link from "next/link";
import Logo from "@/components/Logo";

// Payment Icons as SVG components
const VisaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
    <path d="M19.5 21H17L19 11H21.5L19.5 21Z" fill="white"/>
    <path d="M28.5 11.2C28 11 27 10.8 26 10.8C23 10.8 21 12.3 21 14.3C21 15.9 22.5 16.7 23.5 17.2C24.6 17.7 25 18.1 25 18.6C25 19.3 24.2 19.7 23.4 19.7C22.3 19.7 21.1 19.3 20.4 19L20 21C20.9 21.4 22.2 21.7 23.5 21.7C26.7 21.7 28.6 20.3 28.6 18.1C28.6 16.5 27.5 15.7 25.9 14.9C25 14.5 24.4 14.2 24.4 13.6C24.4 13.1 25 12.6 26 12.6C27 12.6 27.8 12.8 28.3 13L28.7 11.2H28.5Z" fill="white"/>
    <path d="M33.6 11H31.5C30.8 11 30.3 11.2 30 11.9L25.8 21H29L29.6 19.3H33.4L33.8 21H36.6L33.6 11ZM30.5 17.2L32 13.2L32.8 17.2H30.5Z" fill="white"/>
    <path d="M16 11L13 18.2L12.7 16.8C12.1 14.9 10.4 12.8 8.5 11.7L11.3 21H14.5L19.2 11H16Z" fill="white"/>
    <path d="M11 11H6L6 11.2C9.8 12.1 12.4 14.5 13.2 17.3L12.3 12C12.2 11.3 11.7 11 11 11Z" fill="#F9A61A"/>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#000"/>
    <circle cx="18" cy="16" r="8" fill="#EB001B"/>
    <circle cx="30" cy="16" r="8" fill="#F79E1B"/>
    <path d="M24 10.5C25.8 12 27 14.4 27 17C27 19.6 25.8 22 24 23.5C22.2 22 21 19.6 21 17C21 14.4 22.2 12 24 10.5Z" fill="#FF5F00"/>
  </svg>
);

const MpesaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#4CAF50"/>
    <text x="24" y="18" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">M-PESA</text>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* CTA Band */}
      <div className="bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to ship across East & Central Africa?</h3>
            <p className="text-white/70 mt-1">Get started with AceField Logistics today — fast, reliable, affordable.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/quote" className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Get a Quote
            </Link>
            <Link href="/contact" className="px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="mb-4">
              <Logo variant="full" size="md" theme="dark" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              East Africa&apos;s premier logistics partner, delivering excellence across 7 countries since 2015.
            </p>
            <div className="flex gap-3 mt-4">
              {["facebook", "twitter", "linkedin", "instagram"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors text-xs uppercase font-bold">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Accepted Payments</p>
              <div className="flex items-center gap-3">
                <VisaIcon />
                <MastercardIcon />
                <MpesaIcon />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/services/parcel-delivery" className="hover:text-secondary transition-colors">Parcel Delivery</Link></li>
              <li><Link href="/services/courier-services" className="hover:text-secondary transition-colors">Courier Services</Link></li>
              <li><Link href="/services/same-day-delivery" className="hover:text-secondary transition-colors">Same-Day Delivery</Link></li>
              <li><Link href="/services/cross-border" className="hover:text-secondary transition-colors">Cross-Border Logistics</Link></li>
              <li><Link href="/services/warehousing" className="hover:text-secondary transition-colors">Warehousing &amp; Fulfillment</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/track" className="hover:text-secondary transition-colors">Track Shipment</Link></li>
              <li><Link href="/quote" className="hover:text-secondary transition-colors">Get a Quote</Link></li>
              <li><Link href="/coverage" className="hover:text-secondary transition-colors">Coverage Area</Link></li>
              <li><Link href="/blog" className="hover:text-secondary transition-colors">Blog &amp; Insights</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {/* Mombasa HQ */}
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div>
                  <span className="text-white font-semibold text-xs">Mombasa HQ</span><br />
                  Port Area, Mombasa
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +254 721 907 730
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +254 725 306 678
              </li>
              {/* Email */}
              <li className="flex items-center gap-2 pt-2 border-t border-white/10">
                <svg className="w-4 h-4 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@acefieldlogistics.com
              </li>
            </ul>
            {/* WhatsApp */}
            <a
href="https://wa.me/254725306678?text=Hello%20AceField%20Logistics%2C%20I%20need%20help%20with%20courier%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} AceField Logistics East Africa. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254725306678?text=Hello%20AceField%20Logistics%2C%20I%20need%20help%20with%20courier%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </footer>
  );
}
