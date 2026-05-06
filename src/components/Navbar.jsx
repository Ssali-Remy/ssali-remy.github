import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/locations/kansanga", label: "Kansanga" },
  { to: "/locations/munyonyo", label: "Munyonyo" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-brand-cream/90 backdrop-blur-md shadow-sm"
          : "bg-brand-cream/60 backdrop-blur"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-maroon text-brand-cream"
                    : "text-brand-ink hover:text-brand-maroon"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>
        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-brand-maroon"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-brand-beige bg-brand-cream">
          <nav className="container-x flex flex-col py-4 gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium ${
                    isActive
                      ? "bg-brand-maroon text-brand-cream"
                      : "text-brand-ink hover:bg-brand-beige"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
