import { useState } from "react";
import Section from "../components/Section";
import { site } from "../data/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.email}`);
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section
      eyebrow="Get in touch"
      title="Contact & Inquiries"
      subtitle="Questions about availability, group stays or long-term rates? Send us a note — we usually reply within a few hours."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <ContactRow
            label="Phone"
            value={site.contact.phone}
            href={`tel:${site.contact.phoneE164}`}
          />
          <ContactRow
            label="Email"
            value={site.contact.email}
            href={`mailto:${site.contact.email}`}
          />
          <ContactRow label="Address" value="Kampala, Uganda" />
          <div className="card p-6">
            <h3 className="font-display text-xl">Follow us</h3>
            <div className="mt-3 flex gap-3 text-sm">
              <a
                href={site.contact.facebook}
                className="rounded-full bg-brand-beige px-4 py-2 text-brand-maroon"
              >
                Facebook
              </a>
              <a
                href={site.contact.instagram}
                className="rounded-full bg-brand-beige px-4 py-2 text-brand-maroon"
              >
                Instagram
              </a>
              <a
                href={site.contact.twitter}
                className="rounded-full bg-brand-beige px-4 py-2 text-brand-maroon"
              >
                X
              </a>
            </div>
          </div>
        </div>
        <form onSubmit={submit} className="card p-6 sm:p-8 space-y-4">
          <div>
            <label className="label">Your Name</label>
            <input
              required
              className="input"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              required
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Message</label>
            <textarea
              required
              rows="5"
              className="input"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
          {sent && (
            <p className="text-sm text-green-700 text-center">
              Opening your email client…
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

function ContactRow({ label, value, href }) {
  const content = (
    <>
      <span className="text-xs uppercase tracking-[0.2em] text-brand-sienna font-semibold">
        {label}
      </span>
      <p className="mt-1 font-display text-2xl text-brand-maroon">{value}</p>
    </>
  );
  return (
    <div className="card p-6">
      {href ? (
        <a href={href} className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
