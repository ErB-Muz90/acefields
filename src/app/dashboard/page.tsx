import type { Metadata } from "next";
import { db } from "@/db";
import { shipments, quotes, contacts } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import Link from "next/link";
import QuoteManager from "./QuoteManager";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AceField Logistics Admin Dashboard — manage shipments, quotes, and contacts.",
};

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  pending: "Pending",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  at_hub: "At Hub",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  picked_up: "bg-blue-100 text-blue-700",
  in_transit: "bg-indigo-100 text-indigo-700",
  at_hub: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function DashboardPage() {
  let recentShipments: (typeof shipments.$inferSelect)[] = [];
  let recentQuotes: (typeof quotes.$inferSelect)[] = [];
  let recentContacts: (typeof contacts.$inferSelect)[] = [];
  let totalShipments = 0;
  let totalQuotes = 0;
  let totalContacts = 0;

  try {
    recentShipments = await db.select().from(shipments).orderBy(desc(shipments.createdAt)).limit(10);
    recentQuotes = await db.select().from(quotes).orderBy(desc(quotes.createdAt)).limit(20);
    recentContacts = await db.select().from(contacts).orderBy(desc(contacts.createdAt)).limit(5);

    const [sc] = await db.select({ count: sql<number>`count(*)` }).from(shipments);
    const [qc] = await db.select({ count: sql<number>`count(*)` }).from(quotes);
    const [cc] = await db.select({ count: sql<number>`count(*)` }).from(contacts);
    totalShipments = Number(sc.count);
    totalQuotes = Number(qc.count);
    totalContacts = Number(cc.count);
  } catch {
    // tables may not exist yet
  }

  return (
    <>
      <section className="bg-gradient-hero text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-black">Admin Dashboard</h1>
          <p className="text-white/70 mt-2">Manage shipments, quotes, and contacts.</p>
        </div>
      </section>

      <section className="py-8 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-sm text-text-muted">Total Shipments</div>
              <div className="text-3xl font-black text-primary mt-1">{totalShipments}</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-sm text-text-muted">Quote Requests</div>
              <div className="text-3xl font-black text-secondary mt-1">{totalQuotes}</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-sm text-text-muted">Contact Messages</div>
              <div className="text-3xl font-black text-accent mt-1">{totalContacts}</div>
            </div>
          </div>

          {/* Seed button */}
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-semibold text-yellow-800">Demo Data</div>
              <div className="text-sm text-yellow-700">Seed sample shipments for testing the tracking system.</div>
            </div>
            <form action="/api/seed" method="POST">
              <button type="submit" className="px-4 py-2 bg-yellow-600 text-white text-sm font-semibold rounded-lg hover:bg-yellow-700 transition-colors">
                Seed Data
              </button>
            </form>
          </div>

          {/* Shipments Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">Recent Shipments</h2>
            </div>
            {recentShipments.length === 0 ? (
              <div className="p-8 text-center text-text-muted">
                No shipments yet. Use the seed button above to create sample data.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-surface text-text-muted text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 text-left">Tracking ID</th>
                      <th className="px-6 py-3 text-left">Route</th>
                      <th className="px-6 py-3 text-left">Recipient</th>
                      <th className="px-6 py-3 text-left">Service</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentShipments.map((s) => (
                      <tr key={s.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4">
                          <Link href={`/track?id=${s.trackingId}`} className="font-mono font-semibold text-primary hover:underline">
                            {s.trackingId}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">{s.originCity} → {s.destCity}</td>
                        <td className="px-6 py-4 text-text-secondary">{s.recipientName}</td>
                        <td className="px-6 py-4 text-text-secondary capitalize">{s.serviceType}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[s.status] || "bg-gray-100"}`}>
                            {statusLabels[s.status] || s.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text-muted">{new Date(s.createdAt).toLocaleDateString("en-KE")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quotes — WhatsApp flow */}
          <div className="mb-8">
            <QuoteManager initialQuotes={recentQuotes} />
          </div>

          {/* Contacts */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">Recent Messages</h2>
            </div>
              {recentContacts.length === 0 ? (
                <div className="p-8 text-center text-text-muted">No messages yet.</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentContacts.map((c) => (
                    <div key={c.id} className="p-4 hover:bg-surface/50 transition-colors">
                      <div className="font-semibold text-sm">{c.name}</div>
                      <div className="text-xs text-text-muted">{c.subject}</div>
                      <div className="text-xs text-text-secondary mt-1 line-clamp-2">{c.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
      </section>
    </>
  );
}
