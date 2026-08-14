import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coverage Area",
  description: "AceField Logistics operates across Kenya, Uganda, Tanzania, Rwanda, Burundi, DR Congo, and South Sudan with 40+ hubs.",
};

const countries = [
  {
    flag: "🇰🇪", name: "Kenya", capital: "Nairobi", color: "bg-primary",
    hubs: ["Nairobi (HQ)", "Mombasa (HQ)", "Kisumu", "Eldoret", "Nakuru", "Thika", "Nanyuki", "Malindi"],
    desc: "Our home base with the most comprehensive coverage. Same-day delivery in Nairobi, next-day to all major towns.",
  },
  {
    flag: "🇺🇬", name: "Uganda", capital: "Kampala", color: "bg-secondary",
    hubs: ["Kampala", "Entebbe", "Jinja", "Mbarara", "Gulu"],
    desc: "Strong network centered on Kampala with direct routes from Nairobi via Busia and Malaba borders.",
  },
  {
    flag: "🇹🇿", name: "Tanzania", capital: "Dar es Salaam", color: "bg-primary",
    hubs: ["Dar es Salaam", "Arusha", "Dodoma", "Mwanza", "Tanga"],
    desc: "Comprehensive Tanzanian network with routes via Namanga and Horohoro borders.",
  },
  {
    flag: "🇷🇼", name: "Rwanda", capital: "Kigali", color: "bg-secondary",
    hubs: ["Kigali", "Butare", "Gisenyi"],
    desc: "Growing presence in Rwanda with hub in Kigali serving the entire country.",
  },
  {
    flag: "🇧🇮", name: "Burundi", capital: "Bujumbura", color: "bg-accent",
    hubs: ["Bujumbura", "Gitega"],
    desc: "Serving Burundi via Kigali-Bujumbura corridor for cross-border trade.",
  },
  {
    flag: "🇨🇩", name: "DR Congo", capital: "Kinshasa", color: "bg-primary",
    hubs: ["Goma", "Bukavu", "Lubumbashi", "Kinshasa"],
    desc: "Expanding into Eastern DRC with hubs in Goma and Bukavu, connecting to the Great Lakes region.",
  },
  {
    flag: "🇸🇸", name: "South Sudan", capital: "Juba", color: "bg-secondary",
    hubs: ["Juba", "Malakal", "Wau"],
    desc: "Serving South Sudan via Uganda corridor with hub in Juba for humanitarian and commercial logistics.",
  },
];

export default function CoveragePage() {
  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black">Coverage Area</h1>
          <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Our extensive network spans 7 countries with 40+ hubs across East & Central Africa.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { num: "7", label: "Countries" },
              { num: "40+", label: "Hubs" },
              { num: "100+", label: "Vehicles" },
              { num: "300+", label: "Routes" },
            ].map((s) => (
              <div key={s.label} className="text-center p-6 bg-surface rounded-2xl">
                <div className="text-3xl font-black text-primary">{s.num}</div>
                <div className="text-sm text-text-secondary mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Map + Countries */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl flex items-center justify-center p-8 sticky top-28">
                <svg viewBox="0 0 400 550" className="w-full max-w-md" fill="none">
                  <path d="M100 60 L200 30 L300 60 L330 140 L350 220 L320 300 L300 380 L260 450 L200 500 L140 470 L100 390 L60 300 L50 200 L70 120 Z" fill="#0A2463" fillOpacity="0.08" stroke="#0A2463" strokeWidth="2"/>
                  {/* Kenya */}
                  <ellipse cx="220" cy="220" rx="50" ry="45" fill="#0A2463" fillOpacity="0.12" stroke="#0A2463" strokeWidth="1.5"/>
                  {/* Uganda */}
                  <ellipse cx="160" cy="180" rx="35" ry="30" fill="#1B8A4E" fillOpacity="0.12" stroke="#1B8A4E" strokeWidth="1.5"/>
                  {/* Tanzania */}
                  <ellipse cx="230" cy="320" rx="45" ry="50" fill="#0A2463" fillOpacity="0.08" stroke="#0A2463" strokeWidth="1.5"/>
                  {/* Rwanda */}
                  <ellipse cx="140" cy="240" rx="20" ry="18" fill="#1B8A4E" fillOpacity="0.15" stroke="#1B8A4E" strokeWidth="1.5"/>
                  {/* Burundi */}
                  <ellipse cx="145" cy="275" rx="18" ry="16" fill="#F4A900" fillOpacity="0.15" stroke="#F4A900" strokeWidth="1.5"/>
                  {/* DRC */}
                  <ellipse cx="90" cy="220" rx="40" ry="55" fill="#0A2463" fillOpacity="0.1" stroke="#0A2463" strokeWidth="1.5"/>
                  {/* South Sudan */}
                  <ellipse cx="150" cy="120" rx="45" ry="35" fill="#1B8A4E" fillOpacity="0.1" stroke="#1B8A4E" strokeWidth="1.5"/>
                  
                  {/* City dots */}
                  {[
                    { cx: 220, cy: 210, r: 6, label: "Nairobi", color: "#0A2463" },
                    { cx: 270, cy: 200, r: 5, label: "Mombasa", color: "#0A2463" },
                    { cx: 190, cy: 195, r: 3, label: "Kisumu", color: "#0A2463" },
                    { cx: 160, cy: 175, r: 5, label: "Kampala", color: "#1B8A4E" },
                    { cx: 250, cy: 310, r: 5, label: "Dar es Salaam", color: "#0A2463" },
                    { cx: 140, cy: 238, r: 4, label: "Kigali", color: "#1B8A4E" },
                    { cx: 145, cy: 273, r: 4, label: "Bujumbura", color: "#F4A900" },
                    { cx: 85, cy: 200, r: 4, label: "Goma", color: "#0A2463" },
                    { cx: 150, cy: 115, r: 5, label: "Juba", color: "#1B8A4E" },
                  ].map((city) => (
                    <g key={city.label}>
                      <circle cx={city.cx} cy={city.cy} r={city.r} fill={city.color} />
                      <text x={city.cx + city.r + 4} y={city.cy + 4} fontSize="8" fill={city.color} fontWeight="600">{city.label}</text>
                    </g>
                  ))}

                  {/* Route lines */}
                  <line x1="220" y1="210" x2="160" y2="175" stroke="#1B8A4E" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                  <line x1="220" y1="210" x2="250" y2="310" stroke="#0A2463" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                  <line x1="220" y1="210" x2="270" y2="200" stroke="#0A2463" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                  <line x1="220" y1="210" x2="140" y2="238" stroke="#1B8A4E" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                  <line x1="140" y1="238" x2="145" y2="273" stroke="#F4A900" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                  <line x1="160" y1="175" x2="140" y2="238" stroke="#1B8A4E" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                  <line x1="140" y1="238" x2="85" y2="200" stroke="#0A2463" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                  <line x1="160" y1="175" x2="150" y2="115" stroke="#1B8A4E" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
                </svg>
              </div>
            </div>

            <div className="space-y-6">
              {countries.map((c) => (
                <div key={c.name} className="p-6 bg-surface rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{c.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold">{c.name}</h3>
                      <span className="text-sm text-text-muted">Capital: {c.capital}</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
                  <div className="mt-4">
                    <div className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-2">Hub Locations</div>
                    <div className="flex flex-wrap gap-2">
                      {c.hubs.map((h) => (
                        <span key={h} className={`px-3 py-1 ${c.color}/10 text-xs font-semibold rounded-full border border-current/10`}>
                          📍 {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
