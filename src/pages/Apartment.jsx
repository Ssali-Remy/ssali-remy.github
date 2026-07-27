import { useParams, Navigate, Link } from "react-router-dom";
import PhotoMosaic from "../components/PhotoMosaic";
import { unitsById, locationsById } from "../data/units";

export default function Apartment() {
  const { id } = useParams();
  const unit = unitsById[id];
  if (!unit) return <Navigate to="/" replace />;

  const loc = locationsById[unit.locationId];
  const images = [unit.cover, ...unit.gallery];
  const bedroomLabel = `${unit.bedrooms} Bedroom${unit.bedrooms > 1 ? "s" : ""}`;

  return (
    <div className="container-x py-8 space-y-14">
      {/* Title */}
      <header>
        <span className="pill">
          {unit.location} · {bedroomLabel}
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-ink">
          {unit.name}
          {unit.altName && (
            <span className="text-brand-maroon"> — {unit.altName}</span>
          )}
        </h1>
        <p className="mt-3 text-lg text-brand-ink/75 max-w-2xl">{unit.tagline}</p>
      </header>

      {/* Images */}
      <PhotoMosaic images={images} categories={unit.photoCategories} label={unit.name} />

      {/* Nearby places */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-4">
          Nearby places
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loc.nearby.map(([place, where]) => (
            <li key={place} className="card p-5">
              <p className="font-semibold text-brand-ink flex items-center gap-2">
                <span className="text-brand-maroon">📍</span>
                {place}
              </p>
              <p className="mt-1 text-sm text-brand-ink/65">{where}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Book now */}
      <section className="text-center">
        <Link
          to={`/booking?unit=${unit.id}`}
          className="btn-primary inline-flex text-lg px-10 py-4"
        >
          Book Now
        </Link>
      </section>

      {/* Map — at the bottom of every unit page */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-4">
          Where you&apos;ll be
        </h2>
        <p className="text-sm text-brand-ink/60 mb-4">{loc.address}</p>
        <div className="overflow-hidden rounded-3xl border border-brand-beige shadow-soft">
          <iframe
            title={`Map of ${unit.name} — ${loc.name}`}
            src={loc.mapEmbed}
            className="h-[380px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
