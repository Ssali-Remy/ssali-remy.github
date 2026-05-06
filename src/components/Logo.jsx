export default function Logo({ stacked = false, className = "" }) {
  return (
    <div
      className={`flex ${stacked ? "flex-col items-center gap-1" : "items-center gap-3"} ${className}`}
    >
      <svg
        viewBox="0 0 80 80"
        className={stacked ? "h-14 w-14" : "h-10 w-10"}
        aria-hidden="true"
      >
        <defs>
          <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="3"
            />
            <feDisplacementMap in="SourceGraphic" scale="1.2" />
          </filter>
        </defs>
        <g filter="url(#rough)">
          <path
            d="M14 44 L40 16 L66 44"
            fill="none"
            stroke="#5B1A1A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="22"
            y="40"
            width="36"
            height="28"
            rx="2"
            fill="#D4C5B0"
            stroke="#5B1A1A"
            strokeWidth="3"
          />
          <rect x="36" y="50" width="8" height="18" fill="#5B1A1A" />
          <ellipse cx="46" cy="44" rx="9" ry="13" fill="#C9BAA5" opacity="0.7" />
        </g>
      </svg>
      <span
        className={`font-sketch text-brand-maroon ${stacked ? "text-3xl" : "text-2xl"} leading-none`}
      >
        Elyon Nest
      </span>
    </div>
  );
}
