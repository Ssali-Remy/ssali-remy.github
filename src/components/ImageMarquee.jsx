export default function ImageMarquee({
  images,
  direction = "left",
  duration = 38,
  cardClassName = "w-64 h-44 sm:w-72 sm:h-48 md:w-80 md:h-56",
}) {
  const reel = [...images, ...images];
  const dirClass = direction === "left" ? "marquee-left" : "marquee-right";
  return (
    <div className={`marquee ${dirClass}`}>
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        {reel.map((src, i) => (
          <div
            key={i}
            className={`shrink-0 rounded-2xl overflow-hidden shadow-soft ${cardClassName}`}
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
    </div>
  );
}
