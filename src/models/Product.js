import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: [true, 'Variant size is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Variant price is required'],
      min: [0, 'Price must be non-negative']
    },
    stock: {
      type: Number,
      required: [true, 'Variant stock is required'],
      default: 0,
      min: [0, 'Stock cannot be negative']
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Green & Matcha',
          'Black & Oolong',
          'Herbal & Infusions',
          'Tea Ware & Gifts'
        ],
        message: '{VALUE} is not a valid tea category'
      }
    },
    origin: {
      country: {
        type: String,
        default: 'Unknown'
      },
      region: {
        type: String,
        default: 'Single Estate'
      }
    },
    tastingNotes: {
      type: [String],
      default: []
    },
    variants: {
      type: [variantSchema],
      required: [true, 'At least one variant is required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Product must have at least one variant size with pricing'
      }
    },
    imageUrl: {
      type: String,
      default: '/images/hero_matcha.jpg'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    brewingGuide: {
      temp: {
        type: String,
        default: '80°C / 175°F'
      },
      steepTime: {
        type: String,
        default: '2 - 3 minutes'
      }
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

// Slugify helper
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Auto-populate slug if not provided before validation
productSchema.pre('validate', function () {
  if (this.title && !this.slug) {
    this.slug = generateSlug(this.title);
  }
});

// Indexes for fast searching, filtering, and sorting
productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ 'variants.price': 1 });
productSchema.index(
  {
    title: 'text',
    tastingNotes: 'text',
    'origin.country': 'text',
    'origin.region': 'text'
  },
  {
    weights: {
      title: 10,
      tastingNotes: 5,
      'origin.country': 2,
      'origin.region': 2
    },
    name: 'ProductTextIndex'
  }
);

export const Product = mongoose.model('Product', productSchema);
export default Product;
