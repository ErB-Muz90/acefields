import { countryOf, countries } from "./locations";
import { computeChargeableWeight, type EstimateInput, type EstimateResult } from "./pricing";

const API_URL = process.env.NETWORLDWIDE_API_URL || "https://app.skynetworldwide.co.ke/api/v1";
const API_KEY = process.env.NETWORLDWIDE_API_KEY;
const SANDBOX = process.env.NETWORLDWIDE_SANDBOX === "true";
const TIMEOUT_MS = 6000;
const CACHE_TTL_MS = 10 * 60 * 1000;

type NetWorldwideQuote = {
  serviceType: string;
  price: number;
  total: number;
  currency: string;
  minTransitDays: number;
  maxTransitDays: number;
};

const SERVICE_MAP: Partial<Record<string, string>> = {
  standard: "STANDARD",
  express: "EXPRESS",
  freight: "FREIGHT",
};

const cache = new Map<string, { expiresAt: number; estimate: EstimateResult | null }>();

export function carrierConfigured(): boolean {
  return Boolean(API_KEY);
}

function cacheKey(input: EstimateInput): string {
  return [input.origin, input.dest, computeChargeableWeight(input), input.service].join("|");
}

function pickQuote(quotes: NetWorldwideQuote[], service: string): NetWorldwideQuote | null {
  if (quotes.length === 0) return null;
  const exact = quotes.find((q) => q.serviceType.toUpperCase() === SERVICE_MAP[service]);
  if (exact) return exact;

  const sorted = [...quotes].sort((a, b) => {
    if (service === "express" || service === "same_day") return (a.minTransitDays ?? 99) - (b.minTransitDays ?? 99);
    return a.total - b.total;
  });
  return sorted[0];
}

export async function fetchCarrierEstimate(input: EstimateInput): Promise<EstimateResult | null> {
  if (!carrierConfigured()) return null;

  const key = cacheKey(input);
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.estimate;

  const originCountry = countryOf(input.origin);
  const destCountry = countryOf(input.dest);
  if (!originCountry || !destCountry) return null;

  const chargedWeight = computeChargeableWeight(input);
  const payload: Record<string, string | number> = {
    originCountry,
    destCountry,
    weight: chargedWeight,
  };
  const mappedService = SERVICE_MAP[input.service];
  if (mappedService) payload.serviceType = mappedService;

  let result: EstimateResult | null = null;
  try {
    const res = await fetchWithTimeout(`${API_URL}/rates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        ...(SANDBOX ? { "X-Sandbox": "true" } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const body = (await res.json()) as { quotes?: NetWorldwideQuote[]; currency?: string; expiresAt?: string };
      const quote = pickQuote(body.quotes ?? [], input.service);
      if (quote) {
        const sameCountry = originCountry === destCountry;
        result = {
          total: quote.total ?? quote.price,
          baseRate: 0,
          weightCharge: 0,
          borderFee: 0,
          currency: quote.currency || body.currency || "KES",
          crossBorder: !sameCountry,
          sameCountry,
          originCountry: countries[originCountry].name,
          originCountryCode: originCountry,
          destCountry: countries[destCountry].name,
          destCountryCode: destCountry,
          actualWeightKg: actualKg(input),
          volumetricWeightKg: volumetricKg(input),
          chargedWeightKg: chargedWeight,
          deliveryDaysMin: quote.minTransitDays ?? 1,
          deliveryDaysMax: quote.maxTransitDays ?? 5,
          source: "carrier",
          carrierName: "Net Worldwide",
          carrierServiceType: quote.serviceType,
          rateExpiresAt: body.expiresAt,
        };
      }
    }
  } catch {
    result = null;
  }

  cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, estimate: result });
  return result;
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function actualKg(input: EstimateInput): number {
  return Math.round(Math.max(0, input.weightKg) * 100) / 100;
}

function volumetricKg(input: EstimateInput): number {
  if (!input.lengthCm || !input.widthCm || !input.heightCm) return 0;
  return Math.round((input.lengthCm * input.widthCm * input.heightCm) / 5000 * 100) / 100;
}