export type CountryCode = "KE" | "UG" | "TZ" | "RW" | "BI" | "SS" | "CD";

export type CountryZone = "eac" | "far";

export const countries: Record<CountryCode, { name: string; flag: string; zone: CountryZone }> = {
  KE: { name: "Kenya", flag: "🇰🇪", zone: "eac" },
  UG: { name: "Uganda", flag: "🇺🇬", zone: "eac" },
  TZ: { name: "Tanzania", flag: "🇹🇿", zone: "eac" },
  RW: { name: "Rwanda", flag: "🇷🇼", zone: "eac" },
  BI: { name: "Burundi", flag: "🇧🇮", zone: "eac" },
  SS: { name: "South Sudan", flag: "🇸🇸", zone: "far" },
  CD: { name: "DR Congo", flag: "🇨🇩", zone: "far" },
};

export const cities: { name: string; country: CountryCode }[] = [
  { name: "Nairobi", country: "KE" },
  { name: "Mombasa", country: "KE" },
  { name: "Kisumu", country: "KE" },
  { name: "Eldoret", country: "KE" },
  { name: "Nakuru", country: "KE" },
  { name: "Thika", country: "KE" },
  { name: "Nanyuki", country: "KE" },
  { name: "Malindi", country: "KE" },
  { name: "Kampala", country: "UG" },
  { name: "Entebbe", country: "UG" },
  { name: "Jinja", country: "UG" },
  { name: "Mbarara", country: "UG" },
  { name: "Gulu", country: "UG" },
  { name: "Dar es Salaam", country: "TZ" },
  { name: "Arusha", country: "TZ" },
  { name: "Dodoma", country: "TZ" },
  { name: "Mwanza", country: "TZ" },
  { name: "Tanga", country: "TZ" },
  { name: "Kigali", country: "RW" },
  { name: "Butare", country: "RW" },
  { name: "Gisenyi", country: "RW" },
  { name: "Bujumbura", country: "BI" },
  { name: "Gitega", country: "BI" },
  { name: "Goma", country: "CD" },
  { name: "Bukavu", country: "CD" },
  { name: "Lubumbashi", country: "CD" },
  { name: "Kinshasa", country: "CD" },
  { name: "Juba", country: "SS" },
  { name: "Malakal", country: "SS" },
  { name: "Wau", country: "SS" },
];

const cityIndex = new Map<string, CountryCode>();
for (const c of cities) cityIndex.set(c.name.toLowerCase(), c.country);

export function countryOf(city: string | null | undefined): CountryCode | null {
  if (!city) return null;
  return cityIndex.get(city.trim().toLowerCase()) ?? null;
}

export function countryName(city: string | null | undefined): string {
  const code = countryOf(city);
  return code ? countries[code].name : "Unknown";
}
