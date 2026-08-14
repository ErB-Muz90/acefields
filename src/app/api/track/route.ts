import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { shipments, trackingEvents } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const trackingId = request.nextUrl.searchParams.get("id");
  if (!trackingId) {
    return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 });
  }

  try {
    const [shipment] = await db
      .select()
      .from(shipments)
      .where(eq(shipments.trackingId, trackingId))
      .limit(1);

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    const events = await db
      .select()
      .from(trackingEvents)
      .where(eq(trackingEvents.shipmentId, shipment.id))
      .orderBy(desc(trackingEvents.timestamp));

    return NextResponse.json({
      trackingId: shipment.trackingId,
      status: shipment.status,
      senderName: shipment.senderName,
      recipientName: shipment.recipientName,
      originCity: shipment.originCity,
      destCity: shipment.destCity,
      serviceType: shipment.serviceType,
      estimatedDelivery: shipment.estimatedDelivery,
      events: events.map((e) => ({
        status: e.status,
        location: e.location,
        description: e.description,
        timestamp: e.timestamp,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
