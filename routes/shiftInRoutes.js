const express = require('express');
const {submitShift, getallshits} = require('../controller/shiftInController')

const router = express.Router();

router.post('/submit', submitShift);
router.get('/all', getallshits)

module.exports = router;