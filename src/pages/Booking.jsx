import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Section from "../components/Section";
import SmartImage from "../components/SmartImage";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { units, unitsById } from "../data/units";
import { site } from "../data/site";

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
  const [params, setParams] = useSearchParams();
  const initialUnitId = params.get("unit") || units[0].id;
  const unit = unitsById[initialUnitId] || units[0];

  const phoneHref = `tel:${site.contact.phoneE164}`;
  const waMsg = useMemo(() => {
    const text = `Hi Suubi, I'd like to enquire about availability at ${unit.name} (${unit.location}) — Elyon Nest.`;
    return `https://wa.me/${site.contact.whatsappE164}?text=${encodeURIComponent(text)}`;
  }, [unit.name, unit.location]);

  return (
    <>
      <Section
        eyebrow={`${unit.location} · ${unit.name}`}
        title="Check availability"
        subtitle="Pick your dates below to see what's free. To confirm a booking, message the host directly — we keep things personal."
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <aside className="lg:col-span-2 space-y-6">
            <article className="card overflow-hidden">
              {/* Doubled-height hero photo for this unit */}
              <div className="aspect-[4/6] overflow-hidden">
                <SmartImage
                  src={unit.cover}
                  alt={unit.name}
                  fallbackLabel={unit.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{unit.name}</h3>
                <p className="text-sm text-brand-ink/65 mt-1">{unit.tagline}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-brand-ink/80">
                  {unit.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-brand-sienna" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="card p-6">
              <h4 className="font-display text-xl">Switch unit</h4>
              <div className="mt-3 grid gap-2">
                {units.map((u) => {
                  const active = u.id === unit.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setParams({ unit: u.id })}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        active
                          ? "border-brand-maroon bg-brand-maroon text-brand-cream"
                          : "border-brand-sand bg-white hover:border-brand-maroon/50"
                      }`}
                    >
                      <div className="font-medium">{u.name}</div>
                      <div className={`text-xs ${active ? "text-brand-cream/80" : "text-brand-ink/60"}`}>
                        {u.location}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <AvailabilityCalendar unitId={unit.id} />

            <div className="card p-6 sm:p-8 bg-brand-maroon text-brand-cream">
              <h3 className="font-display text-2xl">Ready to book?</h3>
              <p className="mt-2 text-brand-cream/85">
                We don't take card payments online — we'd rather have a quick
                chat to confirm your dates and answer any questions. Reach out
                directly:
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-cream text-brand-maroon px-5 py-3 font-medium transition hover:bg-brand-beige"
                >
                  <CallIcon className="h-5 w-5" />
                  Call {site.contact.phone}
                </a>
                <a
                  href={waMsg}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 font-medium transition hover:bg-[#1ebd5d]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp the host
                </a>
              </div>

              <div className="mt-6 grid gap-2 text-sm text-brand-cream/85">
                <p>Host: <span className="font-medium text-brand-cream">{site.contact.host}</span></p>
                <p>Caretaker (on site): {site.contact.caretakerPhone}</p>
                <p>Email: <a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a></p>
              </div>
            </div>

            <div className="card p-6 grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">Check-in</p>
                <p className="font-display text-xl text-brand-maroon mt-1">{site.checkIn}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">Check-out</p>
                <p className="font-display text-xl text-brand-maroon mt-1">{site.checkOut}</p>
              </div>
              <p className="sm:col-span-2 text-brand-ink/65 leading-relaxed">
                You'll always find a caretaker on site to share the keyless
                door code. The whole apartment is yours — we don't book by the
                room.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section align="center" className="bg-brand-beige/40">
        <p className="text-brand-ink/75">
          Looking at a different unit?{" "}
          <Link to="/" className="text-brand-maroon font-medium underline">
            See all stays
          </Link>
        </p>
      </Section>
    </>
  );
}
