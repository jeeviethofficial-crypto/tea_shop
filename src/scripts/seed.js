import mongoose from 'mongoose';
import config from '../config/env.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { PRODUCTS } from '../data/products.js';

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB at', config.mongoUri);
    await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed] Connected successfully');

    // Clean existing products, orders, and test users
    console.log('[Seed] Clearing existing collections...');
    await Product.deleteMany({});
    await Order.deleteMany({});
    await User.deleteMany({ email: { $in: ['admin@zenleaftea.com', 'customer@zenleaftea.com', 'eleanor.vance@mindfultravel.com'] } });

    // Seed Users
    console.log('[Seed] Creating demo users...');
    const adminUser = await User.create({
      name: 'ZenLeaf Administrator',
      email: 'admin@zenleaftea.com',
      password: 'admin123456',
      role: 'admin',
      tier: 'Master of the Way',
      leavesPoints: 1200
    });

    const customerUser = await User.create({
      name: 'Eleanor Vance',
      email: 'eleanor.vance@mindfultravel.com',
      password: 'tea123456',
      role: 'customer',
      tier: 'Tier II (Kyoto Apprentice)',
      leavesPoints: 150
    });

    console.log(`[Seed] Created admin: ${adminUser.email}`);
    console.log(`[Seed] Created customer: ${customerUser.email}`);

    // Seed Products directly from frontend catalog data
    console.log(`[Seed] Seeding ${PRODUCTS.length} artisan tea products...`);
    const productsToInsert = PRODUCTS.map((p, idx) => ({
      ...p,
      isFeatured: idx < 3,
      variants: p.variants.map((v) => ({
        ...v,
        stock: 50,
        inStock: true
      }))
    }));

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`[Seed] Successfully seeded ${createdProducts.length} artisan products:`);
    createdProducts.forEach((p, idx) => {
      console.log(`   ${idx + 1}. [${p.category}] ${p.name} (${p.variants.length} variants) - rating: ${p.rating}`);
    });

    // Create an initial sample order for Eleanor Vance
    console.log('[Seed] Creating initial sample order...');
    const sampleProduct = createdProducts[0];
    const sampleVariant = sampleProduct.variants[0];
    await Order.create({
      orderId: 'ZL-749102',
      user: customerUser._id,
      customer: {
        name: customerUser.name,
        email: customerUser.email,
        phone: '+1 (503) 555-0194'
      },
      items: [
        {
          product: sampleProduct.id || sampleProduct._id,
          productName: sampleProduct.name,
          productImage: sampleProduct.image,
          variantId: sampleVariant.id,
          variantLabel: sampleVariant.label,
          price: sampleVariant.price,
          quantity: 1,
          subtotal: sampleVariant.price
        }
      ],
      subtotal: sampleVariant.price,
      discountCode: 'ZEN15',
      discountPercent: 15,
      discountAmount: Math.round(((sampleVariant.price * 15) / 100) * 100) / 100,
      shippingAmount: 0,
      grandTotal: Math.round((sampleVariant.price * 0.85) * 100) / 100,
      shippingAddress: {
        fullName: 'Eleanor Vance',
        street: '452 Serenity Way',
        city: 'Portland',
        state: 'OR',
        postalCode: '97201',
        country: 'USA'
      },
      paymentDetails: {
        method: 'card',
        last4: '4242',
        status: 'paid'
      },
      status: 'delivered'
    });
    console.log('[Seed] Initial sample order ZL-749102 created successfully');

    console.log('\n===========================================');
    console.log('  ZenLeaf Tea Database Seed Completed!');
    console.log('===========================================');
    console.log('Demo Credentials:');
    console.log('  Admin:    admin@zenleaftea.com            / admin123456');
    console.log('  Customer: eleanor.vance@mindfultravel.com / tea123456');
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
