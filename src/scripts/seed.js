import mongoose from 'mongoose';
import config from '../config/env.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

const ARTISAN_TEAS = [
  {
    title: 'Ceremonial Grade Uji Matcha',
    slug: 'ceremonial-grade-uji-matcha',
    category: 'Green & Matcha',
    origin: {
      country: 'Japan',
      region: 'Kyoto (Uji Single Estate)'
    },
    tastingNotes: ['Rich Umami', 'Creamy Foam', 'Sweet Grass', 'Subtle Nori'],
    variants: [
      { size: '50g Tin', price: 34, stock: 45 },
      { size: '100g Pouch', price: 58, stock: 30 }
    ],
    imageUrl: '/images/hero_matcha.jpg',
    isFeatured: true,
    brewingGuide: {
      temp: '80°C / 175°F',
      steepTime: 'Whisk 20s briskly in W motion'
    }
  },
  {
    title: 'Imperial Gyokuro Shade-Grown',
    slug: 'imperial-gyokuro-shade-grown',
    category: 'Green & Matcha',
    origin: {
      country: 'Japan',
      region: 'Shizuoka (Mount Fuji Foothills)'
    },
    tastingNotes: ['Marine Sweetness', 'Toasted Pine', 'Melon Dew', 'Deep Umami'],
    variants: [
      { size: '50g Tin', price: 38, stock: 25 },
      { size: '100g Pouch', price: 68, stock: 15 }
    ],
    imageUrl: '/images/gyokuro.jpg',
    isFeatured: true,
    brewingGuide: {
      temp: '60°C / 140°F',
      steepTime: 'Steep 90s'
    }
  },
  {
    title: 'Wuyi Cliff Da Hong Pao Oolong',
    slug: 'wuyi-cliff-da-hong-pao-oolong',
    category: 'Black & Oolong',
    origin: {
      country: 'China',
      region: 'Wuyi Mountains (Zhengyan Rock Valley)'
    },
    tastingNotes: ['Roasted Orchid', 'Mineral Rock', 'Stone Fruit', 'Honey Wood'],
    variants: [
      { size: '50g Tin', price: 29, stock: 50 },
      { size: '100g Pouch', price: 52, stock: 35 }
    ],
    imageUrl: '/images/wuyi_oolong.jpg',
    isFeatured: true,
    brewingGuide: {
      temp: '95°C / 203°F',
      steepTime: 'Flash brew 25s'
    }
  },
  {
    title: 'Nuwara Eliya High Grown Ceylon',
    slug: 'nuwara-eliya-high-grown-ceylon',
    category: 'Black & Oolong',
    origin: {
      country: 'Sri Lanka',
      region: 'Nuwara Eliya (Lovers Leap Peak)'
    },
    tastingNotes: ['Wildflower Honey', 'Bright Citrus', 'Eucalyptus', 'Muscatel'],
    variants: [
      { size: '50g Tin', price: 24, stock: 60 },
      { size: '100g Pouch', price: 42, stock: 40 }
    ],
    imageUrl: '/images/nuwara_eliya.jpg',
    isFeatured: false,
    brewingGuide: {
      temp: '92°C / 198°F',
      steepTime: 'Steep 3 - 4 minutes'
    }
  },
  {
    title: 'Himalayan Organic Chamomile & Lavender',
    slug: 'himalayan-organic-chamomile-lavender',
    category: 'Herbal & Infusions',
    origin: {
      country: 'India',
      region: 'Kumaon Valley (High Himalayas)'
    },
    tastingNotes: ['Crisp Apple', 'Velvet Lavender', 'Golden Honey', 'Vanilla Bean'],
    variants: [
      { size: '50g Tin', price: 22, stock: 40 },
      { size: '100g Pouch', price: 38, stock: 25 }
    ],
    imageUrl: '/images/chamomile_lavender.jpg',
    isFeatured: false,
    brewingGuide: {
      temp: '100°C / 212°F',
      steepTime: 'Steep 5 - 7 minutes'
    }
  },
  {
    title: 'Artisan Tokoname Ceramic Kyusu Teapot',
    slug: 'artisan-tokoname-ceramic-kyusu-teapot',
    category: 'Tea Ware & Gifts',
    origin: {
      country: 'Japan',
      region: 'Aichi (Tokoname Kiln)'
    },
    tastingNotes: ['Unglazed Red Clay', 'Natural Ion Smoothing', 'Precision Mesh Filter'],
    variants: [
      { size: '280ml Kyusu', price: 68, stock: 12 },
      { size: 'Gift Set with 2 Cups', price: 92, stock: 8 }
    ],
    imageUrl: '/images/hero_matcha.jpg',
    isFeatured: true,
    brewingGuide: {
      temp: 'N/A',
      steepTime: 'Ideal for multi-infusion green & oolong teas'
    }
  }
];

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB at', config.mongoUri);
    await mongoose.connect(config.mongoUri);
    console.log('[Seed] Connected successfully');

    // Clean existing products, orders, and test users
    console.log('[Seed] Clearing existing collections...');
    await Product.deleteMany({});
    await Order.deleteMany({});
    await User.deleteMany({ email: { $in: ['admin@zenleaftea.com', 'customer@zenleaftea.com'] } });

    // Seed Users
    console.log('[Seed] Creating demo users...');
    const adminUser = await User.create({
      name: 'ZenLeaf Administrator',
      email: 'admin@zenleaftea.com',
      password: 'admin123456',
      role: 'admin'
    });

    const customerUser = await User.create({
      name: 'Evelyn Reed',
      email: 'customer@zenleaftea.com',
      password: 'tea123456',
      role: 'customer'
    });

    console.log(`[Seed] Created admin: ${adminUser.email}`);
    console.log(`[Seed] Created customer: ${customerUser.email}`);

    // Seed Products
    console.log('[Seed] Seeding 6 artisan tea products...');
    const createdProducts = await Product.insertMany(ARTISAN_TEAS);
    console.log(`[Seed] Successfully seeded ${createdProducts.length} artisan products:`);
    createdProducts.forEach((p, idx) => {
      console.log(`   ${idx + 1}. [${p.category}] ${p.title} (${p.variants.length} variants)`);
    });

    // Create an initial sample order for the customer
    console.log('[Seed] Creating initial sample order...');
    const sampleProduct = createdProducts[0];
    const sampleVariant = sampleProduct.variants[0];
    await Order.create({
      user: customerUser._id,
      items: [
        {
          product: sampleProduct._id,
          variantSize: sampleVariant.size,
          price: sampleVariant.price,
          quantity: 1
        }
      ],
      totalAmount: sampleVariant.price,
      shippingAddress: {
        fullName: 'Evelyn Reed',
        street: '452 Serenity Way',
        city: 'Portland',
        state: 'OR',
        postalCode: '97201',
        country: 'USA'
      },
      status: 'processing',
      paymentStatus: 'paid'
    });
    console.log('[Seed] Initial sample order created successfully');

    console.log('\n===========================================');
    console.log('  ZenLeaf Tea Database Seed Completed!');
    console.log('===========================================');
    console.log('Demo Credentials:');
    console.log('  Admin:    admin@zenleaftea.com    / admin123456');
    console.log('  Customer: customer@zenleaftea.com / tea123456');
    console.log('===========================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
