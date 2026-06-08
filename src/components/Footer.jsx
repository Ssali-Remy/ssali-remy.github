import { Link } from "react-router-dom";
import { site } from "../data/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-maroon text-brand-cream">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="bg-brand-cream rounded-2xl p-4 inline-flex">
            <Logo />
          </div>
          <p className="mt-4 font-sketch text-2xl text-brand-beige">{site.slogan}</p>
          <p className="mt-2 text-sm text-brand-cream/70">
            Boutique self-catering apartments in Kampala — Kansanga & Munyonyo.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg text-brand-cream">Visit</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-cream/80">
            <li><Link to="/" className="hover:text-brand-beige">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-beige">About Us</Link></li>
            <li><Link to="/locations/kansanga" className="hover:text-brand-beige">Kansanga</Link></li>
            <li><Link to="/locations/munyonyo" className="hover:text-brand-beige">Munyonyo</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-beige">Gallery</Link></li>
            <li><Link to="/booking" className="hover:text-brand-beige">Check availability</Link></li>
            <li><Link to="/contact" className="hover:text-brand-beige">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-brand-cream">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-cream/80">
            <li>Host: {site.contact.host}</li>
            <li>
              <a href={`tel:${site.contact.phoneE164}`} className="hover:text-brand-beige">
                {site.contact.phone}
              </a>
            </li>
            <li>Caretaker: {site.contact.caretakerPhone}</li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-brand-beige">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-brand-cream">Locations</h4>
          <ul className="mt-3 space-y-3 text-sm text-brand-cream/80">
            <li>📍 {site.addresses.kansanga}</li>
            <li>📍 {site.addresses.munyonyo}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <Social href={site.contact.facebook} label="Facebook">
              <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.8 3.6-3.8 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 3h-2.3v7A10 10 0 0022 12z" />
            </Social>
            <Social href={site.contact.instagram} label="Instagram">
              <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.9.3 2.4.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.4 1.2.4 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.3 1.9-.4 2.4-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.5.2-1.2.4-2.4.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.9-.3-2.4-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.5-.4-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.3-1.9.4-2.4.2-.6.5-1 1-1.5s.9-.8 1.5-1c.5-.2 1.2-.4 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2H7.4c-1 .1-1.5.2-1.9.4-.5.2-.8.4-1.2.7-.3.4-.5.7-.7 1.2-.1.4-.3 1-.4 1.9 0 1.1-.1 1.5-.1 4.6s0 3.5.1 4.6c.1 1 .2 1.5.4 1.9.2.5.4.8.7 1.2.4.3.7.5 1.2.7.4.1 1 .3 1.9.4 1.1 0 1.5.1 4.6.1s3.5 0 4.6-.1c1-.1 1.5-.2 1.9-.4.5-.2.8-.4 1.2-.7.3-.4.5-.7.7-1.2.1-.4.3-1 .4-1.9 0-1.1.1-1.5.1-4.6s0-3.5-.1-4.6c-.1-1-.2-1.5-.4-1.9-.2-.5-.4-.8-.7-1.2-.4-.3-.7-.5-1.2-.7-.4-.1-1-.3-1.9-.4-1.1 0-1.5-.1-4.6-.1zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.3-3.4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </Social>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-cream/10">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-brand-cream/60">
          <p>© {new Date().getFullYear()} Elyon Nest. All rights reserved.</p>
          <p>Built with care in Kampala, Uganda.</p>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-cream/10 transition hover:bg-brand-beige hover:text-brand-maroon"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}
