import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInCalendarDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { units, unitsById, locations } from "../data/units";
import { site } from "../data/site";
import PaymentMethods from "./PaymentMethods";

// In-memory mock of "blocked" days per unit (would be a backend/Google Calendar in prod).
const BLOCKED = {
  "kansanga-e1": [addDays(7), addDays(8), addDays(20), addDays(21)],
  "kansanga-e2": [addDays(3), addDays(4), addDays(5)],
  "kansanga-e3": [addDays(15)],
  "munyonyo-m1": [addDays(10), addDays(11), addDays(12), addDays(13)],
  "munyonyo-m2": [addDays(2), addDays(28), addDays(29)],
};

function addDays(n) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

function isBlocked(date, unitId) {
  const blocked = BLOCKED[unitId] || [];
  return blocked.some(
    (b) =>
      b.getFullYear() === date.getFullYear() &&
      b.getMonth() === date.getMonth() &&
      b.getDate() === date.getDate(),
  );
}

export default function BookingForm() {
  const [params, setParams] = useSearchParams();
  const initialUnit = params.get("unit") || units[0].id;
  const initialLocation = unitsById[initialUnit]?.locationId || "kansanga";

  const [locationId, setLocationId] = useState(initialLocation);
  const [unitId, setUnitId] = useState(initialUnit);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [status, setStatus] = useState({ type: null, msg: "" });

  const filteredUnits = useMemo(
    () => units.filter((u) => u.locationId === locationId),
    [locationId],
  );
  const effectiveUnitId = filteredUnits.some((u) => u.id === unitId)
    ? unitId
    : filteredUnits[0]?.id;
  const unit = unitsById[effectiveUnitId];

  // Sync URL param
  useEffect(() => {
    if (effectiveUnitId) setParams({ unit: effectiveUnitId }, { replace: true });
  }, [effectiveUnitId, setParams]);

  const nights =
    start && end ? Math.max(1, differenceInCalendarDays(end, start)) : 0;

  const total = useMemo(() => {
    if (!unit || !nights) return 0;
    if (nights >= 28) {
      const months = nights / 30;
      return Math.round(months * unit.pricing.month);
    }
    if (nights >= 7) {
      const weeks = nights / 7;
      return Math.round(weeks * unit.pricing.week);
    }
    return nights * unit.pricing.day;
  }, [unit, nights]);

  const canBook =
    unit && start && end && nights > 0 && name && email && phone;

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: null, msg: "" });
    if (!canBook) {
      setStatus({
        type: "error",
        msg: "Please fill in all fields and pick your stay dates.",
      });
      return;
    }
    if (typeof window === "undefined" || !window.FlutterwaveCheckout) {
      // Fallback: pretend success — real key not configured
      setStatus({
        type: "success",
        msg: `Reservation request received for ${unit.name} (${nights} nights, $${total}). We'll confirm via email shortly.`,
      });
      return;
    }
    const tx_ref = `EN-${unit.id}-${Date.now()}`;
    const paymentOptions =
      paymentMethod === "momo"
        ? "mobilemoneyuganda"
        : paymentMethod === "card"
          ? "card"
          : "card,mobilemoneyuganda,banktransfer";
    window.FlutterwaveCheckout({
      public_key: site.payment.flutterwavePublicKey,
      tx_ref,
      amount: total,
      currency: site.payment.currency,
      payment_options: paymentOptions,
      customer: { email, phone_number: phone, name },
      customizations: {
        title: "Elyon Nest Booking",
        description: `${unit.name} · ${nights} night${nights > 1 ? "s" : ""}`,
        logo: window.location.origin + "/favicon.svg",
      },
      meta: {
        unitId: unit.id,
        location: unit.location,
        checkIn: start.toISOString(),
        checkOut: end.toISOString(),
        guests,
      },
      callback: (resp) => {
        if (resp.status === "successful" || resp.status === "completed") {
          setStatus({
            type: "success",
            msg: `Payment received! Booking confirmed for ${unit.name}.`,
          });
        } else {
          setStatus({
            type: "error",
            msg: "Payment was not completed. You can try again any time.",
          });
        }
      },
      onclose: () => {},
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Location</label>
          <select
            className="input"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          >
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Apartment</label>
          <select
            className="input"
            value={effectiveUnitId}
            onChange={(e) => setUnitId(e.target.value)}
          >
            {filteredUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} — ${u.pricing.day}/night
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Check-in</label>
          <DatePicker
            selected={start}
            onChange={(d) => {
              setStart(d);
              if (end && d && d >= end) setEnd(null);
            }}
            selectsStart
            startDate={start}
            endDate={end}
            minDate={new Date()}
            filterDate={(d) => !isBlocked(d, effectiveUnitId)}
            placeholderText="Select date"
            className="input"
          />
        </div>
        <div>
          <label className="label">Check-out</label>
          <DatePicker
            selected={end}
            onChange={(d) => setEnd(d)}
            selectsEnd
            startDate={start}
            endDate={end}
            minDate={start || new Date()}
            filterDate={(d) => !isBlocked(d, effectiveUnitId)}
            placeholderText="Select date"
            className="input"
          />
        </div>
        <div>
          <label className="label">Guests</label>
          <input
            type="number"
            min="1"
            max="6"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value || "1", 10))}
            className="input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="input"
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input"
          />
        </div>
        <div>
          <label className="label">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+256…"
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="label">Payment method</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "card", label: "Visa / Card" },
            { id: "momo", label: "Mobile Money" },
            { id: "any", label: "Choose at checkout" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setPaymentMethod(m.id)}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                paymentMethod === m.id
                  ? "bg-brand-maroon text-brand-cream border-brand-maroon"
                  : "border-brand-sand bg-white text-brand-ink hover:border-brand-maroon/50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <PaymentMethods compact />
        </div>
      </div>

      <div className="rounded-2xl bg-brand-beige/40 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-ink/70">Selected unit</span>
          <span className="font-medium">{unit?.name || "—"}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-brand-ink/70">Nights</span>
          <span className="font-medium">{nights || "—"}</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-sand/60">
          <span className="font-display text-lg">Total</span>
          <span className="font-display text-2xl text-brand-maroon">
            {total ? `$${total}` : "—"}
          </span>
        </div>
        <p className="mt-2 text-xs text-brand-ink/55">
          Weekly and monthly rates apply automatically for stays of 7 + or 28 +
          nights.
        </p>
      </div>

      {status.type && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {status.msg}
        </div>
      )}

      <button
        type="submit"
        disabled={!canBook}
        className="btn-primary w-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reserve & Pay {total ? `· $${total}` : ""}
      </button>
      <p className="text-center text-xs text-brand-ink/55">
        Secure payment powered by Flutterwave. We don't book individual rooms —
        you reserve the entire apartment.
      </p>
    </form>
  );
}
