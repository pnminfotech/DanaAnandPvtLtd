const express = require('express');
const { createVendor, getVendors, getVendorById } = require('../controller/vendorController');

const router = express.Router();

// Route to create a vendor
router.post('/create', createVendor);

// Route to get all vendors
router.get('/all', getVendors);

// Route to get a single vendor by id
router.get('/:id', getVendorById);

module.exports = router;
