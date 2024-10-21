const express = require('express');
const router = express.Router();
const {submitWater , getAllWater, updateWaterReading, deleteWaterReading, downloadExport} = require('../controller/waterController')

router.post('/submit', submitWater);

router.get('/all', getAllWater);

router.put('/update/:id', updateWaterReading);

router.delete('/delete/:id', deleteWaterReading);
router.get('/export', downloadExport);

module.exports = router;
