import { heroBackgrounds } from "./images-hero";
import { k1Cover, k1Img1, k1Img2, k1Img3, k1Img4 } from "./images-k1";

export { heroBackgrounds };

export const units = [
  {
    id: "kansanga-1",
    name: "Unit One",
    altName: "E1 Wing",
    location: "Kansanga",
    locationId: "kansanga",
    tagline: "Duplex apartment with hill & city views",
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    pricing: { day: 90, week: 425, month: 1500 },
    cover: k1Cover,
    gallery: [k1Img1, k1Img2, k1Img3, k1Img4],
    highlights: [
      "Garden terrace with city views",
      "Smart TV, DStv, Wi-Fi",
      "Fully furnished kitchen",
      "Power back-up included",
    ],
  },
  {
    id: "kansanga-2",
    name: "Unit Two",
    altName: "E2 Wing",
    location: "Kansanga",
    locationId: "kansanga",
    tagline: "Comfy, spacious wing of the duplex",
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    pricing: { day: 80, week: 400, month: 1400 },
    cover: "/images/units/kansanga-2-cover.jpg",
    gallery: [],
    highlights: [
      "Modern styling and finishes",
      "Ensuite bedrooms with showers",
      "Washing machine & laundry",
      "24-hr secure parking",
    ],
  },
  {
    id: "munyonyo-3",
    name: "Unit Three",
    location: "Munyonyo",
    locationId: "munyonyo",
    tagline: "Lakeside retreat in Munyonyo",
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    pricing: { day: 100, week: 480, month: 1700 },
    cover: "/images/units/munyonyo-3-cover.jpg",
    gallery: [],
    highlights: [
      "Quiet lakeside neighbourhood",
      "Modern open-plan living",
      "Wi-Fi, DStv, smart TV",
      "Free secure parking",
    ],
  },
];

export const unitsById = Object.fromEntries(units.map((u) => [u.id, u]));

export const locations = [
  {
    id: "kansanga",
    name: "Kansanga",
    blurb:
      "A serene duplex on top of Kansanga hill at the end of Diplomate Church Road off Gaba — modern, secure and away from the busy town centre.",
    coords: { lat: 0.2861, lng: 32.6181 },
    mapEmbed: "https://www.google.com/maps?q=Kansanga,Kampala&output=embed",
    amenities: [
      ["Horse Power Gym", "1.2 km"],
      ["UK Mall", "600 m"],
      ["Afropark Hotel Muyenga", "1.4 km"],
      ["TMT Supermarket", "1.6 km"],
      ["IHK (Int. Hospital Kampala)", "2.1 km"],
      ["Speke Resort Munyonyo", "3 km"],
    ],
    features: [
      "Garden / patio",
      "24-hour security with surveillance",
      "Free ample parking",
      "Gas, water and power included",
      "Power back-up",
      "2 bedrooms, 2 ensuite bathrooms",
      "Bed linen and towels",
      "External bathroom with walk-in shower",
      "Kitchen with microwave & fridge / freezer",
      "Dining area",
      "Sitting room with smart TV, DStv, Wi-Fi",
      "Washing machine and laundry",
      "Daily housekeeping",
      "Strictly no smoking",
    ],
  },
  {
    id: "munyonyo",
    name: "Munyonyo",
    blurb:
      "Tucked away in lakeside Munyonyo, minutes from Speke Resort and the Kampala Serena Marina — a calm setting for both leisure and business stays.",
    coords: { lat: 0.2475, lng: 32.6361 },
    mapEmbed: "https://www.google.com/maps?q=Munyonyo,Kampala&output=embed",
    amenities: [
      ["Speke Resort Munyonyo", "1.0 km"],
      ["Munyonyo Commonwealth Resort", "1.2 km"],
      ["Lake Victoria shoreline", "1.3 km"],
      ["IHK Hospital", "5.0 km"],
    ],
    features: [
      "Garden setting",
      "24-hour security",
      "Free secure parking",
      "Power, water and gas included",
      "Power back-up",
      "2 bedrooms, 2 ensuite bathrooms",
      "Modern kitchen and dining",
      "Smart TV, DStv, Wi-Fi",
      "Bed linen and towels",
      "Daily housekeeping",
    ],
  },
];

export const locationsById = Object.fromEntries(
  locations.map((l) => [l.id, l]),
);
