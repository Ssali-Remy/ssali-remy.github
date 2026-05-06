# Elyon Nest — Website

> Simple Made Perfect.

A modern, responsive React + Vite website for Elyon Nest — boutique self-catering
apartments in Kansanga and Munyonyo, Kampala.

## Features

- 5 furnished units across 2 locations (Kansanga × 3, Munyonyo × 2)
- Brown & beige brand theme with hand-sketched logo
- Fully responsive (mobile, tablet, desktop)
- Booking flow with date picker and blocked-day support
- Auto-applied weekly / monthly rates
- Payment gateway: Flutterwave (Visa, Mastercard, MTN Mobile Money)
- Embedded Google Maps for each location
- Gallery filtered by location, contact form, reviews

## Stack

- React 19 + Vite 8
- React Router
- Tailwind CSS 3
- react-datepicker + date-fns
- Flutterwave Standard Checkout (loaded from CDN)

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run lint
```

## Adding real images

The site looks for images at the following paths under `public/`. Drop your
photos in with these filenames and they'll appear automatically — otherwise
the page falls back to branded gradient placeholders with the location's
initials.

```
public/images/units/
  kansanga-e1-cover.jpg, kansanga-e1-1.jpg … kansanga-e1-4.jpg
  kansanga-e2-cover.jpg, kansanga-e2-1.jpg … kansanga-e2-4.jpg
  kansanga-e3-cover.jpg, kansanga-e3-1.jpg … kansanga-e3-4.jpg
  munyonyo-m1-cover.jpg, munyonyo-m1-1.jpg … munyonyo-m1-3.jpg
  munyonyo-m2-cover.jpg, munyonyo-m2-1.jpg … munyonyo-m2-3.jpg

public/images/gallery/
  kansanga-1.jpg … kansanga-6.jpg
  munyonyo-1.jpg … munyonyo-3.jpg
```

## Configuring Flutterwave

Update the public key in `src/data/site.js`:

```js
payment: {
  flutterwavePublicKey: "FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X",
  currency: "USD",
}
```

If the Flutterwave script can't load (e.g. offline preview), the booking form
falls back to a confirmation message so the form stays usable.

## Project layout

```
src/
  components/   Logo, Navbar, Footer, Hero, UnitCard, BookingForm, …
  pages/        Home, About, Location, Gallery, Booking, Contact
  data/         site.js, units.js, gallery.js, reviews.js
  index.css     Tailwind base + brand component classes
```
