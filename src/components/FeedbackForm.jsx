import { useState } from "react";
import { site } from "../data/site";

function Star({ filled, ...props }) {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" {...props}>
      <path
        d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating === 0) {
      setError("Please add your name, a rating and a short message.");
      return;
    }
    setError("");
    // No backend: compose an email the guest can send from their client.
    const subject = `Elyon Nest review — ${rating}★ from ${name.trim()}`;
    const body =
      `Rating: ${rating}/5\n` +
      `Name: ${name.trim()}\n\n` +
      `${message.trim()}\n`;
    window.location.href =
      `mailto:${site.contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="flex justify-center gap-1 text-brand-maroon mb-3">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} filled />
          ))}
        </div>
        <h3 className="text-xl font-bold text-brand-ink">Thank you, {name.trim()}!</h3>
        <p className="mt-2 text-brand-ink/70">
          Your review has been prepared in your email app — just hit send. We
          truly appreciate you taking the time.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setName("");
            setRating(0);
            setMessage("");
          }}
          className="btn-ghost mt-6"
        >
          Leave another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 sm:p-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-brand-ink mb-1.5" htmlFor="fb-name">
          Your name
        </label>
        <input
          id="fb-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-brand-sand bg-white px-4 py-3 text-brand-ink placeholder-brand-ink/40 focus:border-brand-maroon focus:outline-none focus:ring-2 focus:ring-brand-maroon/20"
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-brand-ink mb-1.5">Rating</span>
        <div
          className="flex gap-1 text-brand-maroon"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              className="transition-transform hover:scale-110"
            >
              <Star filled={n <= (hover || rating)} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-ink mb-1.5" htmlFor="fb-msg">
          Your review
        </label>
        <textarea
          id="fb-msg"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-brand-sand bg-white px-4 py-3 text-brand-ink placeholder-brand-ink/40 focus:border-brand-maroon focus:outline-none focus:ring-2 focus:ring-brand-maroon/20 resize-y"
          placeholder="Tell us about your stay…"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" className="btn-primary">
        Submit review
      </button>
    </form>
  );
}
