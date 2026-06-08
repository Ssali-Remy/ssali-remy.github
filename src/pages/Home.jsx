import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Section from "../components/Section";
import UnitCard from "../components/UnitCard";
import SmartImage from "../components/SmartImage";
import { units, locations } from "../data/units";
import { k1Img2 } from "../data/images-k1";
import { m3Img1 } from "../data/images-m3";
import { compound2, compound3 } from "../data/images-hero";
import { m3Cover } from "../data/images-m3";
import { site } from "../data/site";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        eyebrow="Our Apartments"
        title="Make yourself at home"
        subtitle="A small, hand-styled collection of self-catering apartments — fully furnished and built around you. Pick a wing of the Kansanga duplex or the lakeside retreat in Munyonyo."
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
                src={k1Img2}
                alt="Living room at Elyon Nest Kansanga"
                fallbackLabel="Living"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-soft mt-8">
              <SmartImage
                src={m3Img1}
                alt="Bedroom at Elyon Nest Munyonyo"
                fallbackLabel="Bedroom"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-sienna font-semibold">
              Meet your host
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
              We've poured a lot of love into this home.
            </h2>
            <p className="mt-5 text-lg text-brand-ink/75">{site.welcome}</p>
            <p className="mt-3 text-brand-ink/70">
              {site.welcomeFollowUp} We're happy to share local tips, restaurant
              recommendations, or help with anything else you might need during
              your stay.
            </p>
            <p className="mt-3 text-brand-ink/70">
              — {site.contact.host}, your host at Elyon Nest
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-ghost">
                More about us
              </Link>
              <Link to="/booking" className="btn-primary">
                Check availability
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Two Locations"
        title="Find your perfect base"
        subtitle="Two quiet, secure neighbourhoods minutes from everything you need."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {locations.map((loc) => {
            const cover = loc.id === "kansanga" ? compound2 : m3Cover;
            return (
              <Link
                key={loc.id}
                to={`/locations/${loc.id}`}
                className="group card overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={cover}
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
                  <p className="mt-2 text-xs text-brand-ink/55">{loc.address}</p>
                  <p className="mt-3 text-brand-ink/70">{loc.blurb}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section
        className="bg-brand-maroon text-brand-cream"
        align="center"
        eyebrow="How to book"
        title="A real conversation, not a checkout"
        subtitle="We don't take card payments online. Pick your dates on the unit page, then call or WhatsApp the host directly — Suubi will confirm everything and share your access code."
      >
        <Link
          to="/booking"
          className="inline-flex items-center justify-center rounded-full bg-brand-cream text-brand-maroon px-6 py-3 font-medium hover:bg-brand-beige transition"
        >
          Check availability
        </Link>
      </Section>

      {/* Suppress unused-import warning while keeping compound3 reachable for future use */}
      <span className="hidden">{[compound3].length}</span>
    </>
  );
}
