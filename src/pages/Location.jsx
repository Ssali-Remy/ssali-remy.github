import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { units, locationsById } from "../data/units";
import { gallery } from "../data/gallery";
import { reviews } from "../data/reviews";
import { site } from "../data/site";

/* ── Amenity definitions ── */
const AMENITIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
      </svg>
    ),
    label: "Strong Wi-Fi",
    desc: "Fastest in the living room & kitchen",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v1M12 20v1M3 12H2M22 12h-1M5.6 5.6l-.7-.7M19.1 19.1l-.7-.7M19.1 4.9l-.7.7M5.6 18.4l-.7.7" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    label: "Air conditioning",
    desc: "Installed in every room",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: "Smart TV",
    desc: "Netflix & DStv included",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    label: "Power back-up",
    desc: "Generator — never lose Wi-Fi or AC",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v13H3zM8 21h8M12 16v5" />
        <path d="M8 8h.01M12 8h.01M16 8h.01" />
      </svg>
    ),
    label: "Fully equipped kitchen",
    desc: "Cookware, blender, microwave & fridge",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    label: "Housekeeping",
    desc: "Six days a week",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      </svg>
    ),
    label: "Free parking",
    desc: "On-site — no permit required",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "24-hour security",
    desc: "Armed at night + CCTV cameras",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: "Garden & outdoor space",
    desc: "Free to enjoy during your stay",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 10h11M6.5 13.5h11M4 19a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4z" />
      </svg>
    ),
    label: "Laundry service",
    desc: "Mon / Wed / Fri (charges may apply)",
  },
];

/* ── House rules for "Things to know" ── */
const RULES_SHORT = [
  { icon: "🕑", label: `Check-in: ${site.checkIn}` },
  { icon: "🕚", label: `Check-out: ${site.checkOut}` },
  { icon: "🚭", label: "No smoking anywhere on the property" },
  { icon: "🐾", label: "No pets allowed" },
];

const RULES_FULL = [
  { heading: "Arrival & departure", items: [`Check-in: ${site.checkIn}`, `Check-out: ${site.checkOut}`, "Keyless entry — code shared at check-in"] },
  { heading: "House rules", items: ["No smoking anywhere on the property", "No pets allowed", "No parties or events", "Please keep noise levels respectful after 10 PM"] },
  { heading: "Safety", items: ["Smoke & carbon monoxide detectors installed", "Fire extinguisher in the kitchen", "First aid kit in the living room", "Emergency / panic siren switch on the premises"] },
  { heading: "Booking", items: ["Book by calling or WhatsApp — no online card payments", "Caretaker on-site: " + site.contact.caretakerPhone] },
];

/* ── Star rating component ── */
function Stars({ rating }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i <= rating ? "fill-brand-maroon" : "fill-brand-sand"}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Things-to-know modal ── */
function ThingsModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(42,26,20,0.55)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-brand-cream shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between px-6 pt-6 pb-4 bg-brand-cream border-b border-brand-beige">
          <h2 className="text-lg font-bold text-brand-ink">Things to know</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-brand-beige transition-colors"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5 space-y-6">
          {RULES_FULL.map((section) => (
            <div key={section.heading}>
              <h3 className="font-semibold text-brand-maroon mb-3">{section.heading}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-brand-ink/80">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 mt-0.5 shrink-0 fill-brand-maroon">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Photo mosaic grid ── */
function PhotoMosaic({ images, locationName }) {
  const [lightbox, setLightbox] = useState(null);
  const filled = [...images];
  while (filled.length < 5) filled.push(filled[filled.length - 1]);
  const shown = filled.slice(0, 5);

  return (
    <>
      <div>
        {/* Mobile: single hero image */}
        <div
          className="sm:hidden relative overflow-hidden rounded-2xl cursor-pointer"
          style={{ height: "50vw", minHeight: "220px" }}
          onClick={() => setLightbox(0)}
        >
          <SmartImage
            src={shown[0]}
            alt={`${locationName} — main`}
            fallbackLabel={locationName}
            className="h-full w-full object-cover"
          />
          <button
            onClick={e => { e.stopPropagation(); setLightbox(0); }}
            className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm border border-brand-sand px-3 py-1.5 text-xs font-medium text-brand-ink shadow"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            {shown.length} photos
          </button>
        </div>

        {/* Desktop: 5-image mosaic — relative scoped here so button stays inside */}
        <div className="relative hidden sm:block overflow-hidden rounded-3xl" style={{ height: "50vh", minHeight: "300px" }}>
          <div className="grid gap-2 h-full" style={{ gridTemplateColumns: "3fr 2fr" }}>
            <div
              className="overflow-hidden rounded-l-3xl cursor-pointer h-full"
              onClick={() => setLightbox(0)}
            >
              <SmartImage
                src={shown[0]}
                alt={`${locationName} — main`}
                fallbackLabel={locationName}
                className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="grid gap-2 h-full" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
              {shown.slice(1, 5).map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden cursor-pointer ${i === 1 ? "rounded-tr-3xl" : ""} ${i === 3 ? "rounded-br-3xl" : ""}`}
                  onClick={() => setLightbox(i + 1)}
                >
                  <SmartImage
                    src={src}
                    alt={`${locationName} — photo ${i + 2}`}
                    fallbackLabel={locationName}
                    className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setLightbox(0)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm border border-brand-sand px-4 py-2 text-sm font-medium text-brand-ink shadow hover:bg-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Show all photos
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          {lightbox > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors"
              onClick={() => setLightbox((i) => Math.max(0, i - 1))}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <img
            src={shown[lightbox]}
            alt={`${locationName} — photo ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
          />
          {lightbox < shown.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors"
              onClick={() => setLightbox((i) => Math.min(shown.length - 1, i + 1))}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {shown.length}
          </p>
        </div>
      )}
    </>
  );
}

/* ── Sticky booking card ── */
function BookingCard({ locationId, units: locUnits }) {
  const waMsg = useMemo(() => {
    const text = `Hi, I'd like to enquire about availability at Elyon Nest — ${locUnits[0]?.location || "Kampala"}.`;
    return `https://wa.me/${site.contact.whatsappE164}?text=${encodeURIComponent(text)}`;
  }, [locUnits]);

  return (
    <div className="rounded-3xl border border-brand-beige bg-brand-cream shadow-soft p-6 sticky top-28">
      <div className="mb-4">
        <p className="text-sm text-brand-ink/60 font-medium mb-1">Ready to book?</p>
        <div className="flex items-center gap-1">
          <Stars rating={5} />
          <span className="text-sm text-brand-ink/60 ml-1">{reviews.length} reviews</span>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {locUnits.map((u) => (
          <Link
            key={u.id}
            to={`/booking?unit=${u.id}`}
            className="flex items-center justify-between w-full rounded-2xl border border-brand-beige hover:border-brand-maroon px-4 py-3 transition-colors group"
          >
            <div>
              <p className="font-medium text-brand-ink text-sm group-hover:text-brand-maroon transition-colors">{u.name}</p>
              <p className="text-xs text-brand-ink/55">{u.bedrooms} bed · {u.bathrooms} bath · sleeps {u.sleeps}</p>
            </div>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-brand-maroon opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        ))}
      </div>

      <a
        href={`tel:${site.contact.phoneE164}`}
        className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 01-6.59-6.58l2.2-2.21c.27-.27.35-.66.24-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
        </svg>
        Call to book
      </a>
      <a
        href={waMsg}
        target="_blank"
        rel="noreferrer"
        className="btn-ghost w-full flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.78 14.06c-.24.68-1.4 1.3-1.97 1.38-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.83-4.2-4.97-4.4-.15-.2-1.19-1.59-1.19-3.03 0-1.43.75-2.13 1.02-2.43.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.69.52.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.8 1.31 1.72 2.13 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.4-.25.68-.15.27.1 1.74.82 2.03.97.3.15.5.22.58.35.07.13.07.77-.17 1.45z" />
        </svg>
        WhatsApp
      </a>

      <p className="mt-4 text-center text-xs text-brand-ink/40">No credit card required — arrange directly with the host</p>
    </div>
  );
}

/* ── Main page ── */
export default function Location() {
  const { id } = useParams();
  const loc = locationsById[id];
  if (!loc) return <Navigate to="/" replace />;

  const locUnits = units.filter((u) => u.locationId === id);
  const locGallery = gallery.filter((g) => g.location === id);
  const mosaicImages = locGallery.map((g) => g.src);

  const [showModal, setShowModal] = useState(false);
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const visibleAmenities = amenitiesExpanded ? AMENITIES : AMENITIES.slice(0, 6);

  return (
    <>
      {showModal && <ThingsModal onClose={() => setShowModal(false)} />}

      <div className="container-x py-8">
        {/* Title row */}
        <div className="mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-ink">{loc.name} — Elyon Nest</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-brand-ink/70">
            <span className="flex items-center gap-1">
              <Stars rating={5} />
              <span className="font-semibold text-brand-ink ml-1">{avgRating}</span>
              <span>· {reviews.length} reviews</span>
            </span>
            <span>·</span>
            <span>{loc.address}</span>
          </div>
        </div>

        {/* Photo mosaic */}
        <div className="mb-10">
          <PhotoMosaic images={mosaicImages} locationName={loc.name} />
        </div>

        {/* Content + sidebar */}
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* ── Left: main content ── */}
          <div className="space-y-10 min-w-0">

            {/* Hosted by */}
            <div className="flex items-center justify-between pb-8 border-b border-brand-beige">
              <div>
                <h2 className="text-xl font-semibold text-brand-ink">
                  Boutique apartments hosted by {site.contact.host}
                </h2>
                <p className="mt-1 text-sm text-brand-ink/60">
                  {locUnits.reduce((s, u) => s + u.bedrooms, 0)} bedrooms total ·{" "}
                  {locUnits.reduce((s, u) => s + u.bathrooms, 0)} bathrooms ·{" "}
                  sleeps up to {locUnits.reduce((s, u) => Math.max(s, u.sleeps), 0)} guests per unit
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-brand-maroon flex items-center justify-center text-brand-cream text-xl font-bold shrink-0">
                {site.contact.host[0]}
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-brand-beige pb-8">
              <h2 className="text-xl font-semibold text-brand-ink mb-4">About this place</h2>
              <p className="text-brand-ink/75 leading-relaxed">{site.welcome}</p>
              <p className="mt-3 text-brand-ink/75 leading-relaxed">{loc.blurb}</p>
              <p className="mt-3 text-brand-ink/75 leading-relaxed">{site.welcomeFollowUp}</p>
            </div>

            {/* What this place offers */}
            <div className="border-b border-brand-beige pb-8">
              <h2 className="text-xl font-semibold text-brand-ink mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visibleAmenities.map((a) => (
                  <div key={a.label} className="flex items-center gap-4">
                    <span className="h-7 w-7 shrink-0 text-brand-ink/70">{a.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-brand-ink">{a.label}</p>
                      <p className="text-xs text-brand-ink/55">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {AMENITIES.length > 6 && (
                <button
                  onClick={() => setAmenitiesExpanded((v) => !v)}
                  className="mt-6 rounded-xl border border-brand-ink/30 px-5 py-3 text-sm font-medium text-brand-ink hover:border-brand-maroon hover:text-brand-maroon transition-colors"
                >
                  {amenitiesExpanded
                    ? "Show less"
                    : `Show all ${AMENITIES.length} amenities`}
                </button>
              )}
            </div>

            {/* Availability calendar */}
            <div className="border-b border-brand-beige pb-8">
              <h2 className="text-xl font-semibold text-brand-ink mb-2">Availability</h2>
              <p className="text-sm text-brand-ink/55 mb-6">Select a unit to check open dates</p>
              <div className="flex flex-wrap gap-6">
                {locUnits.map((u) => (
                  <div key={u.id} className="flex-1 min-w-[280px]">
                    <p className="text-sm font-medium text-brand-maroon mb-2">{u.name}</p>
                    <AvailabilityCalendar unitId={u.id} />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="border-b border-brand-beige pb-8">
              <div className="flex items-center gap-3 mb-6">
                <svg viewBox="0 0 20 20" className="h-6 w-6 fill-brand-maroon">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h2 className="text-xl font-semibold text-brand-ink">
                  {avgRating} · {reviews.length} reviews
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {reviews.map((r) => (
                  <div key={r.name} className="space-y-2">
                    <Stars rating={r.rating} />
                    <p className="text-sm text-brand-ink/80 leading-relaxed">"{r.text}"</p>
                    <p className="text-xs font-semibold text-brand-ink">{r.name}</p>
                    <p className="text-xs text-brand-ink/50">{r.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to know */}
            <div className="border-b border-brand-beige pb-8">
              <h2 className="text-xl font-semibold text-brand-ink mb-6">Things to know</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RULES_SHORT.map((rule) => (
                  <div key={rule.label} className="flex items-center gap-3 text-sm text-brand-ink/75">
                    <span className="text-lg">{rule.icon}</span>
                    <span>{rule.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="mt-5 rounded-xl border border-brand-ink/30 px-5 py-3 text-sm font-medium text-brand-ink hover:border-brand-maroon hover:text-brand-maroon transition-colors"
              >
                Learn more about house rules
              </button>
            </div>

            {/* Nearby places */}
            <div className="border-b border-brand-beige pb-8">
              <h2 className="text-xl font-semibold text-brand-ink mb-4">What's around you</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {loc.nearby.map(([place, where]) => (
                  <li key={place} className="flex gap-2 text-sm text-brand-ink/75">
                    <span className="text-brand-maroon">📍</span>
                    <span><span className="font-medium text-brand-ink">{place}</span> — {where}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-xl font-semibold text-brand-ink mb-4">Where you'll be</h2>
              <p className="text-sm text-brand-ink/60 mb-4">{loc.address}</p>
              <div className="overflow-hidden rounded-3xl border border-brand-beige shadow-soft">
                <iframe
                  title={`Map of ${loc.name}`}
                  src={loc.mapEmbed}
                  className="h-[380px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* ── Right: sticky booking card ── */}
          <div className="hidden lg:block">
            <BookingCard locationId={id} units={locUnits} />
          </div>
        </div>

        {/* Mobile CTA bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-3 border-t border-brand-beige bg-brand-cream/95 backdrop-blur px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div>
            <p className="text-sm font-semibold text-brand-ink">Check availability</p>
            <p className="text-xs text-brand-ink/55">Call or WhatsApp to arrange</p>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${site.contact.whatsappE164}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost py-2 px-4 text-sm"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="btn-primary py-2 px-4 text-sm"
            >
              Call
            </a>
          </div>
        </div>
        {/* Spacer so mobile content isn't hidden behind the fixed bar */}
        <div className="h-20 lg:hidden" />
      </div>
    </>
  );
}
