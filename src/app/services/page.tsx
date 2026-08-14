import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "AceField Logistics offers parcel delivery, freight, same-day delivery, cross-border logistics, and warehousing across East Africa.",
};

const services = [
  {
    icon: "📦", title: "Parcel Delivery", slug: "parcel-delivery",
    desc: "Fast, secure door-to-door parcel delivery across Kenya and East Africa with real-time tracking and proof of delivery.",
    features: ["Door-to-door pickup & delivery", "Real-time GPS tracking", "Proof of delivery (POD)", "Insurance up to KES 500K"],
  },
  {
    icon: "🚛", title: "Freight & Cargo", slug: "freight-cargo",
    desc: "Heavy-duty freight and cargo solutions for businesses — from full truckloads to partial shipments across the region.",
    features: ["Full truckload (FTL) & less-than-truckload (LTL)", "Containerized cargo", "Customs clearance support", "Dedicated fleet management"],
  },
  {
    icon: "⚡", title: "Same-Day Delivery", slug: "same-day-delivery",
    desc: "Urgent delivery within Nairobi and major cities. Order by 10AM, delivered by 6PM — guaranteed.",
    features: ["Same-day guarantee within Nairobi", "Express service to major cities", "2-hour rush delivery option", "Live courier tracking"],
  },
  {
    icon: "🌍", title: "Cross-Border Logistics", slug: "cross-border",
    desc: "Seamless cross-border shipping between Kenya, Uganda, Tanzania, Rwanda & Burundi with customs handling.",
    features: ["Multi-country documentation", "Customs clearance & compliance", "Bonded transit warehousing", "Door-to-door international"],
  },
  {
    icon: "🏭", title: "Warehousing & Fulfillment", slug: "warehousing",
    desc: "Secure, modern warehousing and e-commerce fulfillment services in Nairobi's Industrial Area.",
    features: ["24/7 secured storage", "Inventory management system", "Pick, pack & ship", "E-commerce integration"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black">Our Services</h1>
          <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored for East Africa&apos;s growing economy.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((svc, i) => (
            <div key={svc.slug} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <div className="text-5xl mb-4">{svc.icon}</div>
                <h2 className="text-3xl font-bold">{svc.title}</h2>
                <p className="text-text-secondary mt-4 leading-relaxed">{svc.desc}</p>
                <ul className="mt-6 space-y-3">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                      <svg className="w-5 h-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex gap-4">
                  <Link href={`/services/${svc.slug}`} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all">
                    Learn More
                  </Link>
                  <Link href="/quote" className="px-6 py-3 border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all">
                    Get Quote
                  </Link>
                </div>
              </div>
              <div className={`aspect-video bg-surface rounded-2xl flex items-center justify-center text-8xl ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                {svc.icon}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
