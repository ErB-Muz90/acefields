import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const quoteId = Number(id);

    if (!Number.isInteger(quoteId)) {
      return NextResponse.json({ error: "Invalid quote id" }, { status: 400 });
    }

    const existing = await db.select().from(quotes).where(eq(quotes.id, quoteId));
    if (existing.length === 0) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const updates: Partial<typeof quotes.$inferInsert> = {};
    if (body.status) updates.status = body.status;
    if (body.finalPrice !== undefined) updates.finalPrice = body.finalPrice === "" ? null : String(body.finalPrice);
    if (body.paymentDetails !== undefined) updates.paymentDetails = body.paymentDetails === "" ? null : body.paymentDetails;
    if (body.invoiceNumber !== undefined) updates.invoiceNumber = body.invoiceNumber === "" ? null : body.invoiceNumber;

    const [updated] = await db.update(quotes).set(updates).where(eq(quotes.id, quoteId)).returning();
    return NextResponse.json({ success: true, quote: updated });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
