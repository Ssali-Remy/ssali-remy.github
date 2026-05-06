import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";

export default function UnitCard({ unit, ctaTo = "/booking" }) {
  return (
    <article className="card group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={unit.cover}
          alt={`${unit.name} cover`}
          fallbackLabel={unit.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="pill bg-brand-cream/90">{unit.location}</span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-brand-maroon px-3 py-1 text-xs font-semibold text-brand-cream shadow-soft">
          From ${unit.pricing.day}/night
        </div>
      </div>
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div>
          <h3 className="font-display text-2xl">{unit.name}</h3>
          <p className="text-sm text-brand-ink/65">{unit.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-brand-ink/70">
          <Spec label={`${unit.bedrooms} bed`} />
          <Spec label={`${unit.bathrooms} bath`} />
          <Spec label={`Sleeps ${unit.sleeps}`} />
        </div>
        <ul className="mt-1 space-y-1 text-sm text-brand-ink/75">
          {unit.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-brand-sienna" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-xs text-brand-ink/60">From</p>
            <p className="font-display text-2xl text-brand-maroon">
              ${unit.pricing.day}
              <span className="text-sm font-sans text-brand-ink/60"> /night</span>
            </p>
          </div>
          <Link
            to={`${ctaTo}?unit=${unit.id}`}
            className="btn-primary text-sm py-2 px-5"
          >
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}

function Spec({ label }) {
  return (
    <span className="rounded-full bg-brand-beige/60 px-3 py-1">{label}</span>
  );
}
