import { useParams, Navigate, Link } from "react-router-dom";
import PhotoMosaic from "../components/PhotoMosaic";
import { unitsById } from "../data/units";

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
      <PhotoMosaic images={images} categories={unit.photoCategories} label={unit.name} />

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
