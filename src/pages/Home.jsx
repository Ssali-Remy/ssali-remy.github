import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Partners from "../components/Partners";
import { units, heroBackgrounds } from "../data/units";
import { HOUSE_GUIDE } from "../data/houseRules";
import { AMENITY_GROUPS } from "../data/amenities";
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

function SectionFade({ from, to }) {
  return (
    <div
      aria-hidden="true"
      style={{ height: 140, background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}

export default function Home() {
  const [welcomeRef, welcomeInView] = useInView();
  const [mosaicRef,  mosaicInView]  = useInView();
  const [amenRef,    amenInView]    = useInView();
  const [rulesRef,   rulesInView]   = useInView();
  const [reviewRef,  reviewInView]  = useInView();
  const [partRef,    partInView]    = useInView();

  return (
    <>
      {/* Hero — rotating exterior / compound shots */}
      <div style={{ backgroundColor: "#F7F8FA" }} className="pt-10">
        <SlimCarousel images={heroBackgrounds} />
      </div>

      {/* Welcome statement — Meet your host */}
      <section style={{ backgroundColor: "#F7F8FA" }} className="py-20">
        <div ref={welcomeRef} className="container-x max-w-3xl mx-auto text-left">
          <h1 className={`text-4xl sm:text-5xl font-bold text-brand-ink leading-tight reveal-up stagger-1${welcomeInView ? " in-view" : ""}`}>
            Meet your host
          </h1>
          <p className={`mt-8 text-lg text-brand-ink/85 leading-relaxed reveal-up stagger-2${welcomeInView ? " in-view" : ""}`}>
            Hi there and welcome to Elyon Nest!
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
      </section>

      <SectionFade from="#F7F8FA" to="#ECEEF1" />

      {/* Apartments list */}
      <section style={{ backgroundColor: "#ECEEF1" }} className="py-16">
        <div ref={mosaicRef} className="container-x">
          <h2 className={`text-3xl sm:text-4xl font-bold text-brand-ink leading-tight text-center max-w-3xl mx-auto reveal-up stagger-1${mosaicInView ? " in-view" : ""}`}>
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

        <div className={`container-x mt-12 flex justify-center gap-4 flex-wrap reveal-up stagger-6${mosaicInView ? " in-view" : ""}`}>
          <Link to="/booking" className="btn-primary">
            Check availability
          </Link>
          <a
            href={`https://wa.me/${site.contact.whatsappE164}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.78 14.06c-.24.68-1.4 1.3-1.97 1.38-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.83-4.2-4.97-4.4-.15-.2-1.19-1.59-1.19-3.03 0-1.43.75-2.13 1.02-2.43.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.69.52.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.8 1.31 1.72 2.13 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.4-.25.68-.15.27.1 1.74.82 2.03.97.3.15.5.22.58.35.07.13.07.77-.17 1.45z" />
            </svg>
            WhatsApp us
          </a>
        </div>
      </section>

      <SectionFade from="#ECEEF1" to="#F7F8FA" />

      {/* Amenities — grouped by category, each item with an icon */}
      <section style={{ backgroundColor: "#F7F8FA" }} className="py-20">
        <div ref={amenRef} className="container-x max-w-5xl">
          <h2 className={`text-2xl sm:text-3xl font-bold text-brand-ink mb-10 reveal-up stagger-1${amenInView ? " in-view" : ""}`}>
            What this place offers
          </h2>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITY_GROUPS.map((group, gi) => (
              <div
                key={group.category}
                className={`reveal-up stagger-${Math.min(gi + 1, 6)}${amenInView ? " in-view" : ""}`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-brand-maroon shrink-0">{group.categoryIcon}</span>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-ink">
                    {group.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="text-brand-ink/70 shrink-0">{item.icon}</span>
                      <span className="text-brand-ink/90">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionFade from="#F7F8FA" to="#ECEEF1" />

      {/* House guide + arrival times */}
      <section style={{ backgroundColor: "#ECEEF1" }} className="py-16">
        <div ref={rulesRef} className="container-x">
          <h2 className={`text-2xl sm:text-3xl font-bold text-brand-ink mb-4 reveal-up stagger-1${rulesInView ? " in-view" : ""}`}>
            House guide
          </h2>
          <p className={`text-brand-ink/70 mb-6 max-w-2xl reveal-up stagger-2${rulesInView ? " in-view" : ""}`}>
            We're so happy to host you! To ensure a comfortable stay for
            everyone, please keep these simple guidelines in mind:
          </p>
          <ol className="grid gap-4 sm:grid-cols-2 list-none">
            {HOUSE_GUIDE.map(([title, desc], i) => (
              <li
                key={title}
                className={`card p-5 flex gap-4 reveal-up stagger-${Math.min(i + 1, 6)}${rulesInView ? " in-view" : ""}`}
              >
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

          <h2 className={`mt-14 text-2xl sm:text-3xl font-bold text-brand-ink mb-4 reveal-up stagger-6${rulesInView ? " in-view" : ""}`}>
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

      <SectionFade from="#ECEEF1" to="#F7F8FA" />

      {/* Feedback & reviews */}
      <section style={{ backgroundColor: "#F7F8FA" }} className="py-20">
        <div ref={reviewRef} className="container-x max-w-3xl">
          <h2 className={`text-2xl sm:text-3xl font-bold text-brand-ink mb-2 reveal-up stagger-1${reviewInView ? " in-view" : ""}`}>
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

      <SectionFade from="#F7F8FA" to="#ECEEF1" />

      {/* Partners */}
      <section style={{ backgroundColor: "#ECEEF1" }} className="py-16">
        <div ref={partRef} />
        <div className={`container-x reveal-up stagger-2${partInView ? " in-view" : ""}`}>
          <Partners />
        </div>
      </section>
    </>
  );
}
