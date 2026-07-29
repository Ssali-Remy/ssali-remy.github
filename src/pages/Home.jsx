import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Partners from "../components/Partners";
import { units, heroBackgrounds } from "../data/units";
import { HOUSE_GUIDE } from "../data/houseRules";
import { AMENITY_GROUPS } from "../data/amenities";

// Flat list for the Airbnb-style two-column amenities preview.
const AMENITIES = AMENITY_GROUPS.flatMap((g) => g.items);
const AMENITIES_PREVIEW = 8;
import FeedbackForm from "../components/FeedbackForm";
import { site } from "../data/site";

/* ── Intersection Observer hook (fires once, with sync visible-check fallback) ── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const trigger = () => { if (!fired) { fired = true; setInView(true); } };

    // Immediate check: element already in viewport when effect runs
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 60 && rect.bottom > 0) {
      trigger();
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { trigger(); obs.unobserve(el); } },
      { threshold: 0, rootMargin: "0px 0px -30px 0px", ...options }
    );
    obs.observe(el);
    // Safety net: headless / sandboxed environments where IO never fires
    const fallback = setTimeout(trigger, 400);
    return () => { obs.disconnect(); clearTimeout(fallback); };
    // `options` is only ever passed as a fresh object literal (or omitted) by
    // every call site, and this observer is meant to attach once on mount —
    // re-running it on every options identity change would defeat that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

/* ── Compact auto-rotating carousel for the hero images ── */
function SlimCarousel({ images, interval = 5000 }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="relative overflow-hidden mx-auto rounded-2xl" style={{ height: "40vh", minHeight: "220px", width: "90%" }}>
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms]"
          style={{ backgroundImage: `url("${src}")`, opacity: i === active ? 1 : 0 }}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Amenities — Airbnb-style icon + label rows, with a "show all" expander ── */

function bedroomLabel(u) {
  return `${u.bedrooms} Bedroom${u.bedrooms > 1 ? "s" : ""}`;
}

export default function Home() {
  const [welcomeRef, welcomeInView] = useInView();
  const [mosaicRef,  mosaicInView]  = useInView();
  const [amenRef,    amenInView]    = useInView();
  const [rulesRef,   rulesInView]   = useInView();
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const visibleAmenities = showAllAmenities
    ? AMENITIES
    : AMENITIES.slice(0, AMENITIES_PREVIEW);
  const [reviewRef,  reviewInView]  = useInView();
  const [partRef,    partInView]    = useInView();

  return (
    <>
      {/* Hero — rotating exterior / compound shots */}
      <div style={{ backgroundColor: "#E4E7EA" }} className="pt-10">
        <SlimCarousel images={heroBackgrounds} />
      </div>

      {/* Welcome statement — Meet your host */}
      <section style={{ backgroundColor: "#E4E7EA" }} className="py-20">
        <div ref={welcomeRef} className="container-x">
          <div className="max-w-3xl text-left">
          <h1 className={`text-2xl sm:text-3xl font-semibold text-brand-ink leading-tight reveal-up stagger-1${welcomeInView ? " in-view" : ""}`}>
            Meet your host
          </h1>
          <p className={`mt-8 text-lg text-brand-ink/85 leading-relaxed reveal-up stagger-2${welcomeInView ? " in-view" : ""}`}>
            Welcome to Elyon Nest!
          </p>
          <p className={`mt-4 text-brand-ink/75 leading-relaxed reveal-up stagger-3${welcomeInView ? " in-view" : ""}`}>
            It is a pleasure and privilege to be your host, at Elyon Nest, we
            have poured a lot of love into this home to make it as convenient,
            comfortable and welcoming as possible for you.
          </p>
          <p className={`mt-4 text-brand-ink/75 leading-relaxed reveal-up stagger-4${welcomeInView ? " in-view" : ""}`}>
            Whether you're here to relax, explore, or work remotely, we are
            just a message away if you need anything during your stay. We are
            happy to share local tips, restaurant recommendations, or help
            with anything else you might need.
          </p>
          <p className={`mt-4 text-brand-ink/85 leading-relaxed reveal-up stagger-5${welcomeInView ? " in-view" : ""}`}>
            Enjoy your time here — and make yourself at home! <span aria-hidden="true">💛</span>
          </p>
          </div>
        </div>
      </section>

      {/* Apartments list */}
      <section style={{ background: "linear-gradient(to bottom, #E4E7EA 0px, #D7DBDF 140px)" }} className="py-16">
        <div ref={mosaicRef} className="container-x">
          <h2 className={`text-2xl sm:text-3xl font-semibold text-brand-ink leading-tight reveal-up stagger-1${mosaicInView ? " in-view" : ""}`}>
            Our apartments
          </h2>
        </div>

        <div className={`container-x mt-10 reveal-up stagger-3${mosaicInView ? " in-view" : ""}`}>
          <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
            <div className="hidden sm:grid grid-cols-[96px_1fr_1fr_1fr] gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-brand-ink/50 border-b border-brand-beige">
              <span>Apartment</span>
              <span>Name</span>
              <span>Type</span>
              <span>Location</span>
            </div>
            {units.map((u) => (
              <Link
                key={u.id}
                to={`/apartments/${u.id}`}
                className="grid grid-cols-[72px_1fr] sm:grid-cols-[96px_1fr_1fr_1fr] items-center gap-4 px-6 py-4 border-b border-brand-beige last:border-b-0 transition hover:bg-brand-beige/30"
              >
                <img
                  src={u.cover}
                  alt={u.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="sm:hidden">
                  <p className="font-semibold text-brand-ink">{u.name}</p>
                  <p className="text-sm text-brand-ink/60">
                    {bedroomLabel(u)} · {u.location}
                  </p>
                </div>
                <span className="hidden sm:block font-semibold text-brand-ink">{u.name}</span>
                <span className="hidden sm:block text-brand-ink/75">{bedroomLabel(u)}</span>
                <span className="hidden sm:block text-brand-ink/75">{u.location}</span>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* What we offer — flat two-column amenity list with show-all */}
      <section style={{ background: "linear-gradient(to bottom, #D7DBDF 0px, #E4E7EA 140px)" }} className="py-20">
        <div ref={amenRef} className="container-x max-w-3xl">
          <h2 className={`text-2xl sm:text-3xl font-semibold text-brand-ink mb-8 reveal-up stagger-1${amenInView ? " in-view" : ""}`}>
            What we offer
          </h2>
          <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 reveal-up stagger-2${amenInView ? " in-view" : ""}`}>
            {visibleAmenities.map((item) => (
              <li key={item.label} className="flex items-center gap-4 py-1">
                <span className="text-brand-ink/80 shrink-0">{item.icon}</span>
                <span className="text-brand-ink/90">{item.label}</span>
              </li>
            ))}
          </ul>
          {AMENITIES.length > AMENITIES_PREVIEW && (
            <button
              type="button"
              onClick={() => setShowAllAmenities((v) => !v)}
              className="mt-8 rounded-xl border border-brand-ink/30 bg-brand-beige/60 px-6 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-maroon hover:bg-brand-beige"
            >
              {showAllAmenities
                ? "Show less"
                : `Show all ${AMENITIES.length} amenities`}
            </button>
          )}
        </div>
      </section>

      {/* House guide + arrival times */}
      <section style={{ background: "linear-gradient(to bottom, #E4E7EA 0px, #D7DBDF 140px)" }} className="py-16">
        <div ref={rulesRef} className="container-x">
          <h2 className={`text-2xl sm:text-3xl font-semibold text-brand-ink mb-4 reveal-up stagger-1${rulesInView ? " in-view" : ""}`}>
            House guide
          </h2>
          <p className={`text-brand-ink/70 mb-6 max-w-2xl reveal-up stagger-2${rulesInView ? " in-view" : ""}`}>
            We're so happy to host you! To ensure a comfortable stay for
            everyone, please keep these simple guidelines in mind:
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 list-none">
            {HOUSE_GUIDE.map(([title, desc], i) => (
              <li
                key={title}
                className={`card p-5 reveal-up stagger-${Math.min(i + 1, 6)}${rulesInView ? " in-view" : ""}`}
              >
                <p className="font-semibold text-brand-ink">{title}</p>
                <p className="mt-1 text-sm text-brand-ink/65 leading-relaxed">{desc}</p>
              </li>
            ))}
          </ul>

          <h2 className={`mt-14 text-2xl sm:text-3xl font-semibold text-brand-ink mb-4 reveal-up stagger-6${rulesInView ? " in-view" : ""}`}>
            Arrival
          </h2>
          <div className={`grid gap-5 sm:grid-cols-2 max-w-xl reveal-up stagger-6${rulesInView ? " in-view" : ""}`}>
            <div className="card p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">
                Check-in
              </p>
              <p className="mt-1 font-display text-xl text-brand-maroon">{site.checkIn}</p>
            </div>
            <div className="card p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">
                Check-out
              </p>
              <p className="mt-1 font-display text-xl text-brand-maroon">{site.checkOut}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback & reviews */}
      <section style={{ background: "linear-gradient(to bottom, #D7DBDF 0px, #E4E7EA 140px)" }} className="py-20">
        <div ref={reviewRef} className="container-x max-w-3xl">
          <h2 className={`text-2xl sm:text-3xl font-semibold text-brand-ink mb-2 reveal-up stagger-1${reviewInView ? " in-view" : ""}`}>
            Feedback & reviews
          </h2>
          <p className={`text-brand-ink/70 mb-8 reveal-up stagger-2${reviewInView ? " in-view" : ""}`}>
            Stayed with us? We'd love to hear how it went.
          </p>
          <div className={`reveal-up stagger-3${reviewInView ? " in-view" : ""}`}>
            <FeedbackForm />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ background: "linear-gradient(to bottom, #E4E7EA 0px, #D7DBDF 140px)" }} className="py-16">
        <div ref={partRef} />
        <div className={`container-x reveal-up stagger-2${partInView ? " in-view" : ""}`}>
          <Partners />
        </div>
      </section>
    </>
  );
}
