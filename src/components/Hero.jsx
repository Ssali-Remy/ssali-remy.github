import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroBackgrounds } from "../data/units";

export default function Hero() {
  const [active, setActive] = useState(0);

  // Rotate the background photo every 6 seconds
  useEffect(() => {
    if (!heroBackgrounds?.length) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % heroBackgrounds.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Background layer with crossfading photos */}
      <div className="absolute inset-0">
        {heroBackgrounds.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms]"
            style={{
              backgroundImage: `url("${src}")`,
              opacity: i === active ? 1 : 0,
            }}
          />
        ))}
        {/* Warm tint + darken overlay for text readability */}
        <div className="absolute inset-0 bg-brand-maroon/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/30 via-brand-ink/40 to-brand-ink/60" />
      </div>

      <div className="container-x relative animate-fadeUp">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream/15 backdrop-blur px-3 py-1 text-xs font-medium text-brand-cream ring-1 ring-brand-cream/20">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-beige" />
          Now booking · Kansanga & Munyonyo, Kampala
        </span>
        <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl text-brand-cream max-w-4xl">
          A perfect bolthole.
          <span className="block font-sketch text-brand-beige text-5xl sm:text-6xl mt-3">
            Simple Made Perfect.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-brand-cream/90">
          Boutique self-catering apartments in Kansanga and Munyonyo — modern,
          secure and styled for both short escapes and long stays.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/booking" className="btn-primary">
            Book your stay
          </Link>
          <Link
            to="/locations/kansanga"
            className="inline-flex items-center justify-center rounded-full border border-brand-cream/30 bg-brand-cream/5 px-6 py-3 font-medium text-brand-cream backdrop-blur transition hover:bg-brand-cream hover:text-brand-maroon"
          >
            Explore properties
          </Link>
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md text-brand-cream">
          <Stat n="3" l="Units" />
          <Stat n="2" l="Locations" />
          <Stat n="24/7" l="Security" />
        </dl>
      </div>

      {/* Bottom slide indicators */}
      {heroBackgrounds?.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroBackgrounds.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-brand-cream" : "w-1.5 bg-brand-cream/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <dt className="font-display text-3xl">{n}</dt>
      <dd className="text-xs uppercase tracking-wider text-brand-cream/70">
        {l}
      </dd>
    </div>
  );
}
