const express = require('express');
const {submitShift, getallshits, updateShift, deleteShift} = require('../controller/shiftInController')

const router = express.Router();

router.post('/submit', submitShift);
router.get('/all', getallshits);
router.put('/update/:id', updateShift);
router.delete('/delete/:id', deleteShift);

module.exports = router;