const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Home', 'Work', 'Other'],
    default: 'Home'
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  line1: {
    type: String,
    required: [true, 'Address line 1 is required']
  },
  line2: String,
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  pinCode: {
    type: String,
    required: [true, 'PIN code is required'],
    validate: {
      validator: function(v) {
        return /\d{6}/.test(v);
      },
      message: props => `${props.value} is not a valid PIN code!`
    }
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  landmark: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
addressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure only one default address per user
addressSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;