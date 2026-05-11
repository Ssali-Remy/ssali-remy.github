import { Link } from "react-router-dom";
import Section from "../components/Section";
import SmartImage from "../components/SmartImage";
import { site } from "../data/site";
import { compound1 } from "../data/images-hero";

export default function About() {
  return (
    <>
      <Section
        eyebrow="About"
        title={site.name}
        subtitle={site.mission}
        align="center"
        className="bg-gradient-to-b from-brand-beige/60 to-brand-cream"
      >
        <p className="font-sketch text-3xl text-brand-sienna text-center">
          {site.slogan}
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-soft">
            <SmartImage
              src={compound1}
              alt="Elyon Nest garden"
              fallbackLabel="Our Story"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-4xl">Our story</h2>
            <p className="mt-5 text-brand-ink/75">
              Elyon Nest was born from a simple idea: travel and short stays
              should feel as comfortable as home. We started with one
              hand-styled duplex on Kansanga hill and have grown into a small
              collection of carefully curated apartments across Kampala.
            </p>
            <p className="mt-3 text-brand-ink/75">
              Every property is fully furnished, professionally maintained and
              backed by 24-hour security. We don't book individual rooms — when
              you stay with us, the entire apartment is yours.
            </p>
          </div>
        </div>
      </Section>

      <Section
        className="bg-brand-beige/40"
        eyebrow="What we believe"
        title="Our values"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {site.values.map((v, i) => (
            <div key={v} className="card p-6 flex flex-col gap-2">
              <span className="font-display text-3xl text-brand-maroon">
                0{i + 1}
              </span>
              <p className="font-medium">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section align="center" title="Ready to stay?">
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/booking" className="btn-primary">
            Book your stay
          </Link>
          <Link to="/contact" className="btn-ghost">
            Talk to us
          </Link>
        </div>
      </Section>
    </>
  );
}
