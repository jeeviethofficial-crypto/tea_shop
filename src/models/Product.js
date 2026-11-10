import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Variant ID is required'],
      trim: true
    },
    label: {
      type: String,
      required: [true, 'Variant label is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Variant price is required'],
      min: [0, 'Price must be non-negative']
    },
    weight: {
      type: String,
      default: ''
    },
    inStock: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 50,
      min: [0, 'Stock cannot be negative']
    }
  },
  { _id: false }
);

const brewGuideSchema = new mongoose.Schema(
  {
    temp: {
      type: String,
      default: '80°C / 175°F'
    },
    amount: {
      type: String,
      default: '2g - 3g leaves'
    },
    water: {
      type: String,
      default: '100ml - 150ml water'
    },
    style: {
      type: String,
      default: 'Steep for 2 minutes'
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters']
    },
    japaneseName: {
      type: String,
      default: '',
      trim: true
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
      type: String,
      default: 'Unknown Origin',
      trim: true
    },
    subregion: {
      type: String,
      default: 'Single Estate',
      trim: true
    },
    elevation: {
      type: String,
      default: ''
    },
    harvest: {
      type: String,
      default: ''
    },
    caffeine: {
      type: String,
      default: 'Medium'
    },
    rating: {
      type: Number,
      default: 4.9,
      min: [1, 'Rating must be at least 1.0'],
      max: [5, 'Rating cannot exceed 5.0']
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    badge: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: '/images/hero_matcha.webp'
    },
    description: {
      type: String,
      default: ''
    },
    flavorNotes: {
      type: [String],
      default: []
    },
    brewGuide: {
      type: brewGuideSchema,
      default: () => ({})
    },
    variants: {
      type: [variantSchema],
      required: [true, 'At least one variant size with pricing is required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Product must have at least one variant'
      }
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        if (!ret.id && ret._id) {
          ret.id = ret._id.toString();
        }
        delete ret.__v;
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

// Backward-compatibility aliases
productSchema.virtual('title').get(function () {
  return this.name;
});
productSchema.virtual('imageUrl').get(function () {
  return this.image;
});
productSchema.virtual('tastingNotes').get(function () {
  return this.flavorNotes;
});

// Slugify helper
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Auto-generate slug and id if not provided before validation
productSchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = generateSlug(this.name);
  }
  if (!this.id && this.slug) {
    this.id = this.slug;
  }
});

// Indexes for fast querying, filtering, and text search
productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ 'variants.price': 1 });
productSchema.index(
  {
    name: 'text',
    description: 'text',
    flavorNotes: 'text',
    origin: 'text',
    subregion: 'text'
  },
  {
    weights: {
      name: 10,
      flavorNotes: 5,
      origin: 3,
      description: 1
    },
    name: 'ProductTextSearchIndex'
  }
);

export const Product = mongoose.model('Product', productSchema);
export default Product;
