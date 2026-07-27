import { useParams, Navigate, Link } from "react-router-dom";
import PhotoMosaic from "../components/PhotoMosaic";
import { unitsById } from "../data/units";
import { HOUSE_RULES } from "../data/houseRules";

export default function Apartment() {
  const { id } = useParams();
  const unit = unitsById[id];
  if (!unit) return <Navigate to="/" replace />;

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
      <PhotoMosaic images={images} label={unit.name} />

      {/* Highlights */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-4">
          Highlights
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {unit.highlights.map((h) => (
            <li key={h} className="card p-5 flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-sienna shrink-0" />
              <span className="text-brand-ink/85">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* House Rules */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-4">
          House rules
        </h2>
        <p className="text-brand-ink/70 mb-6">
          We're so happy to host you! To ensure a comfortable stay for everyone,
          please follow these simple house rules:
        </p>
        <ol className="grid gap-4 sm:grid-cols-2 list-none">
          {HOUSE_RULES.map(([title, desc], i) => (
            <li key={title} className="card p-5 flex gap-4">
              <span className="font-display text-3xl text-brand-maroon shrink-0 leading-none">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-brand-ink">{title}</p>
                <p className="mt-1 text-sm text-brand-ink/65 leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-brand-ink/65 text-center italic">
          Thank you for understanding and helping us keep the space comfortable
          for all our guests!
        </p>
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
    </div>
  );
}
