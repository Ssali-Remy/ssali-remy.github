import { useParams, Navigate, Link } from "react-router-dom";
import Section from "../components/Section";
import UnitCard from "../components/UnitCard";
import SmartImage from "../components/SmartImage";
import { units, locationsById } from "../data/units";
import { gallery } from "../data/gallery";
import { compound1, compound3 } from "../data/images-hero";
import { m3Cover } from "../data/images-m3";
import { site } from "../data/site";

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
  const heroImg = HERO_BY_LOCATION[id] || compound1;

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/60 to-brand-cream" />
        <div className="container-x relative grid gap-10 py-16 lg:grid-cols-2 items-center">
          <div>
            <span className="pill">{loc.name}, Kampala</span>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">{loc.name}</h1>
            <p className="mt-2 text-sm text-brand-ink/55">{loc.address}</p>
            <p className="mt-5 text-lg text-brand-ink/75">{loc.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/booking" className="btn-primary">
                Check availability
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

      <Section id="units" eyebrow="Apartments" title={`Stays in ${loc.name}`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locUnits.map((u) => (
            <UnitCard key={u.id} unit={u} />
          ))}
        </div>
      </Section>

      <Section className="bg-brand-beige/40" eyebrow="What's inside" title="A house ready to live in">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl text-brand-maroon">Features</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {loc.features.map((f) => (
                <li key={f} className="flex gap-2 items-start text-brand-ink/80 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-maroon" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl text-brand-maroon">Quick facts</h3>
            <dl className="mt-4 grid gap-3">
              <Fact label="Check-in">{site.checkIn}</Fact>
              <Fact label="Check-out">{site.checkOut}</Fact>
              <Fact label="Parking">Free, on-site — no permit required</Fact>
              <Fact label="Wi-Fi">Strongest in the living room and kitchen</Fact>
              <Fact label="On-site contact">Caretaker · {site.contact.caretakerPhone}</Fact>
              <Fact label="Booking">Phone or WhatsApp the host — no online card payments</Fact>
            </dl>
          </div>
        </div>
      </Section>

      <Section eyebrow="Nearby places" title="What's around you">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loc.nearby.map(([place, where]) => (
            <li key={place} className="card p-4">
              <p className="font-medium text-brand-ink">{place}</p>
              <p className="mt-1 text-sm text-brand-ink/60">📍 {where}</p>
            </li>
          ))}
        </ul>
      </Section>

      {locGallery.length > 0 && (
        <Section eyebrow="Gallery" title={`${loc.name} in pictures`} className="bg-brand-beige/40">
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

function Fact({ label, children }) {
  return (
    <div className="card px-5 py-3">
      <dt className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">{label}</dt>
      <dd className="mt-1 text-brand-ink">{children}</dd>
    </div>
  );
}
