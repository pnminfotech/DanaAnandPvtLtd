const express = require('express');
const router = express.Router();
const { createShiftOut, getAllShiftOuts, updateShiftOut, deleteShiftOut } = require('../controller/shiftOutController');

// POST route to handle Shift Out submission
router.post('/submit', createShiftOut);

// GET route to fetch all Shift Out records
router.get('/all', getAllShiftOuts);

// PUT route to update a Shift Out record
router.put('/update/:id', updateShiftOut);

// DELETE route to delete a Shift Out record
router.delete('/delete/:id', deleteShiftOut);

module.exports = router;
