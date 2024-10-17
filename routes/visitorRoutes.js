const express = require('express');
const router = express.Router();
const visitorController = require('../controller/visitorController');

// Create a new visitor
router.post('/create', visitorController.createVisitor);


// Get all visitors
router.get('/all', visitorController.getVisitors);

// Get a visitor by ID
router.get('/:id', visitorController.getVisitorById);

// Delete a visitor by ID
router.delete('/:id', visitorController.deleteVisitor);

module.exports = router;
