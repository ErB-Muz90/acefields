import { countryOf, countries } from "./locations";

export const serviceTypes = [
  { value: "standard", label: "Standard (3-5 days)", multiplier: 1 },
  { value: "express", label: "Express (1-2 days)", multiplier: 1.8 },
  { value: "same_day", label: "Same-Day", multiplier: 2.5 },
  { value: "freight", label: "Freight/Cargo", multiplier: 0.7 },
] as const;

export type ServiceType = (typeof serviceTypes)[number]["value"];

const VOLUMETRIC_DIVISOR = 5000;

const RATES = {
  base: { sameCity: 150, domestic: 400, eac: 1200, far: 2000 },
  perKg: { domestic: 30, eac: 80, far: 120 },
  borderFee: { domestic: 0, eac: 350, far: 750 },
} as const;

const DELIVERY_WINDOWS: Record<ServiceType, { domestic: [number, number]; eac: [number, number]; far: [number, number] }> = {
  standard: { domestic: [2, 4], eac: [4, 7], far: [7, 12] },
  express: { domestic: [1, 2], eac: [2, 4], far: [4, 7] },
  same_day: { domestic: [0, 1], eac: [2, 4], far: [4, 7] },
  freight: { domestic: [4, 7], eac: [7, 12], far: [12, 18] },
};

export type EstimateInput = {
  origin: string;
  dest: string;
  weightKg: number;
  service: ServiceType;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
};

export type EstimateResult = {
  total: number;
  baseRate: number;
  weightCharge: number;
  borderFee: number;
  currency: string;
  crossBorder: boolean;
  sameCountry: boolean;
  originCountry: string;
  originCountryCode: string;
  destCountry: string;
  destCountryCode: string;
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargedWeightKg: number;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
};

export function estimatePrice(input: EstimateInput): EstimateResult {
  const { origin, dest, service } = input;

  const originCountry = countryOf(origin);
  const destCountry = countryOf(dest);
  if (!originCountry || !destCountry) {
    throw new Error(`Unknown city: ${!originCountry ? origin : dest}`);
  }

  const actualWeight = Math.max(0, input.weightKg);
  const volumetric =
    input.lengthCm && input.widthCm && input.heightCm
      ? (input.lengthCm * input.widthCm * input.heightCm) / VOLUMETRIC_DIVISOR
      : 0;
  const chargedWeight = Math.max(actualWeight, volumetric);

  const sameCity = origin === dest;
  const sameCountry = originCountry === destCountry;
  const crossBorder = !sameCountry;
  const zone = crossBorder ? countries[destCountry].zone : "domestic";
  const mode = sameCity ? "sameCity" : sameCountry ? "domestic" : zone;

  const baseRate = RATES.base[mode];
  const weightRate = RATES.perKg[zone === "domestic" ? "domestic" : zone];
  const borderFee = sameCountry ? 0 : RATES.borderFee[zone];

  const multiplier = serviceTypes.find((s) => s.value === service)?.multiplier ?? 1;
  const weightCharge = chargedWeight * weightRate;
  const total = Math.round((baseRate + weightCharge) * multiplier + borderFee);

  const windowKey = sameCity ? "domestic" : zone === "far" ? "far" : sameCountry ? "domestic" : "eac";
  const [deliveryDaysMin, deliveryDaysMax] = DELIVERY_WINDOWS[service][windowKey];

  return {
    total,
    baseRate,
    weightCharge: Math.round(weightCharge),
    borderFee,
    currency: "KES",
    crossBorder,
    sameCountry,
    originCountry: countries[originCountry].name,
    originCountryCode: originCountry,
    destCountry: countries[destCountry].name,
    destCountryCode: destCountry,
    actualWeightKg: Math.round(actualWeight * 100) / 100,
    volumetricWeightKg: Math.round(volumetric * 100) / 100,
    chargedWeightKg: Math.round(chargedWeight * 100) / 100,
    deliveryDaysMin,
    deliveryDaysMax,
  };
}
