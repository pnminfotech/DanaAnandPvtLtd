const express = require('express');
const router = express.Router();
const visitorController = require('../controller/visitorController');

// Create a new visitor
router.post('/create', visitorController.createVisitor);


// Get all visitors
router.get('/all', visitorController.getVisitors);

// Get a visitor by ID
router.get('/:id', visitorController.getVisitorById);
router.put('/update/:id', visitorController.UpdateVisitor);
// Delete a visitor by ID
router.delete('/delete/:id', visitorController.deleteVisitor);

module.exports = router;
