import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { heroBackgrounds } from "../data/units";
import { k1Cover, k1Img1, k1Img2 } from "../data/images-k1";
import { k2Cover, k2Img1 } from "../data/images-k2";
import { m3Cover, m3Img1, m3Img2 } from "../data/images-m3";
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

const IMG_INTERVAL = 3500;
const TXT_INTERVAL = IMG_INTERVAL * 2; // 7000ms

function ImageCell({ images, className = "" }) {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCur((i) => { setPrev(i); setFading(false); return (i + 1) % images.length; });
    }, IMG_INTERVAL);
    return () => clearInterval(t);
  }, [images.length]);

  // One paint after prev appears at opacity 1, trigger the fade-out
  useEffect(() => {
    if (prev === null) return;
    const raf = requestAnimationFrame(() => setFading(true));
    return () => cancelAnimationFrame(raf);
  }, [prev, cur]);

  return (
    <div className={`relative overflow-hidden rounded-2xl min-h-[210px] ${className}`}>
      <img src={images[cur]} alt="" className="absolute inset-0 w-full h-full object-cover" />
      {prev !== null && (
        <img
          src={images[prev]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: fading ? 0 : 1 }}
        />
      )}
    </div>
  );
}

function TextCell({ slides, className = "", style }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), TXT_INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl min-h-[210px] ${className}`}
      style={style}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 p-6 flex flex-col justify-center transition-opacity duration-[1400ms]"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <h3 className="text-xl font-bold text-brand-ink">{slide.title}</h3>
          <p className="mt-2 text-sm text-brand-ink/70 leading-relaxed">{slide.body}</p>
          <Link
            to={slide.linkTo}
            className="mt-4 text-sm font-semibold text-brand-maroon hover:text-brand-burgundy transition-colors"
          >
            {slide.link} →
          </Link>
        </div>
      ))}
    </div>
  );
}

const KANSANGA_SLIDES = [
  {
    title: "Kansanga Duplex",
    body: "Two spacious wings on a quiet hill — fully air-conditioned, Smart TV with Netflix & DStv, and a kitchen stocked for real cooking.",
    link: "Explore Kansanga",
    linkTo: "/locations/kansanga",
  },
  {
    title: "Unit One — E1 Wing",
    body: "2 bedrooms · 2 bathrooms · sleeps 4. Air conditioning in every room plus power back-up so you never lose Wi-Fi or AC.",
    link: "View unit",
    linkTo: "/locations/kansanga",
  },
  {
    title: "Unit Two — E2 Wing",
    body: "Modern, spacious wing with a private feel. Enjoy the garden, housekeeping six days a week, and free parking.",
    link: "View unit",
    linkTo: "/locations/kansanga",
  },
];

const MUNYONYO_SLIDES = [
  {
    title: "Munyonyo Retreat",
    body: "Tucked on Baguma Rise, minutes from Speke Resort and Lake Victoria. Calm, secure, and beautifully appointed.",
    link: "Explore Munyonyo",
    linkTo: "/locations/munyonyo",
  },
  {
    title: "Lakeside Proximity",
    body: "Minutes from the Lake Victoria shoreline and Munyonyo Commonwealth Resort — a perfect base for leisure and business alike.",
    link: "Explore Munyonyo",
    linkTo: "/locations/munyonyo",
  },
  {
    title: "Peace & Privacy",
    body: "24/7 security, power back-up, strong Wi-Fi, and housekeeping included — every comfort taken care of.",
    link: "Check availability",
    linkTo: "/booking",
  },
];

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

      {/* Check Availability — moved here, just before the mosaic */}
      <div style={{ backgroundColor: "#fff3f0" }} className="pb-16 text-center">
        <Link to="/booking" className="btn-primary">
          Check availability
        </Link>
      </div>

      <SectionFade from="#fff3f0" to="#f3eed9" />

      {/* Mosaic — picture + text teasers */}
      <section style={{ backgroundColor: "#f3eed9" }} className="py-16">
        <div ref={mosaicRef} className="container-x">
          <p className={`text-xs uppercase tracking-[0.2em] font-semibold text-brand-maroon reveal-up stagger-1${mosaicInView ? " in-view" : ""}`}>
            A glimpse inside
          </p>
          <h2 className={`mt-2 text-3xl sm:text-4xl font-bold text-brand-ink reveal-up stagger-2${mosaicInView ? " in-view" : ""}`}>
            Life at Elyon Nest
          </h2>
          <p className={`mt-3 text-brand-ink/65 reveal-up stagger-3${mosaicInView ? " in-view" : ""}`}>
            Every corner crafted with care — here is a taste of what awaits.
          </p>

          <div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3"
            style={{ gridTemplateRows: "repeat(3, 210px)" }}
          >
            <ImageCell
              images={[k1Cover, k2Cover, m3Cover, k1Img1]}
              className={`md:col-span-2 md:row-span-2 reveal-up stagger-1${mosaicInView ? " in-view" : ""}`}
            />
            <TextCell
              slides={KANSANGA_SLIDES}
              className={`bg-white reveal-up stagger-2${mosaicInView ? " in-view" : ""}`}
            />
            <ImageCell
              images={[m3Img1, k1Img2, k2Img1]}
              className={`reveal-up stagger-3${mosaicInView ? " in-view" : ""}`}
            />
            <TextCell
              slides={MUNYONYO_SLIDES}
              className={`reveal-up stagger-4${mosaicInView ? " in-view" : ""}`}
              style={{ background: "rgba(91,26,26,0.05)", border: "1px solid rgba(91,26,26,0.12)" }}
            />
            <ImageCell
              images={[k2Cover, m3Img2, k1Img1]}
              className={`reveal-up stagger-5${mosaicInView ? " in-view" : ""}`}
            />
            <ImageCell
              images={[m3Cover, k2Img1, k1Img2]}
              className={`reveal-up stagger-6${mosaicInView ? " in-view" : ""}`}
            />
          </div>
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
