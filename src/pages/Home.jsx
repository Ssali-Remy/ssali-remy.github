import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { heroBackgrounds } from "../data/units";
import { k1Cover, k1Img1, k1Img2, k1Img3, k1Img4 } from "../data/images-k1";
import { k2Cover, k2Img1, k2Img2, k2Img3, k2Img4 } from "../data/images-k2";
import { m3Cover, m3Img1, m3Img2, m3Img3, m3Img4 } from "../data/images-m3";
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
  }, []);
  return [ref, inView];
}

/* ── Count-up hook for stat numbers ── */
function useCountUp(target, active, duration = 900) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    let current = 0;
    const frames = Math.round(duration / 16);
    const inc = target / frames;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function AnimatedStat({ n, l, inView, delay = 0 }) {
  const isNumeric = /^\d+$/.test(String(n));
  const count = useCountUp(isNumeric ? parseInt(n) : 0, inView);
  return (
    <div
      className={`text-center reveal-up${inView ? " in-view" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <dt className="text-3xl font-bold text-brand-maroon">
        {isNumeric ? count : n}
      </dt>
      <dd className="text-xs uppercase tracking-wider text-brand-ink/60 mt-1">{l}</dd>
    </div>
  );
}

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


const AMENITIES = [
  {
    title: "High-Speed Wi-Fi",
    desc: "Reliable fibre connection throughout every unit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Air Conditioning",
    desc: "Every room individually climate-controlled",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="9" rx="3" />
        <path d="M8 16v3M12 16v3M16 16v3M8 7V4M12 7V4M16 7V4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "24/7 Security",
    desc: "Armed guards and outdoor CCTV around the clock",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Full Kitchen",
    desc: "Blender, microwave, fridge, and complete cookware",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Housekeeping",
    desc: "Six days a week, included in every stay",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M12 12h.01M8 12h.01M16 12h.01" strokeLinecap="round" />
        <path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const PARTNERS = [
  { name: "Speke Resort", sub: "Neighbouring resort & leisure" },
  { name: "Airbnb", sub: "Listed partner" },
  { name: "Booking.com", sub: "Distribution partner" },
  { name: "Uganda Tourism Board", sub: "Official tourism body" },
];

const INTERIOR_IMAGES = [k1Img1, k1Img2, k2Img1, m3Img1, m3Img2];

const KANSANGA_REEL = [
  k1Cover, k1Img1, k1Img2, k1Img3, k1Img4,
  k2Cover, k2Img1, k2Img2, k2Img3, k2Img4,
];
const MUNYONYO_REEL = [
  m3Cover, m3Img1, m3Img2, m3Img3, m3Img4,
  m3Img1, m3Img3, m3Cover, m3Img2, m3Img4,
];

function ImageMarquee({ images, direction = "left", duration = 38 }) {
  // Duplicate so the track is exactly 2× wide and the loop is seamless.
  const reel = [...images, ...images];
  const dirClass = direction === "left" ? "marquee-left" : "marquee-right";
  return (
    <div className={`marquee ${dirClass}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {reel.map((src, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl overflow-hidden shadow-soft w-64 h-44 sm:w-72 sm:h-48 md:w-80 md:h-56"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </div>
  );
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
  const [partRef,    partInView]    = useInView();
  const [ctaRef,     ctaInView]     = useInView();

  return (
    <>
      {/* Carousel 1 — exterior / compound shots */}
      <SlimCarousel images={heroBackgrounds} />

      {/* Welcome statement — Meet your host */}
      <section style={{ backgroundColor: "#fff3f0" }} className="py-20">
        <div ref={welcomeRef} className="container-x max-w-3xl mx-auto text-center">
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

      {/* Carousel 2 — interior shots (sits on #fff3f0 between the two sections) */}
      <div style={{ backgroundColor: "#fff3f0" }} className="pb-10">
        <SlimCarousel images={INTERIOR_IMAGES} interval={4500} />
      </div>

      <SectionFade from="#fff3f0" to="#f3eed9" />

      {/* Proximity teasers — KANSANGA reel scrolls right, MUNYONYO reel scrolls left */}
      <section style={{ backgroundColor: "#f3eed9" }} className="py-16">
        <div ref={mosaicRef} className="container-x">
          <h2 className={`text-3xl sm:text-4xl font-bold text-brand-ink leading-tight text-center max-w-3xl mx-auto reveal-up stagger-1${mosaicInView ? " in-view" : ""}`}>
            Our apartments are in close and convenient proximity to everything
          </h2>
        </div>

        <div className="mt-12">
          <div className="container-x">
            <h3 className={`text-2xl font-bold text-brand-maroon tracking-[0.3em] reveal-up stagger-2${mosaicInView ? " in-view" : ""}`}>
              KANSANGA
            </h3>
          </div>
          <div className={`mt-5 reveal-up stagger-3${mosaicInView ? " in-view" : ""}`}>
            <ImageMarquee images={KANSANGA_REEL} direction="right" />
          </div>
        </div>

        <div className="mt-12">
          <div className="container-x">
            <h3 className={`text-2xl font-bold text-brand-maroon tracking-[0.3em] reveal-up stagger-4${mosaicInView ? " in-view" : ""}`}>
              MUNYONYO
            </h3>
          </div>
          <div className={`mt-5 reveal-up stagger-5${mosaicInView ? " in-view" : ""}`}>
            <ImageMarquee images={MUNYONYO_REEL} direction="left" />
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

      <SectionFade from="#f3eed9" to="#fff3f0" />

      {/* Amenities */}
      <section style={{ backgroundColor: "#fff3f0" }} className="py-20">
        <div ref={amenRef} className="container-x">
          <div className="text-center mb-14">
            <p className={`text-xs uppercase tracking-[0.2em] font-semibold text-brand-maroon reveal-up stagger-1${amenInView ? " in-view" : ""}`}>
              What's included
            </p>
            <h2 className={`mt-2 text-3xl sm:text-4xl font-bold text-brand-ink reveal-up stagger-2${amenInView ? " in-view" : ""}`}>
              Everything you need
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {AMENITIES.map((a, i) => (
              <div
                key={a.title}
                className={`amenity-item flex flex-col items-center text-center gap-3 reveal-up stagger-${i + 1}${amenInView ? " in-view" : ""}`}
              >
                <div
                  className="amenity-icon w-14 h-14 flex items-center justify-center rounded-2xl text-brand-maroon"
                  style={{ background: "rgba(91,26,26,0.07)" }}
                >
                  {a.icon}
                </div>
                <h3 className="font-semibold text-brand-ink text-sm leading-snug">{a.title}</h3>
                <p className="text-xs text-brand-ink/60 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionFade from="#fff3f0" to="#f3eed9" />

      {/* Partners */}
      <section style={{ backgroundColor: "#f3eed9" }} className="py-16">
        <div ref={partRef} className="container-x">
          <div className="text-center mb-10">
            <p className={`text-xs uppercase tracking-[0.2em] font-semibold text-brand-maroon reveal-up stagger-1${partInView ? " in-view" : ""}`}>
              Our partners
            </p>
            <h2 className={`mt-2 text-3xl font-bold text-brand-ink reveal-up stagger-2${partInView ? " in-view" : ""}`}>
              Trusted by great companies
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className={`partner-card flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-soft min-h-[100px] text-center reveal-up stagger-${i + 1}${partInView ? " in-view" : ""}`}
              >
                <span className="font-bold text-brand-ink text-sm">{p.name}</span>
                <span className="text-xs text-brand-ink/45 mt-1">{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionFade from="#f3eed9" to="#fff3f0" />

      {/* CTA — background option 1 */}
      <section style={{ backgroundColor: "#fff3f0" }} className="py-20">
        <div ref={ctaRef} className="container-x text-center">
          <p className={`text-xs uppercase tracking-[0.2em] font-semibold text-brand-maroon reveal-up stagger-1${ctaInView ? " in-view" : ""}`}>
            Ready to stay?
          </p>
          <h2 className={`mt-3 text-3xl sm:text-4xl font-bold text-brand-ink reveal-up stagger-2${ctaInView ? " in-view" : ""}`}>
            A real conversation, not a checkout
          </h2>
          <p className={`mt-4 max-w-lg mx-auto text-brand-ink/65 reveal-up stagger-3${ctaInView ? " in-view" : ""}`}>
            Pick your dates, then call or WhatsApp directly — we'll confirm everything and share
            your access code.
          </p>
          <div className={`mt-10 flex justify-center gap-4 flex-wrap reveal-up stagger-4${ctaInView ? " in-view" : ""}`}>
            <Link to="/booking" className="btn-primary">
              Check availability
            </Link>
            <a
              href={`https://wa.me/${site.contact.whatsappE164}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
