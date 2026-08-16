"use client";

import { useState } from "react";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => setForm({ ...form, [field]: value });

  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black">Contact Us</h1>
          <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            We&apos;re here to help. Reach out via any channel below.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "📞", title: "Mombasa HQ", info: "+254 721 907 730\nPort Area, Mombasa", action: "tel:+254721907730" },
              { icon: "📞", title: "Alternative Contact", info: "+254 725 306 678\nAvailable 24/7", action: "tel:+254725306678" },
              { icon: "✉️", title: "Email Us", info: "info@acefieldlogistics.com\nquote@acefieldlogistics.com", action: "mailto:info@acefieldlogistics.com" },
              { icon: "💬", title: "WhatsApp", info: "+254 725 306 678\nAvailable 24/7", action: "https://wa.me/254725306678" },
            ].map((c) => (
              <a key={c.title} href={c.action} className="p-6 bg-surface rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center">
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-text-primary">{c.title}</h3>
                <p className="text-sm text-text-secondary mt-2 whitespace-pre-line">{c.info}</p>
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="p-8 bg-green-50 rounded-2xl text-center">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="text-xl font-bold text-green-800">Message Sent!</h3>
                  <p className="text-green-700 mt-2">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" required placeholder="Full Name" value={form.name} onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    <input type="email" required placeholder="Email Address" value={form.email} onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  <select value={form.subject} onChange={(e) => updateField("subject", e.target.value)} required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                    <option value="">Select Subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Shipment Issue">Shipment Issue</option>
                    <option value="Quote Request">Quote Request</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Other">Other</option>
                  </select>
                  <textarea rows={5} required placeholder="Your message..." value={form.message} onChange={(e) => updateField("message", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all disabled:opacity-50">
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Locations */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Locations</h2>
              
              {/* Mombasa HQ */}
              <div className="p-6 bg-surface rounded-2xl border border-gray-100 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl shrink-0">⚓</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-accent">Mombasa HQ</h3>
                    <p className="text-text-secondary text-sm mt-1">Port Area<br />Mombasa, Kenya</p>
                    <p className="text-text-primary font-semibold mt-2">📞 +254 721 907 730</p>
                    <p className="text-text-primary font-semibold mt-1">📞 +254 725 306 678</p>
                    <a
                      href="https://maps.google.com/?q=-4.0435,39.6682"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-sm text-primary font-semibold hover:underline"
                    >
                      Open in Google Maps
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-6 bg-surface rounded-2xl border border-gray-100">
                <h3 className="font-bold mb-4">🕐 Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-text-secondary">Monday – Friday</span><span className="font-semibold">8:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Saturday</span><span className="font-semibold">9:00 AM – 1:00 PM</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Sunday</span><span className="font-semibold text-red-500">Closed</span></div>
                  <div className="flex justify-between pt-2 border-t border-gray-200"><span className="text-text-secondary">Customer Support</span><span className="font-semibold text-secondary">24/7</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
