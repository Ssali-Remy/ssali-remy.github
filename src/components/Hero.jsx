import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroBackgrounds } from "../data/units";

export default function Hero() {
  const [active, setActive] = useState(0);

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
        <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
      </div>

      <div
        className="container-x relative animate-fadeUp"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-beige" />
          Kansanga · Munyonyo · Kampala
        </span>
        <h1 className="mt-5 font-display leading-[1.05] text-white max-w-4xl">
          <span className="block font-sketch text-brand-beige text-6xl sm:text-7xl lg:text-8xl">
            Simple Made Perfect.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/95">
          We've poured a lot of love into our homes to make them as convenient,
          comfortable and welcoming as possible — whether you're here to relax,
          explore, or work remotely.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/booking" className="btn-primary">
            Check availability
          </Link>
          <Link
            to="/locations/kansanga"
            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white hover:text-brand-maroon"
          >
            Explore properties
          </Link>
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md text-white">
          <Stat n="3" l="Units" />
          <Stat n="2" l="Locations" />
          <Stat n="24/7" l="Security" />
        </dl>
      </div>

      {heroBackgrounds?.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroBackgrounds.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-white" : "w-1.5 bg-white/50"
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
      <dd className="text-xs uppercase tracking-wider text-white/80">{l}</dd>
    </div>
  );
}
