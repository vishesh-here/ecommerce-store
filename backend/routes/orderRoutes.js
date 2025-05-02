const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

// Create new order
router.post('/', async (req, res) => {
  try {
    const {
      user,
      items,
      shippingAddress,
      totalAmount,
      shippingCost,
      transactionId
    } = req.body;

    const order = await Order.create({
      user,
      items,
      shippingAddress,
      totalAmount,
      shippingCost,
      transactionId
    });

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate(
      { user },
      { $set: { items: [], totalAmount: 0 } }
    );

    // Update product sales
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { totalSales: item.quantity }
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.product')
      .populate('shippingAddress')
      .sort('-orderDate');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('shippingAddress');
    
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    if (status === 'Delivered') {
      order.actualDeliveryDate = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel order
router.put('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Delivered') {
      return res.status(400).json({ message: 'Cannot cancel delivered order' });
    }

    order.status = 'Cancelled';
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;