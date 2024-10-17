const express = require('express');
const router = express.Router();

// Import controller
const { createShiftOut } = require('../controller/shiftOutController');

// POST route to handle Shift Out submission
router.post('/submit', createShiftOut);

module.exports = router;
