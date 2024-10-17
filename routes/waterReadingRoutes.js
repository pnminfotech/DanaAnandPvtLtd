const express = require('express');
const router = express.Router();
const WaterReading = require('../models/waterReadingModel');

// POST request to add water reading
router.post('/submit', async (req, res) => {
  try {
    const { serialNo, date, startReading, endReading, total, name } = req.body;

    // Validation
    if (!serialNo || !date || !startReading || !endReading || !total || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newWaterReading = new WaterReading({ serialNo, date, startReading, endReading, total, name });
    await newWaterReading.save();
    res.status(201).json({ message: 'Water reading added successfully', newWaterReading });
  } catch (error) {
    res.status(500).json({ error: 'Error adding water reading', details: error.message });
  }
});

// GET request to fetch all water readings
router.get('/', async (req, res) => {
  try {
    const readings = await WaterReading.find();
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching water readings', details: error.message });
  }
});

module.exports = router;
