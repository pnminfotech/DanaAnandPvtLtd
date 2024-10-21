const express = require('express');
const { createVendor, getVendors, getVendorById, updateVendor, deleteVendor ,downloadReport} = require('../controller/vendorController');

const router = express.Router();

// Route to create a vendor
router.post('/create', createVendor);

// Route to get all vendors
router.get('/all', getVendors);

// Route to get a single vendor by id
router.get('/:id', getVendorById);

router.put('/update/:id', updateVendor); // Update route
router.delete('/delete/:id', deleteVendor); // Delete route
router.delete('/export', downloadReport);


module.exports = router;
