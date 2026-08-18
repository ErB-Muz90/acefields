import { NextResponse } from "next/server";
import { db } from "@/db";
import { shipments, trackingEvents, blogPosts } from "@/db/schema";

export async function POST() {
  try {
    // Seed sample shipments
    const sampleShipments = [
      {
        trackingId: "AF-20250115-A1B2",
        senderName: "John Kamau",
        senderPhone: "+254711111111",
        senderAddress: "Westlands, Nairobi",
        recipientName: "Grace Atieno",
        recipientPhone: "+254722222222",
        recipientAddress: "Kisumu CBD",
        originCity: "Nairobi",
        originCountry: "Kenya",
        destCity: "Kisumu",
        destCountry: "Kenya",
        weightKg: "5.00",
        serviceType: "express",
        status: "in_transit" as const,
        estimatedDelivery: new Date("2025-01-17"),
      },
      {
        trackingId: "AF-20250114-C3D4",
        senderName: "AceField Warehouse",
        senderPhone: "+254725306678",
        senderAddress: "Mombasa Road, Industrial Area",
        recipientName: "David Omondi",
        recipientPhone: "+256733333333",
        recipientAddress: "Kampala, Uganda",
        originCity: "Nairobi",
        originCountry: "Kenya",
        destCity: "Kampala",
        destCountry: "Uganda",
        weightKg: "25.00",
        serviceType: "courier",
        status: "at_hub" as const,
        estimatedDelivery: new Date("2025-01-20"),
      },
      {
        trackingId: "AF-20250113-E5F6",
        senderName: "Amina Hassan",
        senderPhone: "+255744444444",
        senderAddress: "Dar es Salaam, Tanzania",
        recipientName: "Mary Njeri",
        recipientPhone: "+254755555555",
        recipientAddress: "Karen, Nairobi",
        originCity: "Dar es Salaam",
        originCountry: "Tanzania",
        destCity: "Nairobi",
        destCountry: "Kenya",
        weightKg: "12.50",
        serviceType: "standard",
        status: "delivered" as const,
        estimatedDelivery: new Date("2025-01-16"),
        actualDelivery: new Date("2025-01-15"),
      },
    ];

    const insertedShipments = await db.insert(shipments).values(sampleShipments).returning();

    // Seed tracking events
    const events = [];
    for (const s of insertedShipments) {
      events.push({
        shipmentId: s.id,
        status: "pending" as const,
        location: s.originCity,
        description: "Shipment created and pending pickup",
        timestamp: new Date(new Date(s.createdAt).getTime() - 86400000 * 3),
      });
      events.push({
        shipmentId: s.id,
        status: "picked_up" as const,
        location: s.originCity,
        description: `Package picked up from ${s.senderAddress}`,
        timestamp: new Date(new Date(s.createdAt).getTime() - 86400000 * 2),
      });
      if (s.status !== "pending") {
        events.push({
          shipmentId: s.id,
          status: "in_transit" as const,
          location: `${s.originCity} Hub`,
          description: `Shipment departed ${s.originCity} hub en route to ${s.destCity}`,
          timestamp: new Date(new Date(s.createdAt).getTime() - 86400000),
        });
      }
      if (s.status === "at_hub" || s.status === "delivered") {
        events.push({
          shipmentId: s.id,
          status: "at_hub" as const,
          location: `${s.destCity} Hub`,
          description: `Arrived at ${s.destCity} sorting hub`,
          timestamp: new Date(new Date(s.createdAt).getTime() - 43200000),
        });
      }
      if (s.status === "delivered") {
        events.push({
          shipmentId: s.id,
          status: "out_for_delivery" as const,
          location: s.destCity,
          description: "Out for delivery to recipient",
          timestamp: new Date(new Date(s.createdAt).getTime() - 21600000),
        });
        events.push({
          shipmentId: s.id,
          status: "delivered" as const,
          location: s.recipientAddress,
          description: `Delivered to ${s.recipientName}. Signed by recipient.`,
          timestamp: s.actualDelivery || new Date(),
        });
      }
    }

    await db.insert(trackingEvents).values(events);

    // Seed blog posts
    await db.insert(blogPosts).values([
      {
        slug: "cross-border-shipping-guide-east-africa",
        title: "The Complete Guide to Cross-Border Shipping in East Africa",
        excerpt: "Everything you need to know about shipping goods between Kenya, Uganda, Tanzania, Rwanda, and Burundi.",
        content: "Full article content here...",
        author: "James Mwangi",
        published: true,
      },
      {
        slug: "ecommerce-logistics-kenya-2025",
        title: "E-Commerce Logistics in Kenya: Trends for 2025",
        excerpt: "How e-commerce is reshaping last-mile delivery in Kenya.",
        content: "Full article content here...",
        author: "Grace Atieno",
        published: true,
      },
    ]);

    return NextResponse.json({ success: true, shipments: insertedShipments.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
