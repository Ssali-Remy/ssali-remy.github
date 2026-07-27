import { useRef } from "react";

function Arrow({ dir }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
      {dir === "left" ? (
        <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

/**
 * Button-driven image slider. Click the arrows to move one card at a
 * time; on touch devices you can also swipe (native scroll + snap).
 */
export default function ClickSlider({
  images,
  cardClassName = "w-64 h-44 sm:w-72 sm:h-48 md:w-80 md:h-56",
}) {
  const trackRef = useRef(null);

  const slide = (dirn) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-slide-card]");
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dirn * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 click-slider-track"
      >
        {images.map((src, i) => (
          <div
            key={i}
            data-slide-card
            className={`shrink-0 snap-start rounded-2xl overflow-hidden shadow-soft ${cardClassName}`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous images"
        onClick={() => slide(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-maroon shadow-soft ring-1 ring-brand-beige transition hover:bg-brand-maroon hover:text-white"
      >
        <Arrow dir="left" />
      </button>
      <button
        type="button"
        aria-label="Next images"
        onClick={() => slide(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-maroon shadow-soft ring-1 ring-brand-beige transition hover:bg-brand-maroon hover:text-white"
      >
        <Arrow dir="right" />
      </button>
    </div>
  );
}
