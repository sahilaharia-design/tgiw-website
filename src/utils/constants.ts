export const PRODUCT = {
  id: 'tgiw-std-001',
  name: 'The Great Indian Wedding',
  tagline: 'Invite your Party, Celebrate your Shaadi!',
  price: 899,
  currency: 'AED',
  edition: 'standard' as const,
  sku: 'TGIW-STD-001',
  players: '4–8',
  duration: '60–120 minutes',
  age: '15+',
  language: 'English / Hindi',
  inStock: true,
  description:
    'A grand Indian wedding experience — brought to your table. For every Indian abroad who dreams of attending one, and every guest who wants to live it. Immersive, lavish, unforgettable.',
  images: [
    '/images/TGIW_Box.png',
    '/images/open_box_TGIW.png',
    '/images/exploded-view.png',
    '/images/All_game_components_laid_out.png',
  ],
};

export const PRODUCT_GOLD = {
  id: 'tgiw-gold-001',
  name: 'The Great Indian Wedding – Gold Edition',
  tagline: 'The most extravagant Shaadi of all — collector\'s gold.',
  price: 0,
  currency: 'AED',
  edition: 'gold' as const,
  sku: 'TGIW-GOLD-001',
  limited: true,
  description:
    'Because some Shaadis deserve a gold-foil entrance. The ultimate collector\'s edition with premium gold-accented packaging and exclusive components. Limited quantities available.',
  images: ['/images/TGIW_Gold_limited_edition.png'],
};

export const CONTACT_EMAIL = 'info@celebratetgiw.com';

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'I grew up hearing about Indian weddings but never got to attend one. TGIW gave us a full evening of chaos, drama, and joy — exactly what I imagined it would be.',
    author: 'Aisha M.',
    location: 'Dubai',
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    quote:
      'Been living in the UK for 12 years. This brought back every memory of back home in one evening. My non-Indian friends were completely hooked.',
    author: 'Raj Kapoor',
    location: 'London',
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    quote:
      'Attending an Indian wedding has always been on my bucket list. This is the next best thing — and honestly, the drama was even better.',
    author: 'Priya S.',
    location: 'Dubai',
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    quote:
      'We played this at a family gathering in Abu Dhabi. Three hours later, nobody wanted to stop. It felt like we were actually at a Shaadi.',
    author: 'Ahmed Al-Mansouri',
    location: 'Abu Dhabi',
    rating: 5,
    verified: true,
  },
  {
    id: 5,
    quote:
      'The craftsmanship is unreal. But what got me was how it made everyone nostalgic — people who hadn\'t been to India in years were laughing and storytelling all night.',
    author: 'Vikram Singh',
    location: 'London',
    rating: 5,
    verified: true,
  },
  {
    id: 6,
    quote:
      'Got the Gold Edition as a housewarming gift. Everyone who visits asks about it first. It sits on our shelf like a trophy.',
    author: 'Natasha K.',
    location: 'Dubai',
    rating: 5,
    verified: true,
  },
];

export const FAQ_ITEMS = [
  {
    q: 'What exactly is TGIW?',
    a: 'TGIW – The Great Indian Wedding – is an immersive cultural experience for 4–8 people. Think of it as a grand Indian wedding brought to your table — the rituals, the chaos, the family drama, the baraat, the pheras — all packed into one unforgettable evening. It\'s not just a game. It\'s a Shaadi.',
  },
  {
    q: 'Who is this made for?',
    a: 'For every Indian living abroad who has "attend a grand Indian wedding" on their bucket list — and for every international guest who has always been curious about what one looks like from the inside. TGIW brings that experience to Dubai, London, New York, or wherever your party is.',
  },
  {
    q: 'How many people can join the Shaadi?',
    a: 'The full experience seats 4 to 8 guests — perfect for a dinner party, a family gathering, or a celebratory evening with friends.',
  },
  {
    q: 'What\'s inside the box?',
    a: 'Multiple themed ceremony boards, 6+ color-coded card decks, gold and silver coins, ceremonial elements (garlands, glasses), a detailed guide, tokens, a miniature microphone, and more — 200+ premium components crafted to bring every wedding ritual to life.',
  },
  {
    q: 'Is prior knowledge of Indian weddings required?',
    a: 'Not at all. The experience is designed to be equally magical whether you\'ve been to a hundred Shaadis or are attending your first one tonight. The cards and guide walk everyone through every ritual with context and humour.',
  },
  {
    q: 'What\'s the delivery timeframe?',
    a: 'Standard delivery within Dubai is 3–5 business days from confirmed order.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently shipping to Dubai, UAE. International shipping coming soon. Contact us at info@celebratetgiw.com for special requests.',
  },
  {
    q: 'What\'s your return policy?',
    a: '30-day money-back guarantee. Items must be in original, unopened condition. Return shipping covered. Refunds processed within 5–7 business days.',
  },
  {
    q: 'Is there a warranty?',
    a: '1-year manufacturer warranty covering component defects. Does not cover normal wear, misuse, or water damage.',
  },
  {
    q: 'What makes this different from anything else out there?',
    a: 'Nothing else on the market lets you live a grand Indian wedding from the inside — the family negotiations, the ceremony rituals, the celebration energy. TGIW is the only experience of its kind, built for the Indian diaspora and the globally curious.',
  },
];

export const GAME_COMPONENTS = [
  {
    id: 1,
    name: 'Game Boards',
    count: 'Multiple',
    description: 'Themed boards covering each wedding ritual — from the Mehendi to the Pheras.',
    icon: '🎲',
  },
  {
    id: 2,
    name: 'Card Decks',
    count: '6+',
    description: 'Color-coded card sets for each wedding event, including surprises and challenges.',
    icon: '🃏',
  },
  {
    id: 3,
    name: 'Coins & Tokens',
    count: '80+',
    description: 'Premium gold and silver-grey coins for transactions, bets, and baraat negotiations.',
    icon: '🪙',
  },
  {
    id: 4,
    name: 'Ceremonial Elements',
    count: '20+',
    description: 'Miniature garlands, glasses, and ritual props for immersive storytelling.',
    icon: '💐',
  },
  {
    id: 5,
    name: 'Instruction Materials',
    count: '1 Set',
    description: 'Illustrated rulebook and quick-start guide in English and Hindi.',
    icon: '📖',
  },
  {
    id: 6,
    name: 'Special Props',
    count: '10+',
    description: 'Unique items including a miniature microphone, DJ console token, and more.',
    icon: '🎤',
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
