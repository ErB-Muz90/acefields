import Link from "next/link";
import Image from "next/image";

const services = [
  { icon: "📦", title: "Parcel Delivery", desc: "Door-to-door parcel delivery across Kenya and East Africa with real-time tracking.", href: "/services/parcel-delivery" },
  { icon: "🚛", title: "Courier Services", desc: "Lorry-based courier services for bulk goods and business consignments across the region.", href: "/services/courier-services" },
  { icon: "⚡", title: "Same-Day Delivery", desc: "Urgent deliveries within Nairobi and major cities — guaranteed same-day.", href: "/services/same-day-delivery" },
  { icon: "🌍", title: "Cross-Border Logistics", desc: "Seamless courier services between Kenya, Uganda, Tanzania, Rwanda & Burundi.", href: "/services/cross-border" },
  { icon: "🏭", title: "Warehousing", desc: "Secure, modern warehousing and order fulfillment services in Nairobi.", href: "/services/warehousing" },
  { icon: "💳", title: "M-Pesa Payments", desc: "Pay for shipments conveniently via M-Pesa — fast and secure transactions.", href: "/quote" },
];

const stats = [
  { number: "50K+", label: "Deliveries Completed" },
  { number: "5", label: "Countries Covered" },
  { number: "99.2%", label: "On-Time Rate" },
  { number: "24/7", label: "Customer Support" },
];

const testimonials = [
  { name: "Sarah Wanjiku", role: "E-Commerce Owner, Nairobi", text: "AceField Logistics transformed my e-commerce business. Same-day delivery in Nairobi and next-day across Kenya — my customers love it!" },
  { name: "David Omondi", role: "Logistics Manager, Kampala", text: "The cross-border service between Uganda and Kenya is seamless. Documentation, customs — they handle everything professionally." },
  { name: "Amina Hassan", role: "Manufacturer, Dar es Salaam", text: "Reliable courier service for our manufacturing exports. Their lorry fleet and tracking system give us full visibility every step of the way." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/hero-logistics.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/90 to-primary-light/80" />
        {/* Decorative dots */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-slow" />
                Now serving 5 East African countries
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Delivering <span className="text-accent">Excellence</span><br />
                Across East Africa
              </h1>
              <p className="text-lg text-white/80 mt-6 max-w-lg leading-relaxed">
                Kenya&apos;s most trusted courier partner. From parcels to lorry-based courier services — 
                we move your business forward with speed, reliability, and transparency.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/quote" className="px-8 py-4 bg-secondary text-white font-bold rounded-xl text-lg hover:bg-secondary-light transition-all hover:shadow-xl hover:shadow-secondary/30 active:scale-95">
                  Get a Quote
                </Link>
                <Link href="/track" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl text-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all active:scale-95">
                  Track Package
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xs font-bold">
                      {["SW", "DO", "AH", "JK"][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-white/70">
                  <span className="text-white font-semibold">4,200+</span> satisfied clients
                </div>
              </div>
            </div>

            {/* Quick Track Widget */}
            <div className="animate-fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold mb-4">🔍 Quick Track</h3>
              <form action="/track" method="get">
                <input
                  type="text"
                  name="id"
                  placeholder="Enter tracking ID (e.g. AF-20250101-ABCD)"
                  className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <button type="submit" className="w-full mt-3 px-6 py-3.5 bg-accent text-primary-dark font-bold rounded-xl hover:bg-accent-light transition-all active:scale-95">
                  Track Shipment
                </button>
              </form>
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center py-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold">📦</div>
                  <div className="text-xs text-white/60 mt-1">Parcels</div>
                </div>
                <div className="text-center py-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold">🚛</div>
                  <div className="text-xs text-white/60 mt-1">Courier</div>
                </div>
                <div className="text-center py-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold">🌍</div>
                  <div className="text-xs text-white/60 mt-1">Cross-Border</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-3xl lg:text-4xl font-black text-primary">{stat.number}</div>
                <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full text-sm text-primary font-semibold mb-4">
              Our Services
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Comprehensive Logistics Solutions
            </h2>
            <p className="text-text-secondary mt-4 leading-relaxed">
              From same-day parcels in Nairobi to cross-border courier services across East Africa — we have the perfect solution for every consignment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group p-8 bg-surface rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">{svc.title}</h3>
                <p className="text-text-secondary mt-2 leading-relaxed text-sm">{svc.desc}</p>
                <div className="mt-4 text-primary font-semibold text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full text-sm text-secondary font-semibold mb-4">
                Coverage Area
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Serving All of <span className="text-gradient">East Africa</span>
              </h2>
               <p className="text-text-secondary mt-4 leading-relaxed">
                Our extensive network spans seven countries with 40+ hubs, ensuring your shipments reach every corner of the region.
              </p>
              <div className="space-y-4 mt-8 max-h-[400px] overflow-y-auto pr-2">
                {[
                  { flag: "🇰🇪", country: "Kenya", cities: "Nairobi, Mombasa, Kisumu, Eldoret, Nakuru" },
                  { flag: "🇺🇬", country: "Uganda", cities: "Kampala, Entebbe, Jinja, Mbarara" },
                  { flag: "🇹🇿", country: "Tanzania", cities: "Dar es Salaam, Arusha, Dodoma, Mwanza" },
                  { flag: "🇷🇼", country: "Rwanda", cities: "Kigali, Butare, Gisenyi" },
                  { flag: "🇧🇮", country: "Burundi", cities: "Bujumbura, Gitega" },
                  { flag: "🇨🇩", country: "DR Congo", cities: "Goma, Bukavu, Lubumbashi" },
                  { flag: "🇸🇸", country: "South Sudan", cities: "Juba, Malakal, Wau" },
                ].map((c) => (
                  <div key={c.country} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <div className="font-semibold text-text-primary">{c.country}</div>
                      <div className="text-sm text-text-secondary">{c.cities}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/coverage" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all">
                View Full Coverage Map
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* Map SVG */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl flex items-center justify-center p-8">
                <svg viewBox="0 0 400 500" className="w-full max-w-md" fill="none">
                  {/* Simplified East Africa Map */}
                  <path d="M120 80 L200 50 L280 80 L300 150 L320 200 L280 260 L260 320 L240 380 L200 420 L160 400 L140 340 L100 280 L80 200 L100 140 Z" fill="#0A2463" fillOpacity="0.1" stroke="#0A2463" strokeWidth="2"/>
                  {/* Kenya */}
                  <ellipse cx="220" cy="200" rx="50" ry="45" fill="#0A2463" fillOpacity="0.15" stroke="#0A2463" strokeWidth="1.5"/>
                  {/* Uganda */}
                  <ellipse cx="160" cy="160" rx="35" ry="30" fill="#1B8A4E" fillOpacity="0.15" stroke="#1B8A4E" strokeWidth="1.5"/>
                  {/* Tanzania */}
                  <ellipse cx="230" cy="300" rx="45" ry="50" fill="#0A2463" fillOpacity="0.1" stroke="#0A2463" strokeWidth="1.5"/>
                  {/* Rwanda */}
                  <ellipse cx="150" cy="220" rx="20" ry="18" fill="#1B8A4E" fillOpacity="0.2" stroke="#1B8A4E" strokeWidth="1.5"/>
                  {/* Burundi */}
                  <ellipse cx="155" cy="260" rx="18" ry="16" fill="#F4A900" fillOpacity="0.2" stroke="#F4A900" strokeWidth="1.5"/>
                  
                  {/* Cities */}
                  <circle cx="220" cy="190" r="6" fill="#0A2463"/>
                  <text x="230" y="185" fontSize="11" fill="#0A2463" fontWeight="bold">Nairobi</text>
                  <circle cx="160" cy="155" r="5" fill="#1B8A4E"/>
                  <text x="170" y="150" fontSize="10" fill="#1B8A4E" fontWeight="bold">Kampala</text>
                  <circle cx="250" cy="290" r="5" fill="#0A2463"/>
                  <text x="260" y="285" fontSize="10" fill="#0A2463" fontWeight="bold">Dar es Salaam</text>
                  <circle cx="150" cy="218" r="4" fill="#1B8A4E"/>
                  <text x="110" y="213" fontSize="9" fill="#1B8A4E" fontWeight="bold">Kigali</text>
                  <circle cx="155" cy="258" r="4" fill="#F4A900"/>
                  <text x="105" y="253" fontSize="9" fill="#F4A900" fontWeight="bold">Bujumbura</text>
                  <circle cx="260" cy="180" r="4" fill="#0A2463"/>
                  <text x="268" y="175" fontSize="9" fill="#0A2463">Mombasa</text>

                  {/* Routes */}
                  <line x1="220" y1="190" x2="160" y2="155" stroke="#1B8A4E" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
                  <line x1="220" y1="190" x2="250" y2="290" stroke="#0A2463" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
                  <line x1="220" y1="190" x2="150" y2="218" stroke="#1B8A4E" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
                  <line x1="150" y1="218" x2="155" y2="258" stroke="#F4A900" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
                </svg>
                {/* Animated ping at Nairobi */}
                <div className="absolute top-[38%] left-[55%] w-3 h-3">
                  <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-75" />
                  <div className="absolute inset-0 bg-secondary rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-sm text-accent font-semibold mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 bg-surface rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full text-sm text-primary font-semibold mb-4">
              How It Works
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">Ship in 3 Easy Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Request a Quote", desc: "Tell us what you're shipping, where it's going, and when. Get instant pricing.", icon: "📋" },
              { step: "02", title: "We Pick Up", desc: "Schedule a pickup or drop off at our nearest hub. We handle the rest.", icon: "🚚" },
              { step: "03", title: "Track & Receive", desc: "Track your shipment in real-time until it's safely delivered.", icon: "✅" },
            ].map((item) => (
              <div key={item.step} className="text-center p-8">
                <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">{item.icon}</div>
                <div className="text-sm font-bold text-secondary mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
