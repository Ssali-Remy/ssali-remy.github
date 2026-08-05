import { useParams, Navigate, Link } from "react-router-dom";
import PhotoMosaic from "../components/PhotoMosaic";
import { unitsById, locationsById, nearbyMapUrl } from "../data/units";

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
        <h1 className="mt-3 text-2xl sm:text-3xl font-semibold text-brand-ink">
          {unit.name}
          {unit.altName && (
            <span className="text-brand-maroon"> — {unit.altName}</span>
          )}
        </h1>
        <p className="mt-2 text-brand-ink/75">{unit.tagline}</p>
      </header>

      {/* Images */}
      <PhotoMosaic images={images} categories={unit.photoCategories} label={unit.name} />

      {/* Nearby places */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-ink mb-4">
          Nearby Places
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loc.nearby.map(([place, where]) => (
            <li key={place}>
              <a
                href={nearbyMapUrl(place, where)}
                target="_blank"
                rel="noreferrer"
                className="card p-5 block transition hover:ring-2 hover:ring-brand-maroon/20 hover:shadow-md"
              >
                <p className="font-semibold text-brand-ink flex items-center gap-2">
                  <span className="text-brand-maroon">📍</span>
                  {place}
                </p>
                <p className="mt-1 text-sm text-brand-ink/65">{where}</p>
                <span className="mt-2 inline-block text-xs font-medium text-brand-maroon">
                  View on Google Maps →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Book now */}
      <section>
        <Link to={`/booking?unit=${unit.id}`} className="btn-primary">
          Book Now
        </Link>
      </section>

      {/* Map — at the bottom of every unit page */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-ink mb-4">
          Where You&apos;ll Be
        </h2>
        <p className="text-sm text-brand-ink/60 mb-4">{loc.address}</p>
        <div className="overflow-hidden rounded-3xl border border-brand-beige shadow-soft">
          <iframe
            title={`Map of ${unit.name} — ${loc.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(loc.address)}&z=16&output=embed`}
            className="h-[380px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
