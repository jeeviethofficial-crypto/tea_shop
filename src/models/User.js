import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const tastingNoteSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    steepGuide: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5
    },
    notes: {
      type: String,
      default: ''
    },
    steepedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false // Exclude from query results by default
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'admin'],
        message: '{VALUE} is not a valid role'
      },
      default: 'customer'
    },
    tier: {
      type: String,
      default: 'Tier II (Kyoto Apprentice)'
    },
    leavesPoints: {
      type: Number,
      default: 150,
      min: 0
    },
    tastingJournal: {
      type: [tastingNoteSchema],
      default: () => [
        {
          productName: 'Uji Ceremonial Matcha',
          steepGuide: 'Steeped: 80°C, 20s whisk',
          rating: 5.0,
          notes: 'Vibrant emerald foam with rich sweet umami finish.',
          steepedAt: new Date()
        },
        {
          productName: 'Wuyi Da Hong Pao',
          steepGuide: 'Steeped: 95°C, 30s flash',
          rating: 4.9,
          notes: 'Intoxicating roasted orchid, mineral rock, and honey wood notes.',
          steepedAt: new Date(Date.now() - 86400000 * 2)
        }
      ]
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Hash password before saving if modified
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
export default User;
