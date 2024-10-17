const express = require('express');
const router = express.Router();
const {submitWater , getAllWater} = require('../controller/waterController')

// POST request to add water reading
router.post('/submit', submitWater);

// GET request to fetch all water readings
router.get('/all', getAllWater);

module.exports = router;
