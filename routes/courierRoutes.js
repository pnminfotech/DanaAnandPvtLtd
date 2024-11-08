const express = require('express');
const { 
  updateOutwardCourier,
  deleteOutwardCourier,
  getAllOutwardCouriers,
  submitCourier,
  deleteInwardCourier,
  updateInwardCourier,
  getAllInwardCouriers,
  getAllCouriers,
  updateCourier,
  deleteCourier,
  getCouriersByType 
} = require('../controller/courierController');

const router = express.Router();

// POST request to submit a courier
router.post('/submit', submitCourier);

// GET request to fetch all couriers
router.get('/', getAllCouriers);

// For Inward Courier
router.get('/InwardC', getAllInwardCouriers);
router.put('/InwardC/update/:id', updateInwardCourier);
router.delete('/InwardC/delete/:id', deleteInwardCourier);

// For Outward Courier
router.get('/OutwardC', getAllOutwardCouriers);
router.put('/OutwardC/update/:id', updateOutwardCourier);
router.delete('/OutwardC/delete/:id', deleteOutwardCourier);

// GET request to fetch couriers by type (inward or outward) - must come last
router.get('/:type', getCouriersByType);
router.put('/update/:id', updateCourier);

// Delete an existing courier
router.delete('/delete/:id', deleteCourier);

module.exports = router;
