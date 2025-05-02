const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlistModel');

// Get user's wishlist
router.get('/:userId', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.params.userId })
      .populate('products');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.params.userId, products: [] });
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add product to wishlist
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.params.userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.params.userId,
        products: [productId]
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('products');
    
    res.json(populatedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove product from wishlist
router.delete('/:userId/remove/:productId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      product => product.toString() !== req.params.productId
    );

    await wishlist.save();
    
    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('products');
    
    res.json(populatedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Clear wishlist
router.delete('/:userId/clear', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = [];
    await wishlist.save();
    
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;