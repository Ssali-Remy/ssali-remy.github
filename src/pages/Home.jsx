import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Section from "../components/Section";
import UnitCard from "../components/UnitCard";
import SmartImage from "../components/SmartImage";
import PaymentMethods from "../components/PaymentMethods";
import { units, locations } from "../data/units";
import { reviews } from "../data/reviews";
import { site } from "../data/site";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        eyebrow="Our Apartments"
        title="Spaces that feel like home"
        subtitle="Five fully furnished apartments across two of Kampala's most loved neighbourhoods. Choose your stay — from a quick weekend escape to long-term comfort."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {units.map((u) => (
            <UnitCard key={u.id} unit={u} />
          ))}
        </div>
      </Section>

      <Section className="bg-brand-beige/40">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-soft">
              <SmartImage
                src="/images/gallery/kansanga-4.jpg"
                alt="Kitchen"
                fallbackLabel="Kitchen"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-soft mt-8">
              <SmartImage
                src="/images/gallery/munyonyo-2.jpg"
                alt="Bedroom"
                fallbackLabel="Bedroom"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-sienna font-semibold">
              About Elyon Nest
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
              Convenience and comfort, beyond expectations.
            </h2>
            <p className="mt-5 text-lg text-brand-ink/75">
              {site.mission}
            </p>
            <p className="mt-3 text-brand-ink/70">
              From the garden terrace overlooking Kampala's hills to the modern
              kitchens and 24-hour security, every detail is designed to feel
              effortless. Whether you stay a night, a week, or a month — the
              keys are yours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-ghost">
                More about us
              </Link>
              <Link to="/booking" className="btn-primary">
                Book now
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Two Locations"
        title="Find your perfect base"
        subtitle="Quiet, secure neighbourhoods near everything you need."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {locations.map((loc) => (
            <Link
              key={loc.id}
              to={`/locations/${loc.id}`}
              className="group card overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={`/images/gallery/${loc.id}-1.jpg`}
                  alt={loc.name}
                  fallbackLabel={loc.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-3xl">{loc.name}</h3>
                  <span className="text-sm text-brand-sienna group-hover:underline">
                    Explore →
                  </span>
                </div>
                <p className="mt-3 text-brand-ink/70">{loc.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-maroon text-brand-cream">
        <div className="grid gap-10 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-3xl bg-brand-maroon/40 backdrop-blur-sm border border-brand-cream/10 p-7">
              <div className="flex gap-0.5 text-brand-beige">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 font-display text-lg leading-relaxed">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-4 text-sm text-brand-cream/70">
                — {r.name}, {r.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        align="center"
        eyebrow="Easy Payment"
        title="Pay your way"
        subtitle="We accept Flutterwave, Visa cards, Mastercard and MTN Mobile Money. Secure, fast and convenient."
      >
        <div className="max-w-2xl mx-auto">
          <PaymentMethods />
          <Link to="/booking" className="btn-primary mt-8">
            Start booking
          </Link>
        </div>
      </Section>
    </>
  );
}
