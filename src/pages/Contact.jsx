import { Link } from "react-router-dom";
import Section from "../components/Section";
import { site } from "../data/site";

function CallIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 01-6.59-6.58l2.2-2.21c.27-.27.35-.66.24-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.78 14.06c-.24.68-1.4 1.3-1.97 1.38-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.83-4.2-4.97-4.4-.15-.2-1.19-1.59-1.19-3.03 0-1.43.75-2.13 1.02-2.43.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.69.52.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.8 1.31 1.72 2.13 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.4-.25.68-.15.27.1 1.74.82 2.03.97.3.15.5.22.58.35.07.13.07.77-.17 1.45z" />
    </svg>
  );
}

// Map that shows both Kansanga and Munyonyo with a zoom that fits both.
// Centered roughly between Kansanga (0.286, 32.618) and Munyonyo (0.247, 32.636).
const MAP_EMBED =
  "https://www.google.com/maps?q=Kansanga+Munyonyo+Kampala&z=13&output=embed";

export default function Contact() {
  const waHref = `https://wa.me/${site.contact.whatsappE164}?text=${encodeURIComponent(
    "Hi Suubi, I'd like to enquire about Elyon Nest.",
  )}`;

  return (
    <Section
      eyebrow="Contact & Inquiries"
      title="We're just a message away"
      subtitle="WhatsApp us anytime — we usually reply within a few hours."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left column — Call, WhatsApp + email + emergency + socials */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-maroon text-brand-cream px-6 py-5 font-semibold text-lg transition hover:bg-brand-burgundy shadow-soft"
            >
              <CallIcon className="h-6 w-6" />
              Call us
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white px-6 py-5 font-semibold text-lg transition hover:bg-[#1ebd5d] shadow-soft"
            >
              <WhatsAppIcon className="h-6 w-6" />
              WhatsApp us
            </a>
          </div>

          <a
            href={`mailto:${site.contact.email}`}
            className="card p-5 block transition hover:ring-2 hover:ring-brand-maroon/20"
          >
            <span className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">
              Email
            </span>
            <p className="mt-1 font-display text-xl text-brand-maroon">
              {site.contact.email}
            </p>
          </a>

          <div className="card p-6 bg-brand-maroon text-brand-cream">
            <p className="font-display text-xl">In case of emergency</p>
            <ul className="mt-3 space-y-2 text-sm text-brand-cream/85">
              <li>Medical / Ambulance — +256 393 404 404 (Alexandra Medical Centre)</li>
              <li>Fire department — 999</li>
              <li>Police (non-emergency) — 999</li>
              <li>Nearest hospitals: IHK, St Francis Nsambya, Mukwaya General, AMC</li>
            </ul>
          </div>

          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">
              Follow
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-beige px-4 py-2 text-brand-maroon"
              >
                Instagram @elyonnest_ug
              </a>
              <a
                href={site.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-beige px-4 py-2 text-brand-maroon"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <Link to="/booking" className="btn-primary">
              Check availability
            </Link>
          </div>
        </div>

        {/* Right column — map */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-sienna font-semibold">
            Find us in Kampala
          </p>
          <div className="overflow-hidden rounded-3xl border border-brand-beige shadow-soft">
            <iframe
              title="Elyon Nest — Kansanga & Munyonyo"
              src={MAP_EMBED}
              className="h-[480px] lg:h-[600px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
