import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/db";
import { quotes, shipments, trackingEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { countryName } from "@/lib/locations";

function generateTrackingId(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = "";
  for (let i = 0; i < 4; i++) r += chars[randomBytes(1)[0] % chars.length];
  return `AF-${ymd}-${r}`;
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const quoteId = Number(id);
    const body = await request.json();

    if (!Number.isInteger(quoteId)) {
      return NextResponse.json({ error: "Invalid quote id" }, { status: 400 });
    }

    const existing = await db.select().from(quotes).where(eq(quotes.id, quoteId));
    if (existing.length === 0) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }
    const quote = existing[0];

    const { senderAddress, recipientName, recipientPhone, recipientAddress, originCountry, destCountry, estimatedDelivery } = body;
    if (!senderAddress || !recipientName || !recipientPhone || !recipientAddress) {
      return NextResponse.json({ error: "Sender address, recipient name, phone and address are required" }, { status: 400 });
    }

    let trackingId = generateTrackingId();
    let shipment = null;
    for (let attempt = 0; attempt < 5 && !shipment; attempt++) {
      if (attempt > 0) trackingId = generateTrackingId();
      try {
        const inserted = await db.insert(shipments).values({
          trackingId,
          senderName: quote.name,
          senderPhone: quote.phone,
          senderAddress,
          recipientName,
          recipientPhone,
          recipientAddress,
          originCity: quote.originCity,
          originCountry: originCountry || countryName(quote.originCity),
          destCity: quote.destCity,
          destCountry: destCountry || countryName(quote.destCity),
          weightKg: String(quote.weightKg),
          serviceType: quote.serviceType,
          status: "pending",
          estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
          priceKes: quote.finalPrice ?? quote.estimatedPrice ?? null,
        }).returning();
        shipment = inserted[0];
      } catch {
        // unique tracking id conflict, retry
      }
    }

    if (!shipment) {
      return NextResponse.json({ error: "Could not generate a unique tracking ID" }, { status: 500 });
    }

    await db.insert(trackingEvents).values({
      shipmentId: shipment.id,
      status: "pending",
      location: quote.originCity,
      description: "Payment confirmed. Shipment created and pending pickup.",
    });

    await db.update(quotes).set({ status: "closed" }).where(eq(quotes.id, quoteId));

    return NextResponse.json({ success: true, shipment });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
