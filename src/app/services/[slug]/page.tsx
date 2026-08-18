import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const servicesData: Record<string, {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: { title: string; desc: string }[];
  pricing: string;
}> = {
  "parcel-delivery": {
    icon: "📦",
    title: "Parcel Delivery",
    tagline: "Door-to-door across East Africa",
    description: "Our parcel delivery service offers reliable, tracked shipping for packages of all sizes. Whether you're sending a small envelope or a large box, we ensure safe and timely delivery with real-time tracking and proof of delivery.",
    features: [
      { title: "Real-Time Tracking", desc: "Track your parcel from pickup to delivery with GPS-enabled tracking and instant notifications." },
      { title: "Proof of Delivery", desc: "Digital signature capture and photo confirmation when your parcel is delivered." },
      { title: "Insurance Coverage", desc: "Optional insurance up to KES 500,000 for high-value items." },
      { title: "Flexible Pickup", desc: "Schedule pickup at your door or drop off at any of our 30+ hubs." },
    ],
    pricing: "From KES 200 for local, KES 500 for intercity",
  },
  "courier-services": {
    icon: "🚛",
    title: "Courier Services",
    tagline: "Lorry-based courier for bulk & heavy loads",
    description: "Our courier service moves bulk goods, business consignments, and heavy shipments by road using our lorry fleet. From full truckloads to partial loads, we handle the heavy lifting so you can focus on business. Transit times depend on road conditions and the route taken — some deliveries may take longer than 5 days.",
    features: [
      { title: "Full & Partial Loads", desc: "FTL and LTL options to optimize your courier costs." },
      { title: "Lorry Courier Network", desc: "Dedicated lorries moving large and heavy consignments across East Africa." },
      { title: "Customs Support", desc: "Full documentation and clearance assistance for cross-border courier services." },
      { title: "Fleet Management", desc: "Dedicated vehicles and drivers for recurring courier needs." },
    ],
    pricing: "Custom pricing based on volume and route",
  },
  "same-day-delivery": {
    icon: "⚡",
    title: "Same-Day Delivery",
    tagline: "Urgent? We've got you covered",
    description: "When time is critical, our same-day delivery service guarantees your package arrives within hours. Perfect for urgent documents, e-commerce orders, and time-sensitive materials.",
    features: [
      { title: "Guaranteed Same-Day", desc: "Order by 10AM in Nairobi and receive by 6PM — guaranteed or money back." },
      { title: "2-Hour Rush", desc: "Ultra-fast delivery within Nairobi CBD and surrounding areas." },
      { title: "Live Tracking", desc: "Watch your courier in real-time on our tracking platform." },
      { title: "E-Commerce Ready", desc: "API integration for online stores needing fast fulfillment." },
    ],
    pricing: "From KES 350 within Nairobi",
  },
  "cross-border": {
    icon: "🌍",
    title: "Cross-Border Logistics",
    tagline: "Seamless courier services across 5 countries",
    description: "Navigate the complexities of cross-border courier services within East Africa. We handle customs, documentation, and regulatory compliance so your goods move freely across borders. Transit times vary depending on road conditions and the routes taken.",
    features: [
      { title: "5-Country Network", desc: "Kenya, Uganda, Tanzania, Rwanda, and Burundi with established routes." },
      { title: "Customs Clearance", desc: "Expert team handling all border documentation and compliance." },
      { title: "Bonded Transit", desc: "Bonded warehousing at key border points for seamless transit." },
      { title: "Door-to-Door International", desc: "Complete pickup to delivery service across borders." },
    ],
    pricing: "Route-specific pricing available on request",
  },
  "warehousing": {
    icon: "🏭",
    title: "Warehousing & Fulfillment",
    tagline: "Your inventory, our responsibility",
    description: "Store, manage, and ship your products from our modern warehouse in Nairobi's Industrial Area. Ideal for e-commerce businesses and companies needing flexible storage and fulfillment solutions.",
    features: [
      { title: "Secure Storage", desc: "24/7 CCTV monitored, climate-controlled warehouse space." },
      { title: "Inventory Management", desc: "Real-time inventory tracking with our cloud-based WMS." },
      { title: "Pick, Pack & Ship", desc: "We handle order fulfillment — from picking to packing to shipping." },
      { title: "API Integration", desc: "Connect your Shopify, WooCommerce, or custom store directly." },
    ],
    pricing: "From KES 50 per sqft/month",
  },
};

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const svc = servicesData[slug];
  if (!svc) return {};
  return {
    title: svc.title,
    description: svc.description.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const svc = servicesData[slug];
  if (!svc) notFound();

  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">{svc.icon}</div>
          <h1 className="text-4xl lg:text-5xl font-black">{svc.title}</h1>
          <p className="text-xl text-white/70 mt-4">{svc.tagline}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-text-secondary leading-relaxed">{svc.description}</p>

          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {svc.features.map((f) => (
              <div key={f.title} className="p-6 bg-surface rounded-2xl border border-gray-100">
                <h3 className="font-bold text-text-primary flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <h3 className="text-xl font-bold text-primary">Pricing</h3>
            <p className="text-text-secondary mt-2">{svc.pricing}</p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/quote" className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all">
                Get a Quote
              </Link>
              <Link href="/contact" className="px-8 py-3 border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
