export default function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  id,
  align = "left",
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="container-x">
        {(eyebrow || title || subtitle) && (
          <div
            className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.2em] text-brand-sienna font-semibold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-brand-ink/70">{subtitle}</p>
            )}
          </div>
        )}
        <div className={eyebrow || title || subtitle ? "mt-12" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}
