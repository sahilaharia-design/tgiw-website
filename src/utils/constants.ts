export const PRODUCT = {
  id: 'tgiw-std-001',
  name: 'The Great Indian Wedding',
  tagline: 'Invite your Party, Celebrate your Shaadi.',
  price: 899,
  deposit: 199,
  currency: 'AED',
  edition: 'standard' as const,
  sku: 'TGIW-STD-001',
  cohort: 'Founders Cohort 001',
  deliveryWindow: 'Ships in 90 days',
  inStock: true,
  description:
    'A grand Indian wedding, brought to your table. For the diaspora who dream of one, and the curious who have always wondered. Immersive. Lavish. Unforgettable.',
  // Only the closed box is shown. The rest stays mystery.
  images: [
    '/images/TGIW_Box.png',
  ],
};

export const PRODUCT_GOLD = {
  id: 'tgiw-gold-001',
  name: 'The Great Indian Wedding — Gold',
  tagline: 'For the Shaadi that deserves a gold-foil entrance.',
  price: 0,
  deposit: 0,
  currency: 'AED',
  edition: 'gold' as const,
  sku: 'TGIW-GOLD-001',
  limited: true,
  description:
    'A collector\'s edition. Arrives later. Waitlist only.',
  images: ['/images/TGIW_Gold_limited_edition.png'],
};

export const CONTACT_EMAIL = 'info@celebratetgiw.com';

export const PREORDER = {
  cohortName: 'Founders Cohort',
  cohortSize: 500,
  cohortShipMonths: 3,
  depositAED: 199,
  remainderAED: 700,
  totalAED: 899,
};

// Testimonials stay — but reframed as *feeling*, not mechanics
export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'I grew up hearing about Indian weddings but never got to attend one. TGIW gave us an evening I will remember for years.',
    author: 'Aisha M.',
    location: 'Dubai',
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    quote:
      'Twelve years in London. This brought back every memory of home in a single night. My friends were spellbound.',
    author: 'Raj Kapoor',
    location: 'London',
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    quote:
      'Attending an Indian wedding has always been on my bucket list. This is the closest I have come — and it was beautiful.',
    author: 'Priya S.',
    location: 'Dubai',
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    quote:
      'We played this at a family gathering in Abu Dhabi. Three hours later, nobody wanted it to end.',
    author: 'Ahmed Al-Mansouri',
    location: 'Abu Dhabi',
    rating: 5,
    verified: true,
  },
  {
    id: 5,
    quote:
      'The craftsmanship is unreal. But what got me was the nostalgia — people storytelling all night.',
    author: 'Vikram Singh',
    location: 'London',
    rating: 5,
    verified: true,
  },
  {
    id: 6,
    quote:
      'It sits on our shelf like a piece of art. Everyone who visits asks about it first.',
    author: 'Natasha K.',
    location: 'Dubai',
    rating: 5,
    verified: true,
  },
];

// FAQ — no reveal of what's inside, no mechanics
export const FAQ_ITEMS = [
  {
    q: 'What is this, really?',
    a: 'It is an evening. A grand Indian wedding, brought to your table. Beyond that — we keep the surprise. The moment you open it is the moment it becomes yours.',
  },
  {
    q: 'Who is it for?',
    a: 'For the diaspora who have always wanted to attend one. For the curious who have always wondered. For anyone who wants to host an unforgettable night.',
  },
  {
    q: 'How many people?',
    a: 'Best for four to eight guests at one table.',
  },
  {
    q: 'When will it arrive?',
    a: 'The Founders Cohort ships 90 days from reservation. You will receive a date as your order is confirmed.',
  },
  {
    q: 'How does the pre-order work?',
    a: 'A refundable deposit of AED 199 holds your place in the Founders Cohort. The balance of AED 700 is collected only when your Shaadi is ready to ship.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes. Full refund of your deposit anytime before we begin your production run. We will confirm that date in writing.',
  },
  {
    q: 'Do you ship outside the UAE?',
    a: 'The first cohort is Dubai-only. International waitlist opens next quarter. Write to us if you want to be first in line.',
  },
  {
    q: 'Why does it cost this much?',
    a: 'Because it is made to last a decade. Every element is crafted, not printed. This is not a game you throw away — it is something you pass on.',
  },
];

export const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah',
];
