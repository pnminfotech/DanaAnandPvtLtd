// controllers/electricityReadingController.js

const ElectricityReading = require('../models/ElectricityReading');

// Get all electricity readings
exports.getAllReadings = async (req, res) => {
    try {
        const readings = await ElectricityReading.find();
        res.status(200).json(readings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch readings' });
    }
};

// Get a single electricity reading by ID
exports.getReadingById = async (req, res) => {
    try {
        const reading = await ElectricityReading.findById(req.params.id);
        if (!reading) return res.status(404).json({ error: 'Reading not found' });
        res.status(200).json(reading);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch the reading' });
    }
};

// Create a new electricity reading
exports.createReading = async (req, res) => {
    const { serialNo, date, startReading, endReading, total, name } = req.body;
    try {
        const newReading = new ElectricityReading({ serialNo, date, startReading, endReading, total, name });
        await newReading.save();
        res.status(201).json(newReading);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create the reading' });
    }
};

// Update an electricity reading
exports.updateReading = async (req, res) => {
    const { id } = req.params;
    const { serialNo, date, startReading, endReading, total, name } = req.body;

    try {
        const updatedReading = await ElectricityReading.findByIdAndUpdate(id, { serialNo, date, startReading, endReading, total, name }, { new: true });
        if (!updatedReading) return res.status(404).json({ error: 'Reading not found' });
        res.status(200).json(updatedReading);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the reading' });
    }
};

// Delete an electricity reading
exports.deleteReading = async (req, res) => {
    try {
        const deletedReading = await ElectricityReading.findByIdAndDelete(req.params.id);
        if (!deletedReading) return res.status(404).json({ error: 'Reading not found' });
        res.status(200).json({ message: 'Reading deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the reading' });
    }
};
