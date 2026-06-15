function AllureLogo() {
  return (
    <svg viewBox="0 0 220 110" className="h-16 w-auto">
      {/* Two arcs forming an open circle */}
      <path
        d="M40 80 A 70 70 0 0 1 180 30"
        fill="none"
        stroke="#1F1F1F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M180 30 A 70 70 0 0 1 40 80"
        fill="none"
        stroke="#1F1F1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
      <text x="110" y="56" textAnchor="middle"
        fontFamily="'Caveat', cursive" fontSize="34" fontWeight="700" fill="#1F1F1F"
        letterSpacing="2">
        ALLURE
      </text>
      <text x="110" y="74" textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif" fontSize="9" letterSpacing="4" fill="#1F1F1F">
        AESTHETICS
      </text>
      <text x="110" y="89" textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif" fontSize="6.5" letterSpacing="1.2" fill="#1F1F1F">
        DESIGN YOUR DREAM SPACE
      </text>
    </svg>
  );
}

function WegaLogo() {
  return (
    <svg viewBox="0 0 220 110" className="h-16 w-auto">
      {/* Mortar & pestle */}
      <path
        d="M82 28 L98 56"
        stroke="#0E5439" strokeWidth="3" strokeLinecap="round"
      />
      <ellipse cx="105" cy="58" rx="32" ry="6" fill="none" stroke="#0E5439" strokeWidth="2.5" />
      <path
        d="M76 58 Q83 78 105 78 Q127 78 134 58"
        fill="none" stroke="#0E5439" strokeWidth="2.5" strokeLinecap="round"
      />
      <circle cx="80" cy="29" r="3.5" fill="#0E5439" />
      <text x="110" y="103" textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#0E5439"
        letterSpacing="0.5">
        WEGA PHARMACY
      </text>
      <text x="110" y="104" textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="6.5" fill="#0E5439" opacity="0">
        Live Healthy, Live Happy
      </text>
    </svg>
  );
}

function BusinessAdvantageLogo() {
  return (
    <svg viewBox="0 0 240 110" className="h-16 w-auto">
      {/* Interlocking arrows mark */}
      <g transform="translate(20,30)">
        <path d="M0 25 L25 0 L50 25 L25 50 Z" fill="#0BBFB5" />
        <path d="M5 30 L30 5 L55 30 L30 55 Z" fill="#E74C3C" opacity="0.92" />
        <path d="M27 12 L27 42 M12 27 L42 27" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text x="92" y="55" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#1F2D3D">
        Business
      </text>
      <text x="92" y="80" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#E74C3C">
        Advantage
      </text>
    </svg>
  );
}

const PARTNERS = [
  { name: "Allure Aesthetics", tag: "Design your dream space", Logo: AllureLogo },
  { name: "Wega Pharmacy", tag: "Live healthy, live happy", Logo: WegaLogo },
  { name: "Business Advantage", tag: "", Logo: BusinessAdvantageLogo },
];

export default function Partners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
      {PARTNERS.map(({ name, tag, Logo }) => (
        <div
          key={name}
          className="flex flex-col items-center text-center gap-3 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-beige/60"
          title={name}
        >
          <Logo />
          {tag && (
            <p className="text-xs text-brand-ink/60 font-medium">{tag}</p>
          )}
        </div>
      ))}
    </div>
  );
}
