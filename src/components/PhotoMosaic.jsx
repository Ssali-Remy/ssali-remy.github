import { useEffect, useState, useCallback } from "react";

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

/* Full-screen single-image viewer with prev/next. */
function Lightbox({ images, index, setIndex, onClose }) {
  const go = useCallback(
    (delta) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length, setIndex],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        aria-label="Previous photo"
        className="absolute left-3 sm:left-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <img
        src={images[index]}
        alt={`Photo ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain"
      />

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); go(1); }}
        aria-label="Next photo"
        className="absolute right-3 sm:right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

function AllPhotosOverlay({ images, categories, label, onClose }) {
  const [lightbox, setLightbox] = useState(null); // index into `images` or null

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  useEffect(() => {
    if (lightbox !== null) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, onClose]);

  // Map a src to its position in the flat `images` array for the lightbox.
  const openAt = (src) => setLightbox(images.indexOf(src));

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

      <div className="mx-auto max-w-5xl px-4 sm:px-8 pb-16">
        {categories && categories.length > 0 ? (
          categories.map(({ category, images: catImages }) => (
            <div key={category} className="mb-12 last:mb-0">
              <div className="flex items-center gap-4 mb-5">
                <h3 className="text-lg font-semibold text-brand-ink shrink-0">{category}</h3>
                <span className="h-px flex-1 bg-brand-sand" />
                <span className="text-xs text-brand-ink/50 shrink-0">
                  {catImages.length} photo{catImages.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {catImages.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openAt(src)}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                    aria-label={`View ${category} photo ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${label} — ${category} ${i + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                aria-label={`View photo ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`${label} photo ${i + 1}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox !== null && (
        <Lightbox
          images={images}
          index={lightbox}
          setIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/**
 * Airbnb-style photo grid: one large image on the left, a 2x2 grid of
 * four on the right, and a "Show all photos" button over the corner.
 * Every thumbnail opens a full-screen lightbox with prev/next.
 */
export default function PhotoMosaic({ images, categories, label = "Photos" }) {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [main, ...rest] = images;
  const four = rest.slice(0, 4);

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-2 h-[300px] sm:h-[380px] rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setLightbox(0)}
            className="col-span-2 row-span-2 group relative overflow-hidden"
            aria-label={`View ${label} main photo`}
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
              onClick={() => setLightbox(i + 1)}
              className="group relative overflow-hidden"
              aria-label={`View ${label} photo ${i + 2}`}
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

      {lightbox !== null && (
        <Lightbox
          images={images}
          index={lightbox}
          setIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}

      {showAll && (
        <AllPhotosOverlay
          images={images}
          categories={categories}
          label={label}
          onClose={() => setShowAll(false)}
        />
      )}
    </>
  );
}
