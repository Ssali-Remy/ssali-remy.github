export default function Logo({ stacked = false, className = "" }) {
  return (
    <div
      className={`flex ${stacked ? "flex-col items-center gap-1.5" : "items-center gap-3"} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className={stacked ? "h-16 w-16" : "h-11 w-11"}
        aria-hidden="true"
      >
        <defs>
          <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>
        </defs>
        <g filter="url(#rough)">
          {/* Tan / beige rounded rock shape behind */}
          <path
            d="M52 38 Q66 38 68 56 Q70 75 56 78 Q42 80 38 68 Q34 52 42 44 Q47 38 52 38 Z"
            fill="#C9BAA5"
            opacity="0.95"
          />
          {/* Hand-drawn house outline */}
          <path
            d="M22 52 L50 24 L78 52"
            fill="none"
            stroke="#5B1A1A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 50 L28 84 L72 84 L72 50"
            fill="none"
            stroke="#5B1A1A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Door */}
          <path
            d="M44 62 L44 84 L54 84 L54 62 L44 62"
            fill="#5B1A1A"
            stroke="#5B1A1A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <span
        className={`font-sketch text-brand-maroon ${stacked ? "text-3xl" : "text-2xl"} leading-none tracking-tight`}
      >
        Elyon Nest
      </span>
    </div>
  );
}
