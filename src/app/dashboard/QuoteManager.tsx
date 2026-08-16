"use client";

import { useState } from "react";
import { waLink, invoiceText } from "@/lib/whatsapp";
import { countryName } from "@/lib/locations";

type Quote = {
  id: number;
  name: string;
  email: string;
  phone: string;
  originCity: string;
  destCity: string;
  weightKg: string;
  serviceType: string;
  estimatedPrice: string | null;
  message: string | null;
  status: "new" | "discussed" | "invoiced" | "closed";
  finalPrice: string | null;
  paymentDetails: string | null;
  invoiceNumber: string | null;
  createdAt: Date | string;
  shipmentId?: number;
};

type ShipmentDraft = {
  senderAddress: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  originCountry: string;
  destCountry: string;
  estimatedDelivery?: string;
};

function countryFromCity(city: string): string {
  return countryName(city);
}

const statusLabels: Record<string, string> = {
  new: "New",
  discussed: "Discussed",
  invoiced: "Invoiced",
  closed: "Closed",
};

const statusColors: Record<string, string> = {
  new: "bg-red-100 text-red-700",
  discussed: "bg-blue-100 text-blue-700",
  invoiced: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

export default function QuoteManager({ initialQuotes }: { initialQuotes: Quote[] }) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [invoiceFor, setInvoiceFor] = useState<number | null>(null);
  const [createFor, setCreateFor] = useState<number | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const updateQuote = async (id: number, payload: Record<string, string | null>) => {
    setSavingId(id);
    setError("");
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, ...data.quote } : q)));
      return true;
    } catch {
      setError("Failed to save. Please try again.");
      return false;
    } finally {
      setSavingId(null);
    }
  };

  const setStatus = async (q: Quote, status: Quote["status"]) => {
    if (await updateQuote(q.id, { status })) {
      setInvoiceFor(null);
    }
  };

  const saveInvoice = async (q: Quote, finalPrice: string, paymentDetails: string, invoiceNumber: string) => {
    if (await updateQuote(q.id, {
      finalPrice,
      paymentDetails,
      invoiceNumber,
      status: "invoiced",
    })) {
      setInvoiceFor(null);
    }
  };

  const createShipment = async (q: Quote, form: ShipmentDraft) => {
    setSavingId(q.id);
    setError("");
    try {
      const res = await fetch(`/api/quotes/${q.id}/shipment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create shipment");
      setQuotes((prev) => prev.map((item) => (item.id === q.id ? { ...item, status: "closed", shipmentId: data.shipment.id } : item)));
      setCreateFor(null);
      return data.shipment;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create shipment");
      return null;
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold">Quote Requests — WhatsApp Flow</h2>
        <span className="text-xs text-text-muted">Discuss on WhatsApp, then send invoice</span>
      </div>

      {quotes.length === 0 ? (
        <div className="p-8 text-center text-text-muted">No quotes yet.</div>
      ) : (
        <div className="divide-y divide-gray-50">
          {quotes.map((q) => {
            const replyLink = waLink(q.phone, `Hi ${q.name}, regarding your AceField quote (${q.originCity} → ${q.destCity}, ${q.weightKg} kg, ${q.serviceType}):`);

            return (
              <div key={q.id} className="p-4 sm:p-6 hover:bg-surface/50 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{q.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[q.status]}`}>
                        {statusLabels[q.status]}
                      </span>
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {q.originCity} → {q.destCity} • {q.weightKg} kg • {q.serviceType} • {new Date(q.createdAt).toLocaleString("en-KE")}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      {q.phone} • {q.email}
                    </div>
                    {q.message && <div className="text-xs text-text-secondary mt-1 italic">&ldquo;{q.message}&rdquo;</div>}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">
                      KES {Number(q.finalPrice ?? q.estimatedPrice ?? 0).toLocaleString()}
                    </div>
                    {q.finalPrice && q.invoiceNumber && (
                      <div className="text-xs text-text-muted font-mono">{q.invoiceNumber}</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <a
                    href={replyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    💬 Discuss on WhatsApp
                  </a>
                  <button
                    onClick={() => setStatus(q, "discussed")}
                    disabled={savingId === q.id}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                  >
                    Mark Discussed
                  </button>
                  <button
                    onClick={() => setInvoiceFor(invoiceFor === q.id ? null : q.id)}
                    className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-light transition-colors"
                  >
                    {invoiceFor === q.id ? "Cancel" : "Create Invoice"}
                  </button>
                  <button
                    onClick={() => setCreateFor(createFor === q.id ? null : q.id)}
                    className="px-3 py-1.5 bg-secondary text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-colors"
                  >
                    {createFor === q.id ? "Cancel" : "Confirm Payment → Create Tracking"}
                  </button>
                  <button
                    onClick={() => setStatus(q, "closed")}
                    disabled={savingId === q.id}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    Close
                  </button>
                </div>

                {invoiceFor === q.id && (
                  <InvoiceForm
                    quote={q}
                    saving={savingId === q.id}
                    onSave={saveInvoice}
                  />
                )}

                {createFor === q.id && (
                  <ShipmentForm
                    quote={q}
                    saving={savingId === q.id}
                    onCreate={createShipment}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border-t border-red-100 text-red-700 text-sm">{error}</div>
      )}
    </div>
  );
}

function InvoiceForm({
  quote,
  saving,
  onSave,
}: {
  quote: Quote;
  saving: boolean;
  onSave: (q: Quote, finalPrice: string, paymentDetails: string, invoiceNumber: string) => void;
}) {
  const [draft, setDraft] = useState({
    finalPrice: quote.finalPrice ?? String(Number(quote.estimatedPrice ?? 0)),
    invoiceNumber: quote.invoiceNumber ?? `AF-INV-${String(quote.id).padStart(3, "0")}`,
    paymentDetails:
      quote.paymentDetails ??
      `M-Pesa Paybill: 123456\nAccount: ${quote.name.replace(/\s+/g, "")}\nBank: KCB 1234567890 (AceField Logistics)`,
  });

  const updateDraft = (field: keyof typeof draft, value: string) => setDraft({ ...draft, [field]: value });

  const invoiceLink = waLink(quote.phone, invoiceText({ ...quote, ...draft }));

  return (
    <div className="mt-4 p-4 bg-surface rounded-xl border border-gray-100 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Invoice Number</label>
          <input
            value={draft.invoiceNumber}
            onChange={(e) => updateDraft("invoiceNumber", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Final Price (KES)</label>
          <input
            type="number"
            min="0"
            value={draft.finalPrice}
            onChange={(e) => updateDraft("finalPrice", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1">Payment Details</label>
        <textarea
          rows={3}
          value={draft.paymentDetails}
          onChange={(e) => updateDraft("paymentDetails", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <a
          href={invoiceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Send Invoice via WhatsApp
        </a>
        <button
          onClick={() => onSave(quote, draft.finalPrice, draft.paymentDetails, draft.invoiceNumber)}
          disabled={saving}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Invoice"}
        </button>
      </div>
    </div>
  );
}

function ShipmentForm({
  quote,
  saving,
  onCreate,
}: {
  quote: Quote;
  saving: boolean;
  onCreate: (q: Quote, form: ShipmentDraft) => Promise<{ id: number; trackingId: string } | null>;
}) {
  const [draft, setDraft] = useState<ShipmentDraft>({
    senderAddress: quote.message || "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    originCountry: countryFromCity(quote.originCity),
    destCountry: countryFromCity(quote.destCity),
    estimatedDelivery: "",
  });
  const [created, setCreated] = useState<{ id: number; trackingId: string } | null>(null);

  const updateDraft = (field: keyof ShipmentDraft, value: string) => setDraft({ ...draft, [field]: value });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const shipment = await onCreate(quote, draft);
    if (shipment) setCreated(shipment);
  };

  if (created) {
    const trackUrl = `${window.location.origin}/track?id=${created.trackingId}`;
    const notifyLink = waLink(
      quote.phone,
      [
        "*PAYMENT CONFIRMED — AceField Logistics*",
        `Hello ${quote.name}, your payment has been confirmed and your tracking order is ready.`,
        "",
        `Tracking ID: ${created.trackingId}`,
        `Route: ${quote.originCity} → ${quote.destCity}`,
        `Service: ${quote.serviceType}`,
        "",
        `Track your shipment: ${trackUrl}`,
      ].join("\n")
    );

    return (
      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 space-y-3">
        <div className="text-sm font-bold text-green-800">✅ Tracking order created!</div>
        <div className="font-mono text-lg font-black text-primary">{created.trackingId}</div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`/track?id=${created.trackingId}`}
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
          >
            View Tracking Page
          </a>
          <a
            href={notifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Notify Customer via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleCreate} className="mt-4 p-4 bg-surface rounded-xl border border-gray-100 space-y-3">
      <div className="text-xs font-semibold text-text-primary uppercase tracking-wide">
        Payment confirmed — create tracking order
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-text-primary mb-1">Sender Address *</label>
          <input
            required
            value={draft.senderAddress}
            onChange={(e) => updateDraft("senderAddress", e.target.value)}
            placeholder="e.g. Westlands, Nairobi"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Recipient Name *</label>
          <input
            required
            value={draft.recipientName}
            onChange={(e) => updateDraft("recipientName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Recipient Phone *</label>
          <input
            required
            value={draft.recipientPhone}
            onChange={(e) => updateDraft("recipientPhone", e.target.value)}
            placeholder="+254 7XX XXX XXX"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-text-primary mb-1">Recipient Address *</label>
          <input
            required
            value={draft.recipientAddress}
            onChange={(e) => updateDraft("recipientAddress", e.target.value)}
            placeholder="e.g. Kisumu CBD, near Impala Park"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Origin Country</label>
          <input
            value={draft.originCountry}
            onChange={(e) => updateDraft("originCountry", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Destination Country</label>
          <input
            value={draft.destCountry}
            onChange={(e) => updateDraft("destCountry", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Estimated Delivery (optional)</label>
          <input
            type="date"
            value={draft.estimatedDelivery}
            onChange={(e) => updateDraft("estimatedDelivery", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
      >
        {saving ? "Creating..." : "Confirm Payment & Create Shipment"}
      </button>
    </form>
  );
}
