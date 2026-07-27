/* Static partner logos, presented as a row of uniform rounded cards.
 *
 * Each logo is an SVG whose viewBox matches the real mark's aspect ratio.
 * The card gives it a fixed square well with padding; the SVG fills that
 * well with the default preserveAspectRatio ("xMidYMid meet"), so every
 * logo scales to FIT — never stretched, never cropped — and wide marks
 * simply sit shorter than tall ones, exactly as on a real partner wall.
 *
 * To swap in original image files: drop them in public/images/partners/
 * and replace each component with <img className="max-h-full max-w-full" />. */

function AllureLogo(props) {
  // Near-square mark: broken circle around a stacked wordmark.
  return (
    <svg viewBox="0 0 200 165" role="img" aria-label="Allure Aesthetics" {...props}>
      <g fill="none" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round">
        <path d="M34.2 58.1 A70 70 0 1 1 123.9 147.8" />
        <path d="M76.1 147.8 A70 70 0 0 1 31.1 94.2" />
      </g>
      <text
        x="100" y="88" textAnchor="middle"
        fontFamily="'Comic Sans MS','Trebuchet MS',cursive"
        fontSize="30" fontWeight="800" letterSpacing="4" fill="#161616"
      >
        ALLuRE
      </text>
      <text
        x="100" y="108" textAnchor="middle"
        fontFamily="Inter,system-ui,sans-serif"
        fontSize="9.5" letterSpacing="5" fill="#2B2B2B"
      >
        AESTHETICS
      </text>
      <text
        x="100" y="126" textAnchor="middle"
        fontFamily="Inter,system-ui,sans-serif"
        fontSize="6.5" fontWeight="700" letterSpacing="2" fill="#2B2B2B"
      >
        DESIGN YOUR DREAM SPACE
      </text>
    </svg>
  );
}

function BusinessAdvantageLogo(props) {
  // Wide mark: interlocking diamonds beside a two-line red wordmark.
  return (
    <svg viewBox="0 0 230 76" role="img" aria-label="Business Advantage" {...props}>
      <g transform="translate(6,12)">
        <path d="M14 0h12l8 8-8 8h-12l-8-8z" fill="#E62E2E" />
        <path d="M34 14h12l8 8-8 8H34l-8-8z" fill="#2C6E8F" />
        <path d="M14 28h12l8 8-8 8H14l-8-8z" fill="#2C6E8F" />
        <path d="M0 14h12l8 8-8 8H0l8-8z" fill="#E62E2E" opacity="0.85" />
        <circle cx="27" cy="22" r="5" fill="#fff" />
      </g>
      <text x="72" y="36" fontFamily="Arial,Helvetica,sans-serif" fontSize="23" fontWeight="800" fill="#E62E2E">
        BUSINESS
      </text>
      <text x="72" y="62" fontFamily="Arial,Helvetica,sans-serif" fontSize="23" fontWeight="800" fill="#E62E2E">
        ADVANTAGE
      </text>
    </svg>
  );
}

function WegaLogo(props) {
  // Wide mark: mortar-and-leaf glyph beside the wordmark and script tagline.
  return (
    <svg viewBox="0 0 260 104" role="img" aria-label="Wega Pharmacy" {...props}>
      <g fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 14h20v10" />
        <path d="M14 24h38q4 0 4 5v6q0 5-4 5H14q-4 0-4-5v-6q0-5 4-5z" />
        <path d="M18 42q-8 16 4 26q14 8 26-2" />
        <path d="M30 56q10-2 16 6" />
      </g>
      <text x="70" y="48" fontFamily="'Arial Black',Arial,sans-serif" fontSize="30" fontWeight="900" fontStyle="italic" fill="#111">
        WEGA
      </text>
      <text x="162" y="48" fontFamily="Arial,Helvetica,sans-serif" fontSize="17" fontWeight="900" fill="#111">
        PHARMACY
      </text>
      <text x="165" y="72" textAnchor="middle" fontFamily="'Brush Script MT','Segoe Script',cursive" fontSize="14" fill="#111">
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
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
      {PARTNERS.map(({ name, Logo }) => (
        <div
          key={name}
          title={name}
          className="h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-3xl bg-white shadow-soft flex items-center justify-center p-4 sm:p-5"
        >
          <Logo className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
