/* Categorized amenities with per-item icons (Airbnb-style).
 * Icons are inline stroke SVGs sharing one size class. */

const ic = (paths) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    {paths}
  </svg>
);

const I = {
  tv: ic(<><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>),
  play: ic(<><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M10 8.5l5 3-5 3v-6z" /><path d="M8 21h8" /></>),
  gazebo: ic(<><path d="M4 10 12 4l8 6" /><path d="M6 10v10M18 10v10M6 20h12" /><path d="M6 14h12" /></>),
  garden: ic(<><path d="M12 22c0-5 0-8 0-8" /><path d="M12 14c-4 0-6-2-6-5 3 0 6 1 6 5z" /><path d="M12 12c0-3 2-5 5-5 0 3-2 5-5 5z" /></>),
  fire: ic(<><path d="M12 3s4 3 4 8a4 4 0 01-8 0c0-2 1-3 1-3 0 1 1 2 2 2 0-2-1-4 1-7z" /><path d="M6 21h12" /></>),
  parking: ic(<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 16V8h3.5a2.5 2.5 0 010 5H9" /></>),
  water: ic(<><path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" /></>),
  towel: ic(<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v18" /></>),
  robe: ic(<><path d="M8 3l4 3 4-3" /><path d="M8 3C6 5 5 8 5 12l2 9h10l2-9c0-4-1-7-3-9" /><path d="M12 6v9" /></>),
  sanitary: ic(<><rect x="6" y="8" width="12" height="12" rx="2" /><path d="M9 8V6a3 3 0 016 0v2" /></>),
  hairdryer: ic(<><path d="M3 8a5 5 0 015-5h6a3 3 0 010 6H8a5 5 0 01-5-1z" /><path d="M11 9l1 8M9 20h4" /></>),
  washer: ic(<><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6h.01M11 6h.01" /></>),
  iron: ic(<><path d="M3 15v-2a5 5 0 015-5h11l-2 7z" /><path d="M3 19h14" /></>),
  bed: ic(<><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6" /><path d="M3 18h18M3 12V8a2 2 0 012-2h6v4" /></>),
  ac: ic(<><rect x="2" y="6" width="20" height="8" rx="2" /><path d="M6 18l-1 2M12 18v2M18 18l1 2M6 10h12" /></>),
  camera: ic(<><path d="M3 8l14-3 1 4-14 3z" /><path d="M4 12l2 6M9 11v4a2 2 0 01-4 0" /><path d="M17 9l3-1" /></>),
  smoke: ic(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" /></>),
  firstaid: ic(<><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M12 10v6M9 13h6" /><path d="M8 6V4h8v2" /></>),
  extinguisher: ic(<><path d="M9 8a3 3 0 016 0v11a1 1 0 01-1 1h-4a1 1 0 01-1-1z" /><path d="M12 5V3M12 3l3-1" /><path d="M9 12h6" /></>),
  wifi: ic(<><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" /></>),
  desk: ic(<><path d="M3 5h18M4 5v14M20 5v14M4 12h16" /><path d="M7 19v2M17 19v2" /></>),
  kitchen: ic(<><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>),
  microwave: ic(<><rect x="3" y="5" width="18" height="14" rx="2" /><rect x="6" y="8" width="8" height="8" rx="1" /><path d="M17 9v6" /></>),
  fridge: ic(<><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M6 10h12M9 5v2M9 13v3" /></>),
  dishes: ic(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>),
  power: ic(<><path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z" /></>),
  housekeeping: ic(<><path d="M6 3v7M4 3h4M6 10c-1 0-2 1-2 3v7h4v-7c0-2-1-3-2-3z" /><path d="M14 4l4 2-1 4-4-2z" /><path d="M13 8l-2 12" /></>),
};

export const AMENITY_GROUPS = [
  { category: "Entertainment", categoryIcon: I.tv, items: [
    { label: "Netflix", icon: I.play },
    { label: "DStv", icon: I.tv },
  ] },
  { category: "Outdoors", categoryIcon: I.garden, items: [
    { label: "Gazebo", icon: I.gazebo },
    { label: "Garden", icon: I.garden },
    { label: "Fire pit", icon: I.fire },
    { label: "Parking on premises", icon: I.parking },
  ] },
  { category: "Bathroom", categoryIcon: I.water, items: [
    { label: "Hot water", icon: I.water },
    { label: "Towels", icon: I.towel },
    { label: "Robes", icon: I.robe },
    { label: "Sanitary supplies", icon: I.sanitary },
    { label: "Hair dryer", icon: I.hairdryer },
  ] },
  { category: "Bedroom & laundry", categoryIcon: I.bed, items: [
    { label: "Washer", icon: I.washer },
    { label: "Iron", icon: I.iron },
    { label: "Beddings", icon: I.bed },
  ] },
  { category: "Heating & cooling", categoryIcon: I.ac, items: [
    { label: "Central air conditioning", icon: I.ac },
  ] },
  { category: "Home safety", categoryIcon: I.camera, items: [
    { label: "Exterior security cameras", icon: I.camera },
    { label: "Smoke alarm", icon: I.smoke },
    { label: "First aid kit", icon: I.firstaid },
    { label: "Fire extinguisher", icon: I.extinguisher },
  ] },
  { category: "Internet & office", categoryIcon: I.wifi, items: [
    { label: "WiFi", icon: I.wifi },
    { label: "Workspace", icon: I.desk },
  ] },
  { category: "Kitchen & dining", categoryIcon: I.kitchen, items: [
    { label: "Kitchen", icon: I.kitchen },
    { label: "Microwave", icon: I.microwave },
    { label: "Refrigerator", icon: I.fridge },
    { label: "Dishes & silverware", icon: I.dishes },
  ] },
  { category: "Other", categoryIcon: I.power, items: [
    { label: "Power back-up", icon: I.power },
    { label: "House keeping", icon: I.housekeeping },
  ] },
];
