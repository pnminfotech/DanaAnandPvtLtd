// routes/courierRoutes.js
const express = require('express');
const { submitCourier, getAllCouriers, getCouriersByType } = require('../controller/courierController');
const router = express.Router();

// POST request to submit a courier
router.post('/submit', submitCourier);

// GET request to fetch all couriers
router.get('/', getAllCouriers);

// GET request to fetch couriers by type (inward or outward)
router.get('/:type', getCouriersByType);

module.exports = router;
