import { useState } from "react";

const PALETTES = [
  ["#5B1A1A", "#8B5A3C"],
  ["#8B5A3C", "#D4C5B0"],
  ["#7A2424", "#E8DDD0"],
  ["#5B1A1A", "#D4C5B0"],
  ["#8B5A3C", "#5B1A1A"],
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function SmartImage({
  src,
  alt = "",
  className = "",
  fallbackLabel,
}) {
  const [errored, setErrored] = useState(false);
  if (!errored && src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        onError={() => setErrored(true)}
      />
    );
  }
  const key = src || alt || fallbackLabel || "x";
  const [a, b] = PALETTES[hash(key) % PALETTES.length];
  const initials = (fallbackLabel || alt || "Elyon Nest")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      }}
      aria-label={alt}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full opacity-25"
        preserveAspectRatio="none"
      >
        <path
          d="M0 140 Q50 100 100 140 T200 140 L200 200 L0 200 Z"
          fill="rgba(255,255,255,0.2)"
        />
        <path
          d="M0 160 Q50 120 100 160 T200 160 L200 200 L0 200 Z"
          fill="rgba(255,255,255,0.15)"
        />
      </svg>
      <span className="relative font-display text-4xl text-white/80 tracking-wider">
        {initials}
      </span>
    </div>
  );
}
