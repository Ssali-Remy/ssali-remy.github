import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";

const LOCATIONS = [
  { to: "/locations/kansanga", label: "Kansanga" },
  { to: "/locations/munyonyo", label: "Munyonyo" },
];

const TOP_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
];

const TAIL_LINKS = [{ to: "/contact", label: "Contact" }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [mobileLocOpen, setMobileLocOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();
  const onLocations = pathname.startsWith("/locations/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop dropdown on outside click or Escape
  useEffect(() => {
    if (!locOpen) return;
    const onDown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setLocOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setLocOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [locOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
    setMobileLocOpen(false);
    setLocOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-brand-maroon text-brand-cream"
        : "text-brand-ink hover:text-brand-maroon"
    }`;

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
          {TOP_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}

          {/* Locations dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setLocOpen(true)}
            onMouseLeave={() => setLocOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLocOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={locOpen}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                onLocations
                  ? "bg-brand-maroon text-brand-cream"
                  : "text-brand-ink hover:text-brand-maroon"
              }`}
            >
              Locations
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform ${locOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {locOpen && (
              <div
                role="menu"
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2"
              >
                <div className="min-w-[10rem] rounded-2xl border border-brand-beige bg-brand-cream shadow-soft p-2">
                  {LOCATIONS.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={() => setLocOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-brand-maroon text-brand-cream"
                            : "text-brand-ink hover:bg-brand-beige"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {TAIL_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
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
            {TOP_LINKS.map((l) => (
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

            {/* Mobile Locations expander */}
            <button
              type="button"
              onClick={() => setMobileLocOpen((v) => !v)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium ${
                onLocations
                  ? "bg-brand-maroon text-brand-cream"
                  : "text-brand-ink hover:bg-brand-beige"
              }`}
              aria-expanded={mobileLocOpen}
            >
              <span>Locations</span>
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform ${mobileLocOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {mobileLocOpen && (
              <div className="pl-3">
                {LOCATIONS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-medium ${
                        isActive
                          ? "bg-brand-maroon text-brand-cream"
                          : "text-brand-ink hover:bg-brand-beige"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            )}

            {TAIL_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
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
