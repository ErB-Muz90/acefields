import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, originCity, destCity, weightKg, serviceType, estimatedPrice, message } = body;

    if (!name || !email || !phone || !originCity || !destCity || !weightKg || !serviceType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(quotes).values({
      name,
      email,
      phone,
      originCity,
      destCity,
      weightKg: String(weightKg),
      serviceType,
      estimatedPrice: estimatedPrice ? String(estimatedPrice) : null,
      message: message || null,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
