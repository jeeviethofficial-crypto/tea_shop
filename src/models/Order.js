import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.Mixed, // Can be ObjectId or string ID (e.g. 'zen-01')
      required: [true, 'Product reference is required']
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productImage: {
      type: String,
      default: '/images/hero_matcha.webp'
    },
    variantId: {
      type: String,
      default: ''
    },
    variantLabel: {
      type: String,
      required: [true, 'Variant label is required']
    },
    price: {
      type: Number,
      required: [true, 'Item unit price is required'],
      min: [0, 'Item price must be positive']
    },
    quantity: {
      type: Number,
      required: [true, 'Item quantity is required'],
      min: [1, 'Quantity must be at least 1']
    },
    subtotal: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
      index: true
    },
    customer: {
      name: { type: String, default: 'Guest Customer' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' }
    },
    items: {
      type: [orderItemSchema],
      required: [true, 'Order must contain at least one item'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Order items cannot be empty'
      }
    },
    subtotal: {
      type: Number,
      required: [true, 'Subtotal is required'],
      min: [0, 'Subtotal cannot be negative']
    },
    discountCode: {
      type: String,
      default: ''
    },
    discountPercent: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    shippingAmount: {
      type: Number,
      default: 0
    },
    grandTotal: {
      type: Number,
      required: [true, 'Grand total is required'],
      min: [0, 'Grand total cannot be negative']
    },
    shippingAddress: {
      fullName: { type: String, default: '' },
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      postalCode: { type: String, default: '' },
      country: { type: String, default: 'USA' }
    },
    paymentDetails: {
      method: { type: String, default: 'card' },
      last4: { type: String, default: '4242' },
      status: {
        type: String,
        enum: ['unpaid', 'paid', 'refunded'],
        default: 'paid'
      }
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        message: '{VALUE} is not a valid order status'
      },
      default: 'processing',
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Order = mongoose.model('Order', orderSchema);
export default Order;
