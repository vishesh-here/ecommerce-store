const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1']
    }
  }],
  totalAmount: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp and calculate total amount before saving
cartSchema.pre('save', async function(next) {
  this.updatedAt = Date.now();
  
  let total = 0;
  for (const item of this.items) {
    const product = await mongoose.model('Product').findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  this.totalAmount = total;
  
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;