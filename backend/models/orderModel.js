const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  transactionId: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  expectedDeliveryDate: {
    type: Date
  },
  actualDeliveryDate: {
    type: Date
  },
  trackingNumber: String,
  notes: String
});

// Calculate expected delivery date before saving
orderSchema.pre('save', function(next) {
  if (!this.expectedDeliveryDate) {
    // Set expected delivery date to 7 days from order date
    this.expectedDeliveryDate = new Date(this.orderDate.getTime() + (7 * 24 * 60 * 60 * 1000));
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;