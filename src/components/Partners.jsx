/* Static partner logos. These are vector recreations of the real brand
 * marks; to use the original image files instead, drop them in
 * public/images/partners/ and swap the components for <img> tags. */

function AllureLogo() {
  return (
    <svg viewBox="0 0 260 150" className="h-12 w-auto" role="img" aria-label="Allure Aesthetics">
      <path d="M60 18 A92 66 0 0 1 228 42" fill="none" stroke="#1F1F1F" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M204 132 A92 66 0 0 1 34 106" fill="none" stroke="#1F1F1F" strokeWidth="1.6" strokeLinecap="round" />
      <text x="130" y="78" textAnchor="middle" fontFamily="'Comic Sans MS','Trebuchet MS',cursive" fontSize="36" fontWeight="800" fill="#161616" letterSpacing="6">
        ALLuRE
      </text>
      <text x="130" y="100" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="11" letterSpacing="6" fill="#2B2B2B">
        AESTHETICS
      </text>
      <text x="130" y="120" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="2.6" fill="#2B2B2B">
        DESIGN YOUR DREAM SPACE
      </text>
    </svg>
  );
}

function BusinessAdvantageLogo() {
  return (
    <svg viewBox="0 0 250 72" className="h-8 w-auto" role="img" aria-label="Business Advantage">
      <g transform="translate(6,8)">
        <path d="M14 0h12l8 8-8 8h-12l-8-8z" fill="#E62E2E" />
        <path d="M34 14h12l8 8-8 8H34l-8-8z" fill="#2C6E8F" />
        <path d="M14 28h12l8 8-8 8H14l-8-8z" fill="#2C6E8F" />
        <path d="M0 14h12l8 8-8 8H0l8-8z" fill="#E62E2E" opacity="0.85" />
        <circle cx="27" cy="22" r="5" fill="#fff" />
      </g>
      <text x="72" y="34" fontFamily="Arial,Helvetica,sans-serif" fontSize="24" fontWeight="800" fill="#E62E2E" letterSpacing="0.5">
        BUSINESS
      </text>
      <text x="72" y="60" fontFamily="Arial,Helvetica,sans-serif" fontSize="24" fontWeight="800" fill="#E62E2E" letterSpacing="0.5">
        ADVANTAGE
      </text>
    </svg>
  );
}

function WegaLogo() {
  return (
    <svg viewBox="0 0 300 84" className="h-8 w-auto" role="img" aria-label="Wega Pharmacy">
      <g fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 14h20v10" />
        <path d="M14 24h38q4 0 4 5v6q0 5-4 5H14q-4 0-4-5v-6q0-5 4-5z" />
        <path d="M18 40q-8 14 4 24q14 8 26-2" />
        <path d="M30 52q10-2 16 6" />
      </g>
      <text x="66" y="40" fontFamily="Arial Black,Arial,sans-serif" fontSize="30" fontWeight="900" fill="#111" fontStyle="italic">
        WEGA
      </text>
      <text x="160" y="40" fontFamily="Arial,Helvetica,sans-serif" fontSize="17" fontWeight="900" fill="#111">
        PHARMACY
      </text>
      <text x="150" y="62" fontFamily="'Brush Script MT','Segoe Script',cursive" fontSize="15" fill="#111">
        &ldquo;Live Healthy Live Happy&rdquo;
      </text>
    </svg>
  );
}

const PARTNERS = [
  { name: "Allure Aesthetics", Logo: AllureLogo },
  { name: "Business Advantage", Logo: BusinessAdvantageLogo },
  { name: "Wega Pharmacy", Logo: WegaLogo },
];

export default function Partners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
      {PARTNERS.map(({ name, Logo }) => (
        <div
          key={name}
          title={name}
          className="flex items-center justify-center bg-white rounded-2xl p-5 shadow-soft min-h-[80px]"
        >
          <Logo />
        </div>
      ))}
    </div>
  );
}
