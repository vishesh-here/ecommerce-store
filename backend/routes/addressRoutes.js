const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel');

// Add new address
router.post('/', async (req, res) => {
  try {
    const {
      user,
      type,
      name,
      phoneNumber,
      line1,
      line2,
      city,
      state,
      pinCode,
      isDefault,
      landmark
    } = req.body;

    const address = await Address.create({
      user,
      type,
      name,
      phoneNumber,
      line1,
      line2,
      city,
      state,
      pinCode,
      isDefault,
      landmark
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's addresses
router.get('/user/:userId', async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.params.userId });
    res.json(addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update address
router.put('/:id', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete address
router.delete('/:id', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await address.remove();
    res.json({ message: 'Address removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Set default address
router.put('/:id/set-default', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Remove default from all other addresses of the user
    await Address.updateMany(
      { user: address.user },
      { $set: { isDefault: false } }
    );

    // Set this address as default
    address.isDefault = true;
    const updatedAddress = await address.save();

    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;