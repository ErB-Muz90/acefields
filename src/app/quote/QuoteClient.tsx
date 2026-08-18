"use client";

import { useEffect, useState } from "react";
import { waLink, adminWhatsApp, quoteDetailsText } from "@/lib/whatsapp";
import { cities, countries, countryName, type CountryCode } from "@/lib/locations";
import { serviceTypes, type EstimateResult, type ServiceType } from "@/lib/pricing";

const citiesByCountry = Object.keys(countries).map((code) => ({
  code: code as CountryCode,
  label: `${countries[code as CountryCode].flag} ${countries[code as CountryCode].name}`,
  list: cities.filter((c) => c.country === code).map((c) => c.name),
}));

function fallbackEstimate(weight: number, origin: string, dest: string, service: string): number {
  const originCountry = countryName(origin);
  const destCountry = countryName(dest);
  const sameCountry = originCountry === destCountry;
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
    weightKg: "5", length: "", width: "", height: "",
    serviceType: "standard", message: "",
  });
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [estimating, setEstimating] = useState(true);
  const [estimateError, setEstimateError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setEstimating(true);
      setEstimateError(false);
      const params = new URLSearchParams({
        origin: form.originCity,
        dest: form.destCity,
        weight: form.weightKg,
        service: form.serviceType,
      });
      if (form.length) params.set("length", form.length);
      if (form.width) params.set("width", form.width);
      if (form.height) params.set("height", form.height);
      try {
        const res = await fetch(`/api/quotes/estimate?${params}`);
        if (!res.ok) throw new Error("Estimate failed");
        const data = (await res.json()) as { estimate: EstimateResult };
        setEstimate(data.estimate);
      } catch {
        setEstimateError(true);
        setEstimate(null);
      } finally {
        setEstimating(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [form.originCity, form.destCity, form.weightKg, form.length, form.width, form.height, form.serviceType]);

  const estimatedPrice =
    estimate?.total ??
    (estimateError
      ? fallbackEstimate(parseFloat(form.weightKg) || 0, form.originCity, form.destCity, form.serviceType)
      : 0);

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
            Calculate your courier cost instantly — including cross-border rates across East Africa and beyond.
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
                    {citiesByCountry.map((group) => (
                      <optgroup key={group.code} label={group.label}>
                        {group.list.map((c) => <option key={c} value={c}>{c}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Destination City *</label>
                  <select value={form.destCity} onChange={(e) => updateField("destCity", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white">
                    {citiesByCountry.map((group) => (
                      <optgroup key={group.code} label={group.label}>
                        {group.list.map((c) => <option key={c} value={c}>{c}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Weight (kg) *</label>
                  <input type="number" min="0.1" step="0.1" required value={form.weightKg} onChange={(e) => updateField("weightKg", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Length (cm) <span className="font-normal text-text-muted">optional</span></label>
                  <input type="number" min="1" step="1" value={form.length} onChange={(e) => updateField("length", e.target.value)} placeholder="e.g. 40"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Width</label>
                    <input type="number" min="1" step="1" value={form.width} onChange={(e) => updateField("width", e.target.value)} placeholder="cm"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Height</label>
                    <input type="number" min="1" step="1" value={form.height} onChange={(e) => updateField("height", e.target.value)} placeholder="cm"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Service Type *</label>
                <select value={form.serviceType} onChange={(e) => updateField("serviceType", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white">
                  {serviceTypes.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Additional Notes</label>
                <textarea rows={3} value={form.message} onChange={(e) => updateField("message", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none" />
              </div>
              <button type="submit" disabled={loading || estimating}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl text-lg hover:bg-primary-light transition-all disabled:opacity-50 active:scale-[0.98]">
                {loading ? "Submitting..." : "Submit Quote Request"}
              </button>
            </form>

            {/* Price Calculator */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="p-8 bg-surface rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">💰 Estimated Cost</h3>
                  {estimating && <span className="text-xs text-text-muted animate-pulse">Calculating…</span>}
                </div>
                <div className="text-4xl font-black text-primary">
                  {estimating ? (
                    <span className="inline-block w-40 h-10 bg-gray-200 animate-pulse rounded-lg align-middle" />
                  ) : (
                    `${estimate?.currency ?? "KES"} ${estimatedPrice.toLocaleString()}`
                  )}
                </div>

                {estimate && !estimating && estimate.source === "carrier" && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    ✅ Live carrier rates · {estimate.carrierName}
                  </div>
                )}

                {estimate && (
                  <div className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${estimate.crossBorder ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
                    {estimate.crossBorder ? `🌍 Cross-Border · ${estimate.originCountry} → ${estimate.destCountry}` : "🏠 Domestic Delivery"}
                  </div>
                )}

                <p className="text-sm text-text-muted mt-2">
                  {estimate ? (
                    <>Estimated delivery: <span className="font-semibold text-text-primary">{estimate.deliveryDaysMin === 0 ? "Same day" : `${estimate.deliveryDaysMin}–${estimate.deliveryDaysMax} days`}</span> · {estimate.chargedWeightKg} kg charged</>
                  ) : (
                    "*Final price may vary based on dimensions and specific requirements."
                  )}
                </p>

                <p className="text-xs text-text-muted mt-3 leading-relaxed">
                  ⚠️ Transit times depend on road conditions and the routes taken — some deliveries may take longer than 5 days.
                </p>

                {estimate?.crossBorder && estimate.source === "engine" && (
                  <div className="mt-4 p-3 bg-secondary/5 rounded-xl text-xs text-text-secondary">
                    Includes border clearance &amp; customs handling fee of{" "}
                    <span className="font-bold text-secondary">KES {estimate.borderFee.toLocaleString()}</span>. Duties and taxes may apply separately.
                  </div>
                )}

                {estimate?.crossBorder && estimate.source === "carrier" && (
                  <div className="mt-4 p-3 bg-secondary/5 rounded-xl text-xs text-text-secondary">
                    Live quote from {estimate.carrierName}. Duties, taxes and customs clearance charges may apply separately.
                  </div>
                )}

                {estimate && estimate.volumetricWeightKg > estimate.actualWeightKg && (
                  <div className="mt-3 p-3 bg-accent/5 rounded-xl text-xs text-text-secondary">
                    📦 Volumetric weight {estimate.volumetricWeightKg} kg applies (dimensions ÷ 5000), exceeding actual {estimate.actualWeightKg} kg.
                  </div>
                )}

                {estimate && (
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Route</span>
                      <span className="font-semibold">{form.originCity} → {form.destCity}</span>
                    </div>
                    {estimate.source === "carrier" ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Carrier rate ({estimate.carrierName})</span>
                          <span className="font-semibold">{estimate.currency} {estimate.total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Charged weight</span>
                          <span className="font-semibold">{estimate.chargedWeightKg} kg</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Base rate</span>
                          <span className="font-semibold">KES {estimate.baseRate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Weight charge ({estimate.chargedWeightKg} kg)</span>
                          <span className="font-semibold">KES {estimate.weightCharge.toLocaleString()}</span>
                        </div>
                        {estimate.borderFee > 0 && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Border fee</span>
                            <span className="font-semibold">KES {estimate.borderFee.toLocaleString()}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Service</span>
                      <span className="font-semibold">{serviceTypes.find((s) => s.value === form.serviceType)?.label}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
