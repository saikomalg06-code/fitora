const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    userName: {
      type: String,
      default: 'Guest Tailoring'
    },

    garment: {
      type: String,
      required: [true, 'Garment type is required (e.g. Shirt, T-Shirt, Kurta)'],
      trim: true,
      default: 'Shirt'
    },

    sizeType: {
      type: String,
      enum: ['standard', 'custom'],
      default: 'standard'
    },

    size: {
      type: String,
      default: 'M'
    },

    measurements: {
      chest: { type: Number, default: 40 },
      shoulder: { type: Number, default: 18 },
      waist: { type: Number, default: 36 },
      sleeve: { type: Number, default: 24 },
      length: { type: Number, default: 28 }
    },

    design: {
      color: { type: String, default: 'Blue' },
      fabric: { type: String, default: 'Cotton' },
      fit: { type: String, default: 'Regular' },
      sleeves: { type: String, default: 'Full' },
      neckline: { type: String, default: 'Collar' },
      pockets: { type: Number, default: 1 },
      garmentLength: { type: String, default: 'Regular' }
    },

    preferences: {
      occasion: { type: String, default: 'Casual' },
      weather: { type: String, default: 'Moderate' },
      priority: { type: String, default: 'Comfort' }
    },

    recommendation: {
      fabric: { type: String, default: '' },
      color: { type: String, default: '' },
      fit: { type: String, default: '' },
      reason: { type: String, default: '' }
    },

    estimatedPrice: {
      type: Number,
      required: [true, 'Estimated price is required'],
      default: 700
    },

    productionTime: {
      type: String,
      default: '3–5 Days'
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Design', DesignSchema);
