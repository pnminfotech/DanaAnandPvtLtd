const express = require('express');
const router = express.Router();
const {submitWater , getAllWater, updateWaterReading, deleteWaterReading} = require('../controller/waterController')

router.post('/submit', submitWater);

router.get('/all', getAllWater);

router.put('/update/:id', updateWaterReading);

router.delete('/delete/:id', deleteWaterReading);

module.exports = router;
