"use client";

import { useState } from "react";
import { waLink, adminWhatsApp, quoteDetailsText } from "@/lib/whatsapp";

const cities = [
  "Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru",
  "Kampala", "Entebbe", "Jinja",
  "Dar es Salaam", "Arusha", "Dodoma",
  "Kigali", "Butare",
  "Bujumbura", "Gitega",
];

const serviceTypes = [
  { value: "standard", label: "Standard (3-5 days)", multiplier: 1 },
  { value: "express", label: "Express (1-2 days)", multiplier: 1.8 },
  { value: "same_day", label: "Same-Day", multiplier: 2.5 },
  { value: "freight", label: "Freight/Cargo", multiplier: 0.7 },
];

function calculatePrice(weight: number, origin: string, dest: string, service: string): number {
  const countryOf = (city: string) => {
    if (["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru"].includes(city)) return "KE";
    if (["Kampala", "Entebbe", "Jinja"].includes(city)) return "UG";
    if (["Dar es Salaam", "Arusha", "Dodoma"].includes(city)) return "TZ";
    if (["Kigali", "Butare"].includes(city)) return "RW";
    return "BI";
  };
  const sameCountry = countryOf(origin) === countryOf(dest);
  const sameCity = origin === dest;
  const baseRate = sameCity ? 150 : sameCountry ? 400 : 1200;
  const weightCharge = weight * (sameCountry ? 30 : 80);
  const mult = serviceTypes.find((s) => s.value === service)?.multiplier || 1;
  return Math.round((baseRate + weightCharge) * mult);
}

export default function QuoteClient() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    originCity: "Nairobi", destCity: "Mombasa",
    weightKg: "5", serviceType: "standard", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const estimatedPrice = calculatePrice(
    parseFloat(form.weightKg) || 0,
    form.originCity,
    form.destCity,
    form.serviceType
  );

  const submittedWhatsAppLink = waLink(
    adminWhatsApp(),
    quoteDetailsText({ ...form, estimatedPrice, weightKg: form.weightKg })
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimatedPrice }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // handle error silently
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => setForm({ ...form, [field]: value });

  if (submitted) {
    return (
      <>
        <section className="bg-gradient-hero text-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-black">Quote Submitted!</h1>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-text-secondary mt-4">
              Your quote request has been received. Our team will contact you within 2 hours with a detailed proposal.
            </p>
            <p className="text-2xl font-bold text-primary mt-4">
              Estimated: KES {estimatedPrice.toLocaleString()}
            </p>
            <a
              href={submittedWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">💬</span>
              Continue on WhatsApp
            </a>
            <p className="text-sm text-text-muted mt-3">
              Send your quote details to our team instantly on WhatsApp for a faster response.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black">Get a Quote</h1>
          <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Calculate your shipping cost instantly. Fill in the details below.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Phone *</label>
                <input type="tel" required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+254 7XX XXX XXX"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Origin City *</label>
                  <select value={form.originCity} onChange={(e) => updateField("originCity", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white">
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Destination City *</label>
                  <select value={form.destCity} onChange={(e) => updateField("destCity", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white">
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Weight (kg) *</label>
                  <input type="number" min="0.1" step="0.1" required value={form.weightKg} onChange={(e) => updateField("weightKg", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Service Type *</label>
                  <select value={form.serviceType} onChange={(e) => updateField("serviceType", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white">
                    {serviceTypes.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Additional Notes</label>
                <textarea rows={3} value={form.message} onChange={(e) => updateField("message", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl text-lg hover:bg-primary-light transition-all disabled:opacity-50 active:scale-[0.98]">
                {loading ? "Submitting..." : "Submit Quote Request"}
              </button>
            </form>

            {/* Price Calculator */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="p-8 bg-surface rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold mb-4">💰 Estimated Cost</h3>
                <div className="text-4xl font-black text-primary">
                  KES {estimatedPrice.toLocaleString()}
                </div>
                <p className="text-sm text-text-muted mt-1">*Final price may vary based on dimensions and specific requirements.</p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Route</span>
                    <span className="font-semibold">{form.originCity} → {form.destCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Weight</span>
                    <span className="font-semibold">{form.weightKg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Service</span>
                    <span className="font-semibold">{serviceTypes.find((s) => s.value === form.serviceType)?.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
