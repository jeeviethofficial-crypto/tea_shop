export const PRODUCTS = [
  {
    id: "zen-01",
    name: "Ceremonial Grade Uji Matcha",
    japaneseName: "宇治 抹茶",
    category: "Green & Matcha",
    origin: "Kyoto, Japan",
    subregion: "Uji Single Estate",
    elevation: "320m",
    harvest: "First Flush (Ichibancha) 2026",
    caffeine: "High",
    rating: 4.95,
    reviewsCount: 312,
    badge: "Master's Choice",
    image: "/images/hero_matcha.webp",
    description: "Stone-ground for over 3 hours per tin from shaded tencha leaves. Vibrant jade green liquor boasting profound umami, delicate natural sweetness, and a creamy froth without bitterness.",
    flavorNotes: ["Rich Umami", "Creamy Foam", "Sweet Grass", "Subtle Nori"],
    brewGuide: {
      temp: "80°C / 175°F",
      amount: "2g (1 chashaku scoop)",
      water: "70ml filtered water",
      style: "Whisk briskly in 'W' motion for 20s"
    },
    variants: [
      { id: "50g", label: "50g Ceremonial Tin", price: 34, weight: "50g", inStock: true },
      { id: "100g", label: "100g Refill Pouch", price: 58, weight: "100g", inStock: true }
    ]
  },
  {
    id: "zen-02",
    name: "Imperial Gyokuro Shade-Grown",
    japaneseName: "玉露 煎茶",
    category: "Green & Matcha",
    origin: "Shizuoka, Japan",
    subregion: "Mount Fuji Foothills",
    elevation: "450m",
    harvest: "Spring 2026 Micro-Lot",
    caffeine: "Medium-High",
    rating: 4.92,
    reviewsCount: 184,
    badge: "Rare Harvest",
    image: "/images/gyokuro.webp",
    description: "Shaded under rice straw mats for 21 days before hand-harvesting. Produces an emerald dew liquor with extraordinary L-theanine concentration and deep oceanic sweetness.",
    flavorNotes: ["Marine Sweetness", "Toasted Pine", "Melon Dew", "Deep Umami"],
    brewGuide: {
      temp: "60°C / 140°F",
      amount: "5g leaves",
      water: "100ml warm water",
      style: "Steep 90s; re-steep up to 4 times"
    },
    variants: [
      { id: "50g", label: "50g Artisan Tin", price: 38, weight: "50g", inStock: true },
      { id: "100g", label: "100g Reserve Pouch", price: 68, weight: "100g", inStock: true }
    ]
  },
  {
    id: "zen-03",
    name: "Wuyi Cliff Da Hong Pao Oolong",
    japaneseName: "大紅袍 烏龍茶",
    category: "Black & Oolong",
    origin: "Wuyi Mountains, China",
    subregion: "Zhengyan Rock Valley",
    elevation: "950m",
    harvest: "Traditional Charcoal Roasted",
    caffeine: "Medium",
    rating: 4.89,
    reviewsCount: 156,
    badge: "Heritage Roast",
    image: "/images/wuyi_oolong.webp",
    description: "Grown in the mineral-rich volcanic cliffs of Mount Wuyi. Charcoal-baked over slow longan wood embers to unlock an intoxicating aroma of roasted orchid and stone fruit.",
    flavorNotes: ["Roasted Orchid", "Mineral Rock", "Stone Fruit", "Honey Wood"],
    brewGuide: {
      temp: "95°C / 203°F",
      amount: "6g leaves",
      water: "120ml water",
      style: "Gaiwan flash brews (15s - 30s) up to 8 infusions"
    },
    variants: [
      { id: "50g", label: "50g Tin", price: 29, weight: "50g", inStock: true },
      { id: "100g", label: "100g Pouch", price: 52, weight: "100g", inStock: true }
    ]
  },
  {
    id: "zen-04",
    name: "Nuwara Eliya High Grown Ceylon",
    japaneseName: "セイロン 高地紅茶",
    category: "Black & Oolong",
    origin: "Nuwara Eliya, Sri Lanka",
    subregion: "Lovers Leap Peak Estate",
    elevation: "1,890m",
    harvest: "Bespoke Peak Monsoon Dry Flush",
    caffeine: "High",
    rating: 4.88,
    reviewsCount: 119,
    badge: "Single Estate",
    image: "/images/nuwara_eliya.webp",
    description: "The 'Champagne of Ceylon Teas'. Harvested in crisp mountain mists above 6,000 feet. Crystal golden-amber infusion with fragrant notes of eucalyptus, wild citrus, and wildflower honey.",
    flavorNotes: ["Wildflower Honey", "Bright Citrus", "Eucalyptus", "Muscatel"],
    brewGuide: {
      temp: "92°C / 198°F",
      amount: "3g leaves",
      water: "200ml spring water",
      style: "Steep 3 minutes; beautiful plain or with lemon"
    },
    variants: [
      { id: "50g", label: "50g Tin", price: 24, weight: "50g", inStock: true },
      { id: "100g", label: "100g Pouch", price: 42, weight: "100g", inStock: true }
    ]
  },
  {
    id: "zen-05",
    name: "Kyoto Twilight Botanical Tisane",
    japaneseName: "カモミール 薬草茶",
    category: "Herbal & Infusions",
    origin: "Nagano & Provence, Direct Sourced",
    subregion: "Organic Alpine Meadow",
    elevation: "700m",
    harvest: "Whole Flower Sun-Dried",
    caffeine: "Zero Caffeine",
    rating: 4.96,
    reviewsCount: 203,
    badge: "Evening Ritual",
    image: "/images/botanical_herbal.webp",
    description: "Whole golden German chamomile heads paired with sweet French lavender, lemongrass, and lemon balm. Hand-blended for tranquil nervous system soothing and restorative sleep.",
    flavorNotes: ["Honeyed Apple", "French Lavender", "Lemongrass", "Vanilla Bean"],
    brewGuide: {
      temp: "98°C / 208°F",
      amount: "4g flowers",
      water: "250ml water",
      style: "Steep 5-7 minutes covered for maximum oils"
    },
    variants: [
      { id: "50g", label: "50g Ceramic Jar", price: 26, weight: "50g", inStock: true },
      { id: "100g", label: "100g Eco Pouch", price: 44, weight: "100g", inStock: true }
    ]
  },
  {
    id: "zen-06",
    name: "Handcrafted Tokoname Kyusu Teapot",
    japaneseName: "常滑焼 急須",
    category: "Tea Ware & Gifts",
    origin: "Tokoname, Aichi, Japan",
    subregion: "Master Potter Yamada Kiln",
    elevation: "Artisan Ceramic",
    harvest: "Fired Unglazed Red Stoneware Clay",
    caffeine: "N/A",
    rating: 4.99,
    reviewsCount: 88,
    badge: "Artisan Crafted",
    image: "/images/ceramic_kyusu.webp",
    description: "Sculpted from iron-rich mineral clay that naturally softens tea astringency. Features a handcrafted ceramic mesh filter and ergonomic side handle for mindful one-handed pouring.",
    flavorNotes: ["Enhances Umami", "Clay Patina", "Zero Plastic", "Heirloom Quality"],
    brewGuide: {
      temp: "Safe up to 100°C",
      amount: "Capacity: 280ml",
      water: "Includes 2 matching cups",
      style: "Rinse with hot water only; develop tea glaze with time"
    },
    variants: [
      { id: "standard", label: "Kyusu + 2 Tasting Cups", price: 88, weight: "Set", inStock: true }
    ]
  },
  {
    id: "zen-07",
    name: "Master Ceremonial Matcha Gift Set",
    japaneseName: "茶道 抹茶揃え",
    category: "Tea Ware & Gifts",
    origin: "Nara & Kyoto, Japan",
    subregion: "Traditional Woodworking Guild",
    elevation: "Hand Carved",
    harvest: "Sustainable Golden Bamboo",
    caffeine: "N/A",
    rating: 4.97,
    reviewsCount: 142,
    badge: "Complete Ritual",
    image: "/images/matcha_gift_set.webp",
    description: "The complete Japanese tea ceremony starter set: includes a hand-carved 100-prong bamboo chasen whisk, carved chashaku spoon, black glazed tenmoku chawan, and 30g fresh ceremonial matcha.",
    flavorNotes: ["Authentic Chasen", "Tenmoku Glaze", "Hand Carved Bamboo", "Gift Boxed"],
    brewGuide: {
      temp: "Care Instructions",
      amount: "Whisk holder included",
      water: "Chawan 350ml",
      style: "Soak bamboo prongs in warm water 30s before whisking"
    },
    variants: [
      { id: "gift-box", label: "Complete Gift Box Set", price: 110, weight: "Box Set", inStock: true }
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Green & Matcha",
  "Black & Oolong",
  "Herbal & Infusions",
  "Tea Ware & Gifts"
];

export const QUIZ_QUESTIONS = [
  {
    id: "time",
    question: "When do you seek your primary tea ritual?",
    subtitle: "Every tea aligns with different natural biorhythms and morning sunlight.",
    options: [
      { id: "morning", label: "Morning Clarity & Focus", hint: "Vibrant energy, serene alertness", matchCat: "Green & Matcha" },
      { id: "afternoon", label: "Midday Pause & Sustained Vitality", hint: "Rich body, mineral complexity", matchCat: "Black & Oolong" },
      { id: "evening", label: "Sunset Wind-down & Restorative Sleep", hint: "Calming aromatics, caffeine-free", matchCat: "Herbal & Infusions" }
    ]
  },
  {
    id: "taste",
    question: "Which flavor palette resonates with your senses?",
    subtitle: "From oceanic vegetal depth to warm roasted orchid blossoms.",
    options: [
      { id: "umami", label: "Fresh Vegetal & Creamy Umami", hint: "Notes of baby spinach, sweet cream, steamed bamboo" },
      { id: "roasted", label: "Charcoal Roasted, Malt & Stone Fruit", hint: "Notes of dried plum, wildflower honey, roasted cacao" },
      { id: "floral", label: "Delicate Floral & Calming Botanicals", hint: "Notes of lavender fields, chamomile blossom, sweet apple" }
    ]
  },
  {
    id: "ritual",
    question: "How do you enjoy preparing your brew?",
    subtitle: "Mindful craft takes many forms, from fast infusions to meditative whisking.",
    options: [
      { id: "whisk", label: "Ceremonial Whisking (Chasen & Bowl)", hint: "Frothy, rich, deeply mindful preparation" },
      { id: "steep", label: "Loose Leaf Teapot or Gaiwan", hint: "Multi-infusion aroma exploration" },
      { id: "infuser", label: "Simple Mug Infuser or Travel Tumbler", hint: "Effortless every-day pure leaf sipping" }
    ]
  }
];
