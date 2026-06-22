import { compound1, compound2, compound3, compound4, heroBackgrounds } from "./images-hero";
import { k1Cover, k1Img1, k1Img2, k1Img3, k1Img4 } from "./images-k1";
import { k2Cover, k2Img1, k2Img2, k2Img3, k2Img4 } from "./images-k2";
import { m3Cover, m3Img1, m3Img2, m3Img3, m3Img4 } from "./images-m3";

export { heroBackgrounds, compound1, compound2, compound3, compound4 };

// Pricing kept internally for future reference. Not shown anywhere in the UI.
export const units = [
  {
    id: "kansanga-1",
    name: "Unit One",
    altName: "E1 Wing",
    location: "Kansanga",
    locationId: "kansanga",
    tagline: "Two-bedroom wing of the duplex on Kansanga hill",
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    pricing: { day: 90, week: 425, month: 1500 },
    cover: k1Cover,
    gallery: [k1Img1, k1Img2, k1Img3, k1Img4],
    highlights: [
      "Air conditioning in every room",
      "Smart TV with Netflix & DStv",
      "Fully equipped kitchen — blender, microwave, fridge & full cookware",
      "Power back-up so you never lose Wi-Fi or AC",
    ],
  },
  {
    id: "kansanga-2",
    name: "Unit Two",
    altName: "E2 Wing",
    location: "Kansanga",
    locationId: "kansanga",
    tagline: "Modern, spacious wing of the duplex with a private feel",
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    pricing: { day: 80, week: 400, month: 1400 },
    cover: k2Cover,
    gallery: [k2Img1, k2Img2, k2Img3, k2Img4],
    highlights: [
      "Air conditioning in every room",
      "Garden you're free to enjoy",
      "Housekeeping six days a week",
      "Free parking — no permit required",
    ],
  },
  {
    id: "munyonyo-1",
    name: "Unit M1",
    altName: "M1",
    location: "Munyonyo",
    locationId: "munyonyo",
    tagline: "One-bedroom apartment, ideal for solo stays & couples",
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    pricing: { day: 70, week: 350, month: 1200 },
    cover: m3Cover,
    gallery: [m3Img1, m3Img2, m3Img3, m3Img4],
    highlights: [
      "Quiet lakeside neighbourhood",
      "Air conditioning, Smart TV with Netflix & DStv",
      "Fully equipped kitchenette",
      "Power back-up & strong Wi-Fi",
    ],
  },
  {
    id: "munyonyo-2",
    name: "Unit M2",
    altName: "M2",
    location: "Munyonyo",
    locationId: "munyonyo",
    tagline: "Two-bedroom apartment with a private feel",
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    pricing: { day: 95, week: 460, month: 1600 },
    cover: m3Cover,
    gallery: [m3Img2, m3Img3, m3Img4, m3Cover],
    highlights: [
      "Two bedrooms, ensuite bathrooms",
      "Air conditioning in every room",
      "Smart TV with Netflix & DStv",
      "Housekeeping six days a week",
    ],
  },
  {
    id: "munyonyo-3",
    name: "Unit M3",
    altName: "M3",
    location: "Munyonyo",
    locationId: "munyonyo",
    tagline: "Two-bedroom retreat — Baguma Rise, Munyonyo",
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    pricing: { day: 100, week: 480, month: 1700 },
    cover: m3Cover,
    gallery: [m3Img1, m3Img2, m3Img3, m3Img4],
    highlights: [
      "Air conditioning, Smart TV with Netflix & DStv",
      "Fully equipped kitchen",
      "Power back-up & strong Wi-Fi",
      "Housekeeping six days a week",
    ],
  },
];

export const unitsById = Object.fromEntries(units.map((u) => [u.id, u]));

// Booklet "House Guide" + "Security Info" — verbatim where it helps.
const SHARED_FEATURES = [
  "Air conditioning installed in every room",
  "Smart TV in the living room with Netflix and DStv",
  "Fully equipped kitchen with cutlery, cookware, blender, microwave & fridge",
  "Strong Wi-Fi — strongest in the living room and kitchen",
  "Power back-up for outages",
  "Housekeeping six days a week",
  "Laundry service Mon / Wed / Fri (charges may apply)",
  "Garden you're free to enjoy",
  "Free parking — no permit required",
  "Keyless entry on the front door — code shared at check-in",
  "24-hour security personnel, armed at night",
  "Outdoor CCTV cameras",
  "Smoke and carbon monoxide detectors; fire extinguisher in the kitchen",
  "First aid kit in the aquarium cabin in the living room",
  "Emergency / panic siren switch",
];

export const locations = [
  {
    id: "kansanga",
    name: "Kansanga",
    address: "Diplomate Church Road, Plot 8277, Kansanga, Kampala",
    blurb:
      "On Diplomate Church Road off Gaba — a quiet corner of Kansanga we've poured a lot of love into so it feels welcoming the moment you step inside.",
    coords: { lat: 0.2861, lng: 32.6181 },
    mapEmbed:
      "https://www.google.com/maps?q=Diplomate+Church+Road+Kansanga+Kampala&output=embed",
    nearby: [
      ["Caramel Kansanga (Restaurant)", "Gaba Road, Kansanga"],
      ["UK Mall (Shopping)", "Gaba Road, Kansanga"],
      ["Golden Hill Restaurant", "Tank Hill Road, Muyenga"],
      ["Afro Park (Gym · Sauna · Pool · Hotel)", "Tank Hill Road, Muyenga"],
      ["Horse Power Gym (Gym · Sauna)", "Tank Hill Road, Muyenga"],
      ["Arena Mall (Shopping)", "Nsambya"],
      ["La Petite Village (Spa · Pool · Hotel)", "Nsambya"],
      ["Speke Resort Munyonyo", "Munyonyo"],
    ],
    features: SHARED_FEATURES,
  },
  {
    id: "munyonyo",
    name: "Munyonyo",
    address: "Baguma Rise, Munyonyo, Kampala",
    blurb:
      "Tucked away on Baguma Rise, minutes from Speke Resort and the Lake Victoria shoreline — a calm setting for both leisure and business stays.",
    coords: { lat: 0.2475, lng: 32.6361 },
    mapEmbed:
      "https://www.google.com/maps?q=Baguma+Rise+Munyonyo+Kampala&output=embed",
    nearby: [
      ["Afro Park", "Gym · Steam & Sauna · Swimming · Hotel · Tank Hill Road, Muyenga"],
      ["Horse Power Gym", "Gym · Steam & Sauna · Tank Hill Road, Muyenga"],
      ["Speke Resort Munyonyo", "Hotel · Resort · Gym · Swimming · Munyonyo"],
    ],
    features: SHARED_FEATURES,
  },
];

export const locationsById = Object.fromEntries(
  locations.map((l) => [l.id, l]),
);
