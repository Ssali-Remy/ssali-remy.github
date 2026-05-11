function VisaLogo(props) {
  return (
    <svg viewBox="0 0 64 22" {...props}>
      <rect width="64" height="22" rx="3" fill="#1A1F71" />
      <path
        d="M27.8 6.2l-3.5 9.6h-2.3l-1.7-6.6c-.1-.4-.2-.6-.6-.7-.6-.3-1.6-.6-2.4-.7l.1-.4h3.7c.5 0 .9.3 1 .9l.9 4.8 2.2-5.7H27.8zm9.1 6.4c0-2.2-3-2.3-3-3.3 0-.3.3-.6.9-.7.3 0 1.2-.1 2.1.4l.4-1.8c-.5-.2-1.2-.4-2-.4-2.1 0-3.6 1.1-3.6 2.7 0 1.2 1.1 1.8 1.9 2.2.9.4 1.2.6 1.2 1 0 .5-.6.8-1.2.8-1 0-1.6-.3-2.1-.5l-.4 1.8c.5.2 1.4.4 2.3.4 2.3 0 3.7-1.1 3.7-2.8zm5.5 3.2H44l-1.7-9.6h-1.8c-.4 0-.8.2-.9.7l-3.2 8.9h2.3l.4-1.3h2.8l.3 1.3zm-2.4-3l1.1-3.1.7 3.1h-1.8zm-9-6.6l-1.8 9.6h-2.2l1.8-9.6h2.2z"
        fill="#fff"
      />
    </svg>
  );
}

function MastercardLogo(props) {
  return (
    <svg viewBox="0 0 40 26" {...props}>
      <circle cx="15" cy="13" r="9" fill="#EB001B" />
      <circle cx="25" cy="13" r="9" fill="#F79E1B" />
      <path
        d="M20 6.5a9 9 0 010 13 9 9 0 010-13z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function MtnMoMoLogo(props) {
  return (
    <svg viewBox="0 0 64 26" {...props}>
      <rect width="64" height="26" rx="13" fill="#FFCC00" />
      <text
        x="32"
        y="13"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="10"
        fill="#003F87"
      >
        MTN
      </text>
      <text
        x="32"
        y="22"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="6.5"
        fill="#003F87"
      >
        MoMo
      </text>
    </svg>
  );
}

function AirtelMoneyLogo(props) {
  return (
    <svg viewBox="0 0 64 26" {...props}>
      <rect width="64" height="26" rx="13" fill="#ED1C24" />
      <text
        x="32"
        y="13"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="9.5"
        fill="#fff"
      >
        airtel
      </text>
      <text
        x="32"
        y="21.5"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="600"
        fontSize="6"
        fill="#fff"
      >
        money
      </text>
    </svg>
  );
}

function FlutterwaveLogo(props) {
  return (
    <svg viewBox="0 0 64 22" {...props}>
      <rect width="64" height="22" rx="3" fill="#F5A623" />
      <path
        d="M8 14.5l3-7h2l-2 5h3l1-3h2l-1 3h2l1-3h2l-1 3 1 2h-2l-.7-2h-2.6l-.7 2h-2l-.7-2H10l-.7 2H8z"
        fill="#fff"
      />
      <text
        x="36"
        y="14"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="7"
        fill="#fff"
      >
        flutterwave
      </text>
    </svg>
  );
}

const methods = [
  { name: "Visa", Logo: VisaLogo },
  { name: "Mastercard", Logo: MastercardLogo },
  { name: "MTN MoMo", Logo: MtnMoMoLogo },
  { name: "Airtel Money", Logo: AirtelMoneyLogo },
  { name: "Flutterwave", Logo: FlutterwaveLogo },
];

export default function PaymentMethods({ compact = false }) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {methods.map(({ name, Logo }) => (
          <div key={name} className="flex items-center" title={name}>
            <Logo className="h-7" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {methods.map(({ name, Logo }) => (
        <div
          key={name}
          className="flex items-center justify-center rounded-xl border border-brand-sand bg-white px-3 py-3 shadow-soft"
          title={name}
        >
          <Logo className="h-8" />
        </div>
      ))}
    </div>
  );
}
