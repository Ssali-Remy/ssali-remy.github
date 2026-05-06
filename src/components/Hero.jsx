import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-beige via-brand-cream to-brand-sand/40" />
      <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand-maroon/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-sienna/10 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="animate-fadeUp">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-maroon" />
            Now booking · Kampala
          </span>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            A perfect bolthole.
            <span className="block font-sketch text-brand-sienna text-5xl mt-2">
              Simple Made Perfect.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-ink/75">
            Boutique self-catering apartments in Kansanga and Munyonyo —
            modern, secure and styled for both short escapes and long stays.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/booking" className="btn-primary">
              Book your stay
            </Link>
            <Link to="/locations/kansanga" className="btn-ghost">
              Explore properties
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat n="5" l="Units" />
            <Stat n="2" l="Locations" />
            <Stat n="24/7" l="Security" />
          </dl>
        </div>
        <div className="relative">
          <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[28rem] lg:h-[32rem]">
            <div className="col-span-4 row-span-4 rounded-3xl overflow-hidden shadow-soft animate-fadeUp">
              <SmartImage
                src="/images/gallery/kansanga-1.jpg"
                alt="Kansanga apartment"
                fallbackLabel="Kansanga"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden shadow-soft animate-fadeUp [animation-delay:0.1s]">
              <SmartImage
                src="/images/gallery/kansanga-2.jpg"
                alt="Sitting room"
                fallbackLabel="Living Room"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden shadow-soft animate-fadeUp [animation-delay:0.2s]">
              <SmartImage
                src="/images/gallery/munyonyo-1.jpg"
                alt="Munyonyo apartment"
                fallbackLabel="Munyonyo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-4 row-span-2 rounded-3xl overflow-hidden shadow-soft animate-fadeUp [animation-delay:0.3s]">
              <SmartImage
                src="/images/gallery/kansanga-3.jpg"
                alt="Bedroom"
                fallbackLabel="Bedroom"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <dt className="font-display text-3xl text-brand-maroon">{n}</dt>
      <dd className="text-xs uppercase tracking-wider text-brand-ink/60">
        {l}
      </dd>
    </div>
  );
}
