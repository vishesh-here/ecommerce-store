const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Get all products with filtering
router.get('/', async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    let query = Product.find(queryObj);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const products = await query;
    const total = await Product.countDocuments(queryObj);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add product rating
router.post('/:id/ratings', async (req, res) => {
  try {
    const { userId, rating, review } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const alreadyReviewed = product.ratings.find(
      (r) => r.userId.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const newRating = {
      userId,
      rating,
      review,
    };

    product.ratings.push(newRating);

    // Calculate average rating
    product.averageRating = product.ratings.reduce((acc, item) => item.rating + acc, 0) / product.ratings.length;

    await product.save();
    res.status(201).json({ message: 'Rating added' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get hot and new products
router.get('/filter/hot-and-new', async (req, res) => {
  try {
    const products = await Product.find({ category: 'Hot and New' })
      .sort('-createdAt')
      .limit(10);
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get evergreen products
router.get('/filter/evergreen', async (req, res) => {
  try {
    const products = await Product.find({ category: 'Evergreen' })
      .sort('-totalSales')
      .limit(10);
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;