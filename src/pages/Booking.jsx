import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Section from "../components/Section";
import ClickSlider from "../components/ClickSlider";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { site } from "../data/site";
import { k1Cover, k1Img1, k1Img2, k1Img3, k1Img4 } from "../data/images-k1";
import { k2Cover, k2Img1, k2Img2, k2Img3, k2Img4 } from "../data/images-k2";
import { m3Cover, m3Img1, m3Img2, m3Img3, m3Img4 } from "../data/images-m3";

// Common rooms first; bedrooms last.
const E1_REEL = [k1Cover, k1Img1, k1Img2, k1Img4, k1Img3];
const E2_REEL = [k2Cover, k2Img1, k2Img2, k2Img4, k2Img3];
const M1_REEL = [m3Cover, m3Img2, m3Img3, m3Img1];
const M2_REEL = [m3Cover, m3Img3, m3Img2, m3Img4];
const M3_REEL = [m3Cover, m3Img2, m3Img3, m3Img1, m3Img4];

const UNIT_REELS = [
  { id: "kansanga-1", label: "E1", subtitle: "Kansanga · Two-bedroom",      reel: E1_REEL, dir: "right" },
  { id: "kansanga-2", label: "E2", subtitle: "Kansanga · Two-bedroom",      reel: E2_REEL, dir: "left"  },
  { id: "munyonyo-1", label: "M1", subtitle: "Munyonyo · One-bedroom",      reel: M1_REEL, dir: "right" },
  { id: "munyonyo-2", label: "M2", subtitle: "Munyonyo · Two-bedroom",      reel: M2_REEL, dir: "left"  },
  { id: "munyonyo-3", label: "M3", subtitle: "Munyonyo · Two-bedroom",      reel: M3_REEL, dir: "right" },
];

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

export default function Booking() {
  const [params] = useSearchParams();
  const requestedUnit = params.get("unit");
  const hasRequestedUnit = UNIT_REELS.some((u) => u.id === requestedUnit);

  // If arriving with ?unit=<id> from an apartment page, pre-select just
  // that one; otherwise default to every unit selected.
  const [picks, setPicks] = useState(
    Object.fromEntries(
      UNIT_REELS.map((u) => [
        u.id,
        hasRequestedUnit ? u.id === requestedUnit : true,
      ]),
    ),
  );
  const togglePick = (id) =>
    setPicks((p) => ({ ...p, [id]: !p[id] }));
  const selectedIds = Object.entries(picks)
    .filter(([, v]) => v)
    .map(([k]) => k);

  const selectedLabel =
    selectedIds.length === 0
      ? "no unit"
      : selectedIds.length === UNIT_REELS.length
        ? "any of our 5 units"
        : selectedIds
            .map((id) => UNIT_REELS.find((u) => u.id === id).label)
            .join(" + ");

  const waText = `Hi Suubi, I'd like to book at Elyon Nest — interested in ${selectedLabel}.`;
  const waHref = `https://wa.me/${site.contact.whatsappE164}?text=${encodeURIComponent(waText)}`;

  return (
    <>
      <Section
        eyebrow="Book your stay"
        title="All five units, one calendar"
        subtitle="Browse every apartment across Kansanga and Munyonyo, then check availability across whichever combination you're considering."
      />

      {/* Five image reels — alternating directions */}
      <div className="space-y-12 pb-12">
        {UNIT_REELS.map((u) => (
          <section key={u.id}>
            <div className="container-x flex items-baseline gap-3">
              <h2 className="text-3xl font-bold text-brand-maroon tracking-[0.3em]">
                {u.label}
              </h2>
              <p className="text-sm text-brand-ink/60">{u.subtitle}</p>
            </div>
            <div className="container-x mt-4">
              <ClickSlider images={u.reel} />
            </div>
          </section>
        ))}
      </div>

      {/* Single calendar covering all units */}
      <Section eyebrow="Availability" title="All units, one calendar">
        <p className="text-sm text-brand-ink/65 mb-5">
          Toggle the units you're interested in — the calendar shows dates when
          every selected unit is free.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {UNIT_REELS.map((u) => {
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

        {/* Call + WhatsApp CTAs */}
        <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          <a
            href={`tel:${site.contact.phoneE164}`}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-maroon text-brand-cream px-6 py-4 font-semibold text-base transition hover:bg-brand-burgundy shadow-soft"
          >
            <CallIcon className="h-5 w-5" />
            Call us
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white px-6 py-4 font-semibold text-base transition hover:bg-[#1ebd5d] shadow-soft"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp us
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-brand-ink/55">
          We don't take card payments online — confirm your dates with a quick chat.
        </p>
      </Section>

      <Section align="center" className="bg-brand-beige/40">
        <p className="text-brand-ink/75">
          Curious about a specific location?{" "}
          <Link to="/locations/kansanga" className="text-brand-maroon font-medium underline">
            Kansanga
          </Link>
          {" · "}
          <Link to="/locations/munyonyo" className="text-brand-maroon font-medium underline">
            Munyonyo
          </Link>
        </p>
      </Section>
    </>
  );
}
