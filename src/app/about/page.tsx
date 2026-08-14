import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about AceField Logistics — Kenya's premier logistics company serving East Africa since 2015.",
};

const leadership = [
  { name: "James Mwangi", role: "CEO & Founder", bio: "20+ years in logistics and supply chain across East Africa." },
  { name: "Grace Atieno", role: "COO", bio: "Operations expert who built our cross-border network from the ground up." },
  { name: "Hassan Ali", role: "CTO", bio: "Tech visionary driving our real-time tracking and digital transformation." },
  { name: "Mary Njeri", role: "Head of Sales", bio: "Building partnerships with 500+ businesses across the region." },
];

const milestones = [
  { year: "2015", event: "Founded in Nairobi with 3 vehicles and a vision" },
  { year: "2017", event: "Expanded to Mombasa and Kisumu, fleet grew to 30 vehicles" },
  { year: "2018", event: "Launched cross-border service to Uganda and Tanzania" },
  { year: "2020", event: "Opened Rwanda and Burundi routes, digital tracking launched" },
  { year: "2022", event: "Reached 25,000 deliveries milestone, 100+ team members" },
  { year: "2024", event: "Launched warehousing services and M-Pesa payment integration" },
  { year: "2025", event: "50,000+ deliveries completed, 5 countries, 30+ hubs" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-hero text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/about-team.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 to-primary/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black">About AceField Logistics</h1>
          <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Building East Africa&apos;s most reliable logistics network — one delivery at a time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full text-sm text-primary font-semibold mb-4">Our Story</div>
              <h2 className="text-3xl lg:text-4xl font-bold">From a Small Nairobi Startup to East Africa&apos;s Trusted Partner</h2>
              <p className="text-text-secondary mt-6 leading-relaxed">
                AceField Logistics was born in 2015 from a simple frustration: getting packages delivered reliably across Kenya shouldn&apos;t be this hard. Our founder, James Mwangi, started with three trucks and a commitment to on-time delivery.
              </p>
              <p className="text-text-secondary mt-4 leading-relaxed">
                Today, we operate across five East African countries with over 100 dedicated team members, 80+ vehicles, and a technology-driven approach that gives our clients full visibility into every shipment.
              </p>
              <p className="text-text-secondary mt-4 leading-relaxed">
                We&apos;re not just a logistics company — we&apos;re an enabler of commerce, connecting businesses and communities across borders.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/about-team.jpg" alt="AceField Logistics Team" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-3xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
              <p className="text-text-secondary mt-4 leading-relaxed">
                To provide affordable, reliable, and technology-driven logistics solutions that empower businesses and individuals across East Africa to move goods seamlessly.
              </p>
            </div>
            <div className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-3xl mb-6">🌟</div>
              <h3 className="text-2xl font-bold text-secondary">Our Vision</h3>
              <p className="text-text-secondary mt-4 leading-relaxed">
                To be East Africa&apos;s most trusted logistics network — connecting every business, every city, and every community with world-class delivery infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⏱️", title: "Reliability", desc: "99.2% on-time delivery rate — we keep our promises." },
              { icon: "🔍", title: "Transparency", desc: "Real-time tracking and honest communication at every step." },
              { icon: "🤝", title: "Partnership", desc: "We succeed when our clients succeed. Your growth is ours." },
              { icon: "🚀", title: "Innovation", desc: "Leveraging technology to make logistics smarter and faster." },
            ].map((v) => (
              <div key={v.title} className="text-center p-8 rounded-2xl hover:bg-surface transition-colors">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((l) => (
              <div key={l.name} className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                  {l.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="text-lg font-bold">{l.name}</h3>
                <div className="text-sm text-secondary font-semibold">{l.role}</div>
                <p className="text-sm text-text-secondary mt-3">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-primary/20" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 z-10 relative">
                    {m.year.slice(2)}
                  </div>
                  <div className="pb-4">
                    <div className="text-sm font-bold text-primary">{m.year}</div>
                    <p className="text-text-secondary mt-1">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
