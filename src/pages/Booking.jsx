import Section from "../components/Section";
import BookingForm from "../components/BookingForm";
import PaymentMethods from "../components/PaymentMethods";

export default function Booking() {
  return (
    <Section
      eyebrow="Reserve your stay"
      title="Booking & Payment"
      subtitle="Pick your dates, choose an apartment and pay securely with card or mobile money. We'll confirm by email shortly after payment."
    >
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookingForm />
        </div>
        <aside className="space-y-6">
          <div className="card p-6">
            <h3 className="font-display text-xl">What's included</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-ink/75">
              {[
                "Entire apartment (we don't book rooms)",
                "Power, water and gas",
                "Wi-Fi, smart TV with DStv",
                "Bed linen, towels, daily housekeeping",
                "24-hour security and free parking",
                "Power back-up",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-maroon" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-xl">Accepted payments</h3>
            <p className="mt-2 text-sm text-brand-ink/65">
              Powered by Flutterwave — pay with whatever feels easiest.
            </p>
            <div className="mt-4">
              <PaymentMethods />
            </div>
          </div>
          <div className="card p-6 bg-brand-maroon text-brand-cream">
            <h3 className="font-display text-xl">Need help booking?</h3>
            <p className="mt-2 text-sm text-brand-cream/75">
              We're happy to assist with availability or special requests.
            </p>
            <a
              href="tel:+256752641302"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-cream text-brand-maroon px-5 py-3 font-medium"
            >
              Call +256 752 641 302
            </a>
          </div>
        </aside>
      </div>
    </Section>
  );
}
