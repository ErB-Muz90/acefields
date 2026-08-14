"use client";

import { useState } from "react";

type TrackingEvent = {
  status: string;
  location: string;
  description: string;
  timestamp: string;
};

type TrackingResult = {
  trackingId: string;
  status: string;
  senderName: string;
  recipientName: string;
  originCity: string;
  destCity: string;
  serviceType: string;
  estimatedDelivery: string | null;
  events: TrackingEvent[];
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-400",
  picked_up: "bg-blue-500",
  in_transit: "bg-indigo-500",
  at_hub: "bg-purple-500",
  out_for_delivery: "bg-orange-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  at_hub: "At Hub",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function TrackingClient() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/track?id=${encodeURIComponent(trackingId.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Shipment not found");
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to track shipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black">Track Your Shipment</h1>
          <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Enter your tracking ID to see real-time status and delivery timeline.
          </p>
          <form onSubmit={handleTrack} className="mt-10 max-w-xl mx-auto flex gap-3">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID (e.g. AF-20250101-ABCD)"
              className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary-light transition-all disabled:opacity-50"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-red-700 font-semibold">{error}</p>
              <p className="text-red-500 text-sm mt-1">Please check the tracking ID and try again.</p>
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Status Card */}
              <div className="p-8 bg-surface rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm text-text-muted">Tracking ID</div>
                    <div className="text-xl font-bold font-mono text-primary">{result.trackingId}</div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${statusColors[result.status] || "bg-gray-400"}`}>
                    {statusLabels[result.status] || result.status}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">From</div>
                    <div className="font-semibold">{result.senderName}</div>
                    <div className="text-sm text-text-secondary">{result.originCity}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">To</div>
                    <div className="font-semibold">{result.recipientName}</div>
                    <div className="text-sm text-text-secondary">{result.destCity}</div>
                  </div>
                </div>
                {result.estimatedDelivery && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-text-muted">Estimated Delivery: </span>
                    <span className="text-sm font-semibold">{new Date(result.estimatedDelivery).toLocaleDateString("en-KE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="p-8 bg-surface rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold mb-6">Tracking Timeline</h3>
                <div className="relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    {result.events.map((ev, i) => (
                      <div key={i} className="flex gap-4 items-start relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 z-10 ${i === 0 ? statusColors[ev.status] || "bg-gray-400" : "bg-gray-300"}`}>
                          {i === 0 ? "●" : "○"}
                        </div>
                        <div className="pb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-text-primary text-sm">{statusLabels[ev.status] || ev.status}</span>
                            {ev.location && <span className="text-xs text-text-muted">• {ev.location}</span>}
                          </div>
                          <p className="text-sm text-text-secondary mt-0.5">{ev.description}</p>
                          <div className="text-xs text-text-muted mt-1">
                            {new Date(ev.timestamp).toLocaleString("en-KE")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-text-primary">Enter Your Tracking ID</h3>
              <p className="text-text-secondary mt-2">Your tracking ID was sent via SMS or email when your shipment was created.</p>
              <p className="text-sm text-text-muted mt-4">Format: AF-YYYYMMDD-XXXX</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
