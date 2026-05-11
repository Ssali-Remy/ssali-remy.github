import { useParams, Navigate, Link } from "react-router-dom";
import Section from "../components/Section";
import UnitCard from "../components/UnitCard";
import SmartImage from "../components/SmartImage";
import { units, locationsById } from "../data/units";
import { gallery } from "../data/gallery";
import { compound1, compound3 } from "../data/images-hero";
import { m3Cover } from "../data/images-m3";

const HERO_BY_LOCATION = {
  kansanga: compound3,
  munyonyo: m3Cover,
};

export default function Location() {
  const { id } = useParams();
  const loc = locationsById[id];
  if (!loc) return <Navigate to="/" replace />;

  const locUnits = units.filter((u) => u.locationId === id);
  const locGallery = gallery.filter((g) => g.location === id);
  const hasInfo = locUnits.length > 0;
  const heroImg = HERO_BY_LOCATION[id] || compound1;

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/60 to-brand-cream" />
        <div className="container-x relative grid gap-10 py-16 lg:grid-cols-2 items-center">
          <div>
            <span className="pill">{loc.name}, Kampala</span>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">{loc.name}</h1>
            <p className="mt-5 text-lg text-brand-ink/75">{loc.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/booking" className="btn-primary">
                Book at {loc.name}
              </Link>
              <a href="#units" className="btn-ghost">
                View apartments
              </a>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-soft">
            <SmartImage
              src={heroImg}
              alt={loc.name}
              fallbackLabel={loc.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {hasInfo ? (
        <Section id="units" eyebrow="Apartments" title={`Stays in ${loc.name}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locUnits.map((u) => (
              <UnitCard key={u.id} unit={u} />
            ))}
          </div>
        </Section>
      ) : (
        <Section
          align="center"
          title="More info coming soon"
          subtitle="We're polishing details for this location. Reach out and we'll share what's available."
        />
      )}

      <Section className="bg-brand-beige/40">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Features</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {loc.features.map((f) => (
                <li key={f} className="flex gap-2 items-start text-brand-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-maroon" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl">Local amenities</h2>
            <ul className="mt-5 divide-y divide-brand-sand/60 rounded-2xl bg-white shadow-soft">
              {loc.amenities.map(([place, dist]) => (
                <li key={place} className="flex items-center justify-between px-5 py-3">
                  <span className="text-brand-ink/85">{place}</span>
                  <span className="text-sm text-brand-sienna font-medium">{dist}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {locGallery.length > 0 && (
        <Section eyebrow="Gallery" title={`${loc.name} in pictures`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {locGallery.map((g) => (
              <div
                key={g.src.slice(0, 80)}
                className="aspect-[4/3] overflow-hidden rounded-2xl shadow-soft"
              >
                <SmartImage
                  src={g.src}
                  alt={g.alt}
                  fallbackLabel={g.alt}
                  className="h-full w-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="Map" title="How to find us">
        <div className="overflow-hidden rounded-3xl shadow-soft border border-brand-sand">
          <iframe
            title={`Map of ${loc.name}`}
            src={loc.mapEmbed}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}
