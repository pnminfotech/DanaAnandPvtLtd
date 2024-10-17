const Visitor = require('../models/Visitor');

// Create a new visitor
exports.createVisitor = async (req, res) => {
    try {
        const visitor = new Visitor(req.body);
        await visitor.save();
        res.status(201).json({ message: 'Visitor created successfully', visitor });
    } catch (error) {
        res.status(400).json({ message: 'Error creating visitor', error });
    }
};


// Get all visitors
exports.getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving visitors', error });
    }
};

// Get a specific visitor by ID
exports.getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving visitor', error });
    }
};

// Delete a visitor by ID
exports.deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting visitor', error });
    }
};