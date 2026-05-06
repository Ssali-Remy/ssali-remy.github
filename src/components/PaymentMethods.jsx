export default function PaymentMethods({ compact = false }) {
  const methods = [
    {
      name: "Flutterwave",
      icon: (
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor">
          <path d="M6 6h6l4 8-4 8H6l4-8-4-8zm14 0h6l-4 8 4 8h-6l-4-8 4-8z" />
        </svg>
      ),
    },
    {
      name: "MTN MoMo",
      icon: (
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor">
          <path d="M16 4a12 12 0 100 24 12 12 0 000-24zm-1 6h2v8h-2v-8zm0 10h2v2h-2v-2z" />
        </svg>
      ),
    },
    {
      name: "Visa",
      icon: (
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor">
          <path d="M3 8h26v16H3V8zm2 2v12h22V10H5zm2 6h6v4H7v-4z" />
        </svg>
      ),
    },
    {
      name: "Mastercard",
      icon: (
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor">
          <circle cx="12" cy="16" r="8" opacity=".7" />
          <circle cx="20" cy="16" r="8" opacity=".5" />
        </svg>
      ),
    },
  ];
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-brand-maroon/80">
        {methods.map((m) => (
          <div key={m.name} className="flex items-center gap-1.5 text-sm">
            {m.icon}
            <span className="text-xs">{m.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {methods.map((m) => (
        <div
          key={m.name}
          className="flex items-center gap-2 rounded-xl border border-brand-sand bg-white px-3 py-2.5 text-brand-maroon"
        >
          {m.icon}
          <span className="text-sm font-medium">{m.name}</span>
        </div>
      ))}
    </div>
  );
}
