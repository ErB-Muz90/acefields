import { NextRequest, NextResponse } from "next/server";
import { estimatePrice, serviceTypes, type EstimateResult, type ServiceType } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const origin = sp.get("origin") ?? "";
  const dest = sp.get("dest") ?? "";
  const service = sp.get("service") ?? "standard";
  const weight = parseFloat(sp.get("weight") ?? "");
  const length = sp.get("length") ? parseFloat(sp.get("length")!) : undefined;
  const width = sp.get("width") ? parseFloat(sp.get("width")!) : undefined;
  const height = sp.get("height") ? parseFloat(sp.get("height")!) : undefined;

  if (!origin || !dest) {
    return NextResponse.json({ error: "Origin and destination are required" }, { status: 400 });
  }
  if (!isFinite(weight) || weight <= 0 || weight > 50000) {
    return NextResponse.json({ error: "Weight must be a positive number up to 50,000 kg" }, { status: 400 });
  }
  if (!serviceTypes.some((s) => s.value === service)) {
    return NextResponse.json({ error: "Unknown service type" }, { status: 400 });
  }
  for (const dim of [length, width, height]) {
    if (dim !== undefined && (isNaN(dim) || dim <= 0 || dim > 10000)) {
      return NextResponse.json({ error: "Dimensions must be positive numbers up to 10,000 cm" }, { status: 400 });
    }
  }

  try {
    const estimate: EstimateResult = estimatePrice({
      origin,
      dest,
      weightKg: weight,
      service: service as ServiceType,
      lengthCm: length,
      widthCm: width,
      heightCm: height,
    });
    return NextResponse.json({ estimate });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unable to estimate price" }, { status: 400 });
  }
}
