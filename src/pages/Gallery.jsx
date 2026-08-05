import { useState } from "react";
import Section from "../components/Section";
import SmartImage from "../components/SmartImage";
import { gallery } from "../data/gallery";
import { locations } from "../data/units";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const items =
    filter === "all" ? gallery : gallery.filter((g) => g.location === filter);
  return (
    <>
      <Section
        eyebrow="Gallery"
        title="A Peek Inside"
        subtitle="Spaces, gardens and details from our properties — segmented by location."
      >
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="All"
          />
          {locations.map((l) => (
            <FilterPill
              key={l.id}
              active={filter === l.id}
              onClick={() => setFilter(l.id)}
              label={l.name}
            />
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <div
              key={g.src}
              className="aspect-[4/3] overflow-hidden rounded-2xl shadow-soft group"
            >
              <SmartImage
                src={g.src}
                alt={g.alt}
                fallbackLabel={g.alt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function FilterPill({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-brand-maroon text-brand-cream"
          : "bg-white text-brand-ink hover:bg-brand-beige"
      }`}
    >
      {label}
    </button>
  );
}
