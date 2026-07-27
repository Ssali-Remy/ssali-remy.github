import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PhotoMosaic from "../components/PhotoMosaic";
import Partners from "../components/Partners";
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
    // `options` is only ever passed as a fresh object literal (or omitted) by
    // every call site, and this observer is meant to attach once on mount —
    // re-running it on every options identity change would defeat that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
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
    desc: "In all rooms",
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
    desc: "Upto six days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M12 12h.01M8 12h.01M16 12h.01" strokeLinecap="round" />
        <path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Power Back-up",
    desc: "Covers every power outage",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "DStv & Netflix",
    desc: "Smart TV with DStv, Netflix",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        <path d="M10 8.5l5 3-5 3v-6z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

// Ordered with shared/common areas (living, bar, kitchen) first,
// bedrooms and private rooms last.
const KANSANGA_REEL = [
  k1Cover, k1Img1, k1Img2, k2Cover, k2Img1, k2Img2,
  k1Img3, k1Img4, k2Img3, k2Img4,
];
const MUNYONYO_REEL = [m3Cover, m3Img2, m3Img3, m3Img1, m3Img4];

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

  return (
    <>
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
          <div className={`container-x mt-5 reveal-up stagger-3${mosaicInView ? " in-view" : ""}`}>
            <PhotoMosaic images={KANSANGA_REEL} label="Kansanga" />
          </div>
        </div>

        <div className="mt-12">
          <div className="container-x">
            <h3 className={`text-2xl font-bold text-brand-maroon tracking-[0.3em] reveal-up stagger-4${mosaicInView ? " in-view" : ""}`}>
              MUNYONYO
            </h3>
          </div>
          <div className={`container-x mt-5 reveal-up stagger-5${mosaicInView ? " in-view" : ""}`}>
            <PhotoMosaic images={MUNYONYO_REEL} label="Munyonyo" />
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
            <h2 className={`text-3xl sm:text-4xl font-bold text-brand-ink reveal-up stagger-1${amenInView ? " in-view" : ""}`}>
              Amenities
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionFade from="#fff3f0" to="#f3eed9" />

      {/* Partners */}
      <section style={{ backgroundColor: "#f3eed9" }} className="py-16">
        <div ref={partRef} />
        <div className={`container-x reveal-up stagger-2${partInView ? " in-view" : ""}`}>
          <Partners />
        </div>
      </section>


    </>
  );
}
