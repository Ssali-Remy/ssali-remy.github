import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import ImageMarquee from "../components/ImageMarquee";
import { units, locationsById } from "../data/units";
import { gallery } from "../data/gallery";
import { reviews } from "../data/reviews";
import { site } from "../data/site";
import { k1Cover, k1Img1, k1Img2, k1Img3, k1Img4 } from "../data/images-k1";
import { k2Cover, k2Img1, k2Img2, k2Img3, k2Img4 } from "../data/images-k2";
import { m3Cover, m3Img1, m3Img2, m3Img3, m3Img4 } from "../data/images-m3";

/* ─────────────────────────────────────────────────────────────
 *  Shared helpers (used by both layouts)
 * ───────────────────────────────────────────────────────────── */

const AMENITIES = [
  { label: "Strong Wi-Fi",            desc: "Fastest in the living room & kitchen" },
  { label: "Air conditioning",        desc: "Installed in every room" },
  { label: "Smart TV",                desc: "Netflix & DStv included" },
  { label: "Power back-up",           desc: "Generator — never lose Wi-Fi or AC" },
  { label: "Fully equipped kitchen",  desc: "Cookware, blender, microwave & fridge" },
  { label: "Housekeeping",            desc: "Up to six days a week" },
  { label: "Free parking",            desc: "On-site — no permit required" },
  { label: "24-hour security",        desc: "Armed at night + CCTV cameras" },
  { label: "Garden & outdoor space",  desc: "Free to enjoy during your stay" },
];

function AmenityGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {AMENITIES.map((a) => (
        <div key={a.label} className="card p-5">
          <p className="text-sm font-semibold text-brand-ink">{a.label}</p>
          <p className="text-xs text-brand-ink/60 mt-1">{a.desc}</p>
        </div>
      ))}
    </div>
  );
}

function H2({ children, className = "" }) {
  return (
    <h2 className={`text-2xl sm:text-3xl font-bold text-brand-ink mb-4 ${className}`}>
      {children}
    </h2>
  );
}

function CallIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 01-6.59-6.58l2.2-2.21c.27-.27.35-.66.24-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
    </svg>
  );
}
function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.78 14.06c-.24.68-1.4 1.3-1.97 1.38-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.83-4.2-4.97-4.4-.15-.2-1.19-1.59-1.19-3.03 0-1.43.75-2.13 1.02-2.43.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.69.52.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.8 1.31 1.72 2.13 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.4-.25.68-.15.27.1 1.74.82 2.03.97.3.15.5.22.58.35.07.13.07.77-.17 1.45z" />
    </svg>
  );
}

function ContactCtaRow({ unitLabel }) {
  const waText = `Hi Suubi, I'd like to enquire about availability at ${unitLabel} — Elyon Nest.`;
  const wa = `https://wa.me/${site.contact.whatsappE164}?text=${encodeURIComponent(waText)}`;
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <a href={`tel:${site.contact.phoneE164}`} className="btn-primary inline-flex items-center gap-2">
        <CallIcon className="h-5 w-5" />
        Call {site.contact.phone}
      </a>
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-medium transition hover:bg-[#1ebd5d]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        WhatsApp host
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  KANSANGA layout — purpose-built per the brief
 * ───────────────────────────────────────────────────────────── */

const KANSANGA_NARRATIVE_1 =
  "A serene fully furnished comfy and spacious apartment with stunning views across the city and surrounding hills, and a garden terrace to sit and enjoy the amazing views, a perfect bolthole in case you need a getaway.";
const KANSANGA_NARRATIVE_2 =
  "With modern styling, great facilities and service, the apartment is well-positioned to enjoy a holiday or get away in a popular area but set away from the busy town center.";

const E1_REEL = [k1Cover, k1Img1, k1Img2, k1Img3, k1Img4];
const E2_REEL = [k2Cover, k2Img1, k2Img2, k2Img3, k2Img4];

const KANSANGA_NEARBY = [
  ["Arena Mall", "Shopping · Nsambya"],
  ["UK Mall",    "Shopping · Gaba Road, Kansanga"],
  ["La Petite Village", "Spa · Restaurants · Swimming · Hotel · Nsambya"],
];

const HOUSE_GUIDE = [
  {
    title: "Entry & Locks",
    items: [
      "Use your personal code to access the home.",
      "Please always lock all doors when leaving the house.",
    ],
  },
  {
    title: "Heating & Cooling",
    items: [
      "All rooms have AC installed in them.",
      "Please always endeavor that all windows are closed while the ACs are running.",
      "Please always turn off the AC when you leave.",
    ],
  },
  {
    title: "TV & Streaming",
    items: [
      "Use the remote to turn on the Smart TV in the living room.",
      "Netflix and DStv are available.",
      "Please don't use your own Netflix, Hulu, or YouTube accounts.",
      "Don't forget to always turn off the TV before leaving the house!",
    ],
  },
  {
    title: "Kitchen & Appliances",
    items: [
      "Kitchen has sufficient cutlery, cooking pots, glasses, cups, blender, microwave, fridge and others.",
    ],
  },
  {
    title: "Laundry",
    items: [
      "Laundry charges may apply.",
      "Always leave your laundry in the baskets.",
      "Laundry is run three days a week by the housekeeper — Mon / Wed / Fri.",
    ],
  },
  {
    title: "Outdoor Space",
    items: [
      "The garden is yours to enjoy!",
      "Quiet hours are 11 PM – 8 AM out of respect for our neighbours.",
    ],
  },
  {
    title: "Other",
    items: [
      "In case of power issues, the home is fitted with power back-up.",
      "Airport transfers and town chauffeur available — charges apply.",
      "Housekeeping six days a week.",
    ],
  },
];

const HOUSE_RULES = [
  ["No Smoking Indoors", "Please do not smoke inside the home. You may smoke outside."],
  ["No Parties or Events", "We love celebrations, but please keep gatherings small and quiet and always inform us in advance."],
  ["Quiet Hours: 11:00 PM – 8:00 AM", "Please be mindful of our neighbours during these hours."],
  ["No Pets", "Pets are not allowed."],
  ["Check-Out by 11:00 AM", "Please leave the keys in the door(s) and ensure the door(s) are locked behind you."],
  ["Respect the Space", "Treat the home with care, and kindly report any damages or issues right away."],
];

function KansangaPage() {
  const [bookMode, setBookMode] = useState("both"); // "e1" | "e2" | "both"
  const idsByMode = {
    e1: ["kansanga-1"],
    e2: ["kansanga-2"],
    both: ["kansanga-1", "kansanga-2"],
  };
  const labelByMode = {
    e1: "Unit One (E1)",
    e2: "Unit Two (E2)",
    both: "Units One & Two together",
  };

  return (
    <div className="container-x py-8 space-y-14">

      {/* Title */}
      <header>
        <span className="pill">Kansanga, Kampala</span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-ink">Kansanga</h1>
      </header>

      {/* Narrative */}
      <section className="max-w-3xl">
        <p className="text-lg leading-relaxed text-brand-ink/85">
          {KANSANGA_NARRATIVE_1}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-brand-ink/85">
          {KANSANGA_NARRATIVE_2}
        </p>
      </section>

      {/* E1 — right-flowing reel */}
      <section>
        <h2 className="text-3xl font-bold text-brand-maroon tracking-[0.3em]">E1</h2>
        <p className="mt-1 text-sm text-brand-ink/60">Wing One of the duplex</p>
        <div className="mt-5">
          <ImageMarquee images={E1_REEL} direction="right" duration={36} />
        </div>
      </section>

      {/* E2 — left-flowing reel */}
      <section>
        <h2 className="text-3xl font-bold text-brand-maroon tracking-[0.3em]">E2</h2>
        <p className="mt-1 text-sm text-brand-ink/60">Wing Two of the duplex</p>
        <div className="mt-5">
          <ImageMarquee images={E2_REEL} direction="left" duration={36} />
        </div>
      </section>

      {/* Amenities */}
      <section>
        <H2>Amenities</H2>
        <AmenityGrid />
      </section>

      {/* Nearby places */}
      <section>
        <H2>Nearby places</H2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KANSANGA_NEARBY.map(([place, where]) => (
            <li key={place} className="card p-5">
              <p className="font-semibold text-brand-ink flex items-center gap-2">
                <span className="text-brand-maroon">📍</span>
                {place}
              </p>
              <p className="mt-1 text-sm text-brand-ink/65">{where}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* House Guide */}
      <section>
        <H2>House guide</H2>
        <p className="text-brand-ink/70 mb-6">
          To help you settle in quickly, here's a quick overview of how things
          work in the house:
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {HOUSE_GUIDE.map((group) => (
            <div key={group.title} className="card p-5">
              <h3 className="font-semibold text-brand-maroon">{group.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-brand-ink/80">
                {group.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-sienna shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* House Rules */}
      <section>
        <H2>House rules</H2>
        <p className="text-brand-ink/70 mb-6">
          We're so happy to host you! To ensure a comfortable stay for everyone,
          please follow these simple house rules:
        </p>
        <ol className="grid gap-4 sm:grid-cols-2 list-none counter-reset:rule">
          {HOUSE_RULES.map(([title, desc], i) => (
            <li key={title} className="card p-5 flex gap-4">
              <span className="font-display text-3xl text-brand-maroon shrink-0 leading-none">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-brand-ink">{title}</p>
                <p className="mt-1 text-sm text-brand-ink/65 leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-brand-ink/65 text-center italic">
          Thank you for understanding and helping us keep the space comfortable for all our guests!
        </p>
      </section>

      {/* Check-in & arrival */}
      <section>
        <H2>Check-in &amp; arrival</H2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Check-in / Check-out</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-ink/80">
              <li>Check-in: After <span className="font-medium text-brand-ink">1:30 PM</span></li>
              <li>Check-out: Till <span className="font-medium text-brand-ink">11:00 AM</span></li>
              <li className="text-brand-ink/65">Feel free to arrive any time after this — the home will be ready for you.</li>
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Parking</h3>
            <p className="mt-3 text-sm text-brand-ink/80">
              Free parking is available — no permit required.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Entry</h3>
            <p className="mt-3 text-sm text-brand-ink/80">
              You'll always find a caretaker to guide you with the access code(s) to your house.
            </p>
            <p className="mt-2 text-sm text-brand-ink/80">
              The front doors use keyless entry — the access code is shared at check-in.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Keys</h3>
            <p className="mt-3 text-sm text-brand-ink/80">
              Please don't move with your house keys — always leave them behind when you check out.
            </p>
          </div>
        </div>
      </section>

      {/* Availability — E1, E2, or both */}
      <section>
        <H2>Availability</H2>
        <p className="text-sm text-brand-ink/60 mb-5">
          Book Unit One on its own, Unit Two on its own, or both wings together.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            ["e1",   "Unit One (E1)"],
            ["e2",   "Unit Two (E2)"],
            ["both", "Both E1 + E2"],
          ].map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setBookMode(mode)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                bookMode === mode
                  ? "bg-brand-maroon text-brand-cream"
                  : "border border-brand-sand bg-white text-brand-ink hover:border-brand-maroon/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <AvailabilityCalendar unitIds={idsByMode[bookMode]} />
        <div className="mt-8">
          <ContactCtaRow unitLabel={labelByMode[bookMode]} />
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  MUNYONYO layout — mirrors Kansanga with M1 / M2 / M3 reels
 * ───────────────────────────────────────────────────────────── */

const M1_REEL = [m3Cover, m3Img2, m3Img4, m3Img1];
const M2_REEL = [m3Img1, m3Img3, m3Cover, m3Img2];
const M3_REEL = [m3Img4, m3Img2, m3Img3, m3Cover, m3Img1];

const MUNYONYO_UNITS = [
  { id: "munyonyo-1", label: "Unit M1", desc: "One-bedroom apartment", reel: M1_REEL, dir: "right" },
  { id: "munyonyo-2", label: "Unit M2", desc: "Two-bedroom apartment", reel: M2_REEL, dir: "left"  },
  { id: "munyonyo-3", label: "Unit M3", desc: "Two-bedroom apartment", reel: M3_REEL, dir: "right" },
];

function MunyonyoPage({ loc }) {
  // Independent toggles for each unit. Default: M3 selected (kept the original primary).
  const [picks, setPicks] = useState({
    "munyonyo-1": false,
    "munyonyo-2": false,
    "munyonyo-3": true,
  });
  const togglePick = (id) =>
    setPicks((p) => ({ ...p, [id]: !p[id] }));
  const selectedIds = Object.entries(picks)
    .filter(([, v]) => v)
    .map(([k]) => k);
  const selectedLabel =
    selectedIds.length === 0
      ? "no unit"
      : selectedIds.length === 3
        ? "all three units (M1, M2, M3)"
        : selectedIds
            .map((id) => MUNYONYO_UNITS.find((u) => u.id === id).label)
            .join(" + ");

  return (
    <div className="container-x py-8 space-y-14">

      {/* Title */}
      <header>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-ink">Munyonyo</h1>
      </header>

      {/* Narrative — same as Kansanga */}
      <section className="max-w-3xl">
        <p className="text-lg leading-relaxed text-brand-ink/85">
          {KANSANGA_NARRATIVE_1}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-brand-ink/85">
          {KANSANGA_NARRATIVE_2}
        </p>
      </section>

      {/* M1, M2, M3 reels — alternating directions */}
      {MUNYONYO_UNITS.map((u) => (
        <section key={u.id}>
          <h2 className="text-3xl font-bold text-brand-maroon tracking-[0.3em]">
            {u.label.replace("Unit ", "")}
          </h2>
          <p className="mt-1 text-sm text-brand-ink/60">{u.desc}</p>
          <div className="mt-5">
            <ImageMarquee images={u.reel} direction={u.dir} duration={36} />
          </div>
        </section>
      ))}

      {/* Amenities */}
      <section>
        <H2>Amenities</H2>
        <AmenityGrid />
      </section>

      {/* Nearby places — Munyonyo-specific */}
      <section>
        <H2>Nearby places</H2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loc.nearby.map(([place, where]) => (
            <li key={place} className="card p-5">
              <p className="font-semibold text-brand-ink flex items-center gap-2">
                <span className="text-brand-maroon">📍</span>
                {place}
              </p>
              <p className="mt-1 text-sm text-brand-ink/65">{where}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* House Guide — same as Kansanga */}
      <section>
        <H2>House guide</H2>
        <p className="text-brand-ink/70 mb-6">
          To help you settle in quickly, here's a quick overview of how things
          work in the house:
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {HOUSE_GUIDE.map((group) => (
            <div key={group.title} className="card p-5">
              <h3 className="font-semibold text-brand-maroon">{group.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-brand-ink/80">
                {group.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-sienna shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* House Rules — same as Kansanga */}
      <section>
        <H2>House rules</H2>
        <p className="text-brand-ink/70 mb-6">
          We're so happy to host you! To ensure a comfortable stay for everyone,
          please follow these simple house rules:
        </p>
        <ol className="grid gap-4 sm:grid-cols-2 list-none counter-reset:rule">
          {HOUSE_RULES.map(([title, desc], i) => (
            <li key={title} className="card p-5 flex gap-4">
              <span className="font-display text-3xl text-brand-maroon shrink-0 leading-none">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-brand-ink">{title}</p>
                <p className="mt-1 text-sm text-brand-ink/65 leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-brand-ink/65 text-center italic">
          Thank you for understanding and helping us keep the space comfortable for all our guests!
        </p>
      </section>

      {/* Check-in & arrival — same as Kansanga */}
      <section>
        <H2>Check-in &amp; arrival</H2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Check-in / Check-out</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-ink/80">
              <li>Check-in: After <span className="font-medium text-brand-ink">1:30 PM</span></li>
              <li>Check-out: Till <span className="font-medium text-brand-ink">11:00 AM</span></li>
              <li className="text-brand-ink/65">Feel free to arrive any time after this — the home will be ready for you.</li>
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Parking</h3>
            <p className="mt-3 text-sm text-brand-ink/80">
              Free parking is available — no permit required.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Entry</h3>
            <p className="mt-3 text-sm text-brand-ink/80">
              You'll always find a caretaker to guide you with the access code(s) to your house.
            </p>
            <p className="mt-2 text-sm text-brand-ink/80">
              The front doors use keyless entry — the access code is shared at check-in.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-brand-maroon">Keys</h3>
            <p className="mt-3 text-sm text-brand-ink/80">
              Please don't move with your house keys — always leave them behind when you check out.
            </p>
          </div>
        </div>
      </section>

      {/* Availability — multi-select toggles */}
      <section>
        <H2>Availability</H2>
        <p className="text-sm text-brand-ink/60 mb-5">
          Pick one unit, two, or all three — the calendar shows dates when every
          selected unit is free.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {MUNYONYO_UNITS.map((u) => {
            const on = picks[u.id];
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => togglePick(u.id)}
                aria-pressed={on}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  on
                    ? "bg-brand-maroon text-brand-cream"
                    : "border border-brand-sand bg-white text-brand-ink hover:border-brand-maroon/50"
                }`}
              >
                {u.label}
              </button>
            );
          })}
        </div>
        {selectedIds.length > 0 ? (
          <AvailabilityCalendar unitIds={selectedIds} />
        ) : (
          <div className="card p-8 text-center text-sm text-brand-ink/60">
            Select at least one unit above to see availability.
          </div>
        )}
        <div className="mt-8">
          <ContactCtaRow unitLabel={selectedLabel} />
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Router-level component
 * ───────────────────────────────────────────────────────────── */

export default function Location() {
  const { id } = useParams();
  const loc = locationsById[id];
  if (!loc) return <Navigate to="/" replace />;
  if (id === "kansanga") return <KansangaPage />;
  return <MunyonyoPage loc={loc} />;
}
