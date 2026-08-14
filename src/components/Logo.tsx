/**
 * AceField Logistics — Professional Logo Component
 *
 * Design rationale:
 *  - The logo-mark is a stylised shield / diamond shape that combines
 *    an upward arrow (growth, speed, forward motion) with a subtle
 *    globe arc (East Africa coverage) — all rendered as crisp SVG paths.
 *  - "Ace" is set in bold Deep Blue, "Field" in green to reinforce
 *    the brand palette, and the tagline sits beneath in muted caps.
 *  - Accepts `variant` (full / mark / wordmark), `size` and
 *    `theme` (light / dark) to adapt across Navbar, Footer, and
 *    favicons without duplicating markup.
 */

type LogoProps = {
  /** "full" = icon + text, "mark" = icon only, "wordmark" = text only */
  variant?: "full" | "mark" | "wordmark";
  /** Tailwind-style size class applied to the icon container */
  size?: "sm" | "md" | "lg";
  /** Light = dark text (for white backgrounds), Dark = white text (for dark backgrounds) */
  theme?: "light" | "dark";
  className?: string;
};

const sizes = {
  sm: { icon: "w-8 h-8", text: "text-lg", tag: "text-[8px]" },
  md: { icon: "w-10 h-10", text: "text-xl", tag: "text-[10px]" },
  lg: { icon: "w-14 h-14", text: "text-2xl", tag: "text-xs" },
};

export default function Logo({
  variant = "full",
  size = "md",
  theme = "light",
  className = "",
}: LogoProps) {
  const s = sizes[size];
  const textPrimary = theme === "light" ? "text-primary" : "text-white";
  const textSecondary = theme === "light" ? "text-secondary" : "text-secondary-light";
  const textMuted = theme === "light" ? "text-text-secondary" : "text-white/50";

  const IconMark = (
    <div
      className={`${s.icon} rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden`}
      style={{
        background: "linear-gradient(135deg, #0A2463 0%, #1338A0 60%, #1B8A4E 100%)",
      }}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[70%] h-[70%]"
      >
        {/* Shield / diamond outline */}
        <path
          d="M24 4L6 14V28C6 36.284 13.716 44 24 44C34.284 44 42 36.284 42 28V14L24 4Z"
          fill="white"
          fillOpacity="0.15"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Upward arrow — symbolising speed & growth */}
        <path
          d="M24 12L16 24H21V34H27V24H32L24 12Z"
          fill="white"
          strokeLinejoin="round"
        />
        {/* Globe arc — representing East Africa reach */}
        <path
          d="M12 30C12 30 18 36 24 36C30 36 36 30 36 30"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {/* Small dot on arc — Nairobi hub */}
        <circle cx="24" cy="36" r="1.8" fill="#F4A900" />
      </svg>
    </div>
  );

  const Wordmark = (
    <div className="flex flex-col leading-tight">
      <div className="flex items-baseline">
        <span className={`${s.text} font-extrabold tracking-tight ${textPrimary}`}>
          Ace
        </span>
        <span className={`${s.text} font-extrabold tracking-tight ${textSecondary}`}>
          Field
        </span>
      </div>
      <span
        className={`${s.tag} ${textMuted} tracking-[0.18em] uppercase font-semibold -mt-0.5`}
      >
        Logistics
      </span>
    </div>
  );

  if (variant === "mark") {
    return <div className={className}>{IconMark}</div>;
  }

  if (variant === "wordmark") {
    return <div className={className}>{Wordmark}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {IconMark}
      {Wordmark}
    </div>
  );
}
