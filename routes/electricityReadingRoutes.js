// routes/electricityReadingRoutes.js

const express = require('express');
const router = express.Router();
const electricityReadingController = require('../controller/electricityReadingController');

// Get all readings
router.get('/all', electricityReadingController.getAllReadings);

// Get a reading by ID
router.get('/:id', electricityReadingController.getReadingById);

// Create a new reading
router.post('/create', electricityReadingController.createReading);

// Update a reading
router.put('/update/:id', electricityReadingController.updateReading);

// Delete a reading
router.delete('/delete/:id', electricityReadingController.deleteReading);

module.exports = router;
