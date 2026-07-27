import { useEffect, useState } from "react";

function GridIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="3" cy="3" r="1.4" />
      <circle cx="8" cy="3" r="1.4" />
      <circle cx="13" cy="3" r="1.4" />
      <circle cx="3" cy="8" r="1.4" />
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="13" cy="8" r="1.4" />
      <circle cx="3" cy="13" r="1.4" />
      <circle cx="8" cy="13" r="1.4" />
      <circle cx="13" cy="13" r="1.4" />
    </svg>
  );
}

function AllPhotosOverlay({ images, label, onClose }) {
  // Close on Escape, and stop the page behind from scrolling.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`All photos — ${label}`}
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-cream"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between bg-brand-cream/95 backdrop-blur px-4 sm:px-8 py-4">
        <h2 className="font-semibold text-brand-ink">{label}</h2>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-ink shadow-soft transition hover:bg-brand-maroon hover:text-white"
          aria-label="Close photo gallery"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-8 pb-16 grid gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${label} photo ${i + 1}`}
            className="w-full rounded-2xl object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Airbnb-style photo grid: one large image on the left, a 2x2 grid of
 * four on the right, and a "Show all photos" button over the corner.
 * Stacks to a single column on small screens.
 */
export default function PhotoMosaic({ images, label = "Photos" }) {
  const [showAll, setShowAll] = useState(false);
  const [main, ...rest] = images;
  const four = rest.slice(0, 4);

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-2 h-[300px] sm:h-[380px] rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="col-span-2 row-span-2 group relative overflow-hidden"
            aria-label={`Open all ${label} photos`}
          >
            <img
              src={main}
              alt={`${label} — main`}
              className="h-full w-full object-cover transition duration-500 group-hover:brightness-95"
            />
          </button>

          {four.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setShowAll(true)}
              className="group relative overflow-hidden"
              aria-label={`Open all ${label} photos`}
            >
              <img
                src={src}
                alt={`${label} photo ${i + 2}`}
                className="h-full w-full object-cover transition duration-500 group-hover:brightness-95"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-brand-ink shadow-soft ring-1 ring-black/10 transition hover:bg-brand-beige"
        >
          <GridIcon className="h-3.5 w-3.5" />
          Show all photos
        </button>
      </div>

      {showAll && (
        <AllPhotosOverlay
          images={images}
          label={label}
          onClose={() => setShowAll(false)}
        />
      )}
    </>
  );
}
