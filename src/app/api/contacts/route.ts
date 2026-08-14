import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(contacts).values({
      name,
      email,
      phone: phone || null,
      subject,
      message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
