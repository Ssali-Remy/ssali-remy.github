import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Close menu on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`navbar-enter sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-brand-cream/90 backdrop-blur-md shadow-sm"
          : "bg-brand-cream/60 backdrop-blur"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger — holds Home & Contact, sits right before Book Now */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-haspopup="true"
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-ink transition hover:bg-brand-beige"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
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

            {open && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 min-w-[11rem] rounded-2xl border border-brand-sand bg-brand-cream p-2 shadow-soft"
              >
                {LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
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
          </div>

          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
