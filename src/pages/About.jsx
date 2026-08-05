import { Link } from "react-router-dom";
import Section from "../components/Section";
import SmartImage from "../components/SmartImage";
import { site } from "../data/site";
import { compound1, compound4 } from "../data/images-hero";

export default function About() {
  return (
    <>
      <Section
        eyebrow="About Us"
        title="Welcome To Elyon Nest"
        subtitle="It is a pleasure and privilege to host you."
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
            <h2 className="font-display text-4xl">Hi There, And Welcome!</h2>
            <p className="mt-5 text-brand-ink/80 text-lg">
              {site.welcome}
            </p>
            <p className="mt-3 text-brand-ink/70">
              {site.welcomeFollowUp} We're happy to share local tips, restaurant
              recommendations, or help with anything else you might need.
            </p>
            <p className="mt-6 font-sketch text-2xl text-brand-sienna">
              — {site.contact.host}, your host
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-beige/40" eyebrow="What you can expect" title="A House Built Around You">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature title="Settle In Quickly">
            Keyless entry on the front door with a code shared at check-in.
            You'll always find a caretaker to guide you.
          </Feature>
          <Feature title="Stay Connected">
            Strong Wi-Fi, Smart TV with Netflix and DStv, work-from-anywhere
            comfort.
          </Feature>
          <Feature title="Feel At Home In The Kitchen">
            Fully equipped — cutlery, cookware, blender, microwave, fridge —
            cook for yourself or just brew good coffee.
          </Feature>
          <Feature title="Sleep Cool">
            Air conditioning in every room. Power back-up so it stays on.
          </Feature>
          <Feature title="Safe & Cared For">
            24-hr security personnel armed at night, outdoor CCTV, smoke and
            CO detectors, first aid kit and emergency siren.
          </Feature>
          <Feature title="Looked After Daily">
            Housekeeping six days a week. Laundry service Mon · Wed · Fri.
          </Feature>
        </div>
      </Section>

      <Section eyebrow="House guide" title="Simple, So Everyone's Comfortable">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <ul className="grid gap-3">
            {[
              ["No Smoking Indoors", "You're welcome to smoke outside."],
              ["No Parties Or Events", "Small, quiet gatherings are fine — just let us know in advance."],
              ["Quiet Hours 11 PM – 8 AM", "Out of respect for our neighbours."],
              ["No Pets, Please", "Pets aren't allowed in the home."],
              ["Check-out By 11:00 AM", "Leave the keys in the door(s) and lock up behind you."],
              ["Respect The Space", "Treat the home with care and let us know straight away if anything needs fixing."],
            ].map(([h, d]) => (
              <li key={h} className="card p-5">
                <h3 className="font-display text-xl text-brand-maroon">{h}</h3>
                <p className="text-sm text-brand-ink/70 mt-1">{d}</p>
              </li>
            ))}
          </ul>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
            <SmartImage
              src={compound4}
              alt="Elyon Nest exterior"
              fallbackLabel="House"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section align="center" title="Ready To Stay?">
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/booking" className="btn-primary">
            Check availability
          </Link>
          <Link to="/contact" className="btn-ghost">
            Talk to us
          </Link>
        </div>
      </Section>
    </>
  );
}

function Feature({ title, children }) {
  return (
    <div className="card p-6">
      <h3 className="font-display text-xl text-brand-maroon">{title}</h3>
      <p className="text-sm text-brand-ink/75 mt-2 leading-relaxed">{children}</p>
    </div>
  );
}
