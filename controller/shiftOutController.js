const ShiftOut = require('../models/ShiftOut');

// POST - Create a Shift Out record
exports.createShiftOut = async (req, res) => {
    const { shift, busRoute, kilometerDetails, numberOfEmployees } = req.body;

    // Validate input
    if (!shift || !busRoute || !kilometerDetails || !numberOfEmployees) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newShiftOut = new ShiftOut({
            shift,
            busRoute,
            kilometerDetails,
            numberOfEmployees
        });

        await newShiftOut.save();
        res.status(201).json({ message: 'Shift out added successfully', newShiftOut });
    } catch (error) {
        res.status(500).json({ error: 'Error saving shift out data' });
    }
};

// GET - Fetch all Shift Out records
exports.getAllShiftOuts = async (req, res) => {
    try {
        const shiftOuts = await ShiftOut.find();
        res.status(200).json(shiftOuts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching shift out data' });
    }
};

// PUT - Update a specific Shift Out record
exports.updateShiftOut = async (req, res) => {
    const { id } = req.params;
    const { shift, busRoute, kilometerDetails, numberOfEmployees } = req.body;

    try {
        const updatedShiftOut = await ShiftOut.findByIdAndUpdate(
            id,
            { shift, busRoute, kilometerDetails, numberOfEmployees },
            { new: true, runValidators: true }
        );

        if (!updatedShiftOut) {
            return res.status(404).json({ error: 'Shift out record not found' });
        }

        res.status(200).json({ message: 'Shift out updated successfully', updatedShiftOut });
    } catch (error) {
        res.status(500).json({ error: 'Error updating shift out data' });
    }
};

// DELETE - Delete a specific Shift Out record
exports.deleteShiftOut = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShiftOut = await ShiftOut.findByIdAndDelete(id);

        if (!deletedShiftOut) {
            return res.status(404).json({ error: 'Shift out record not found' });
        }

        res.status(200).json({ message: 'Shift out deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting shift out data' });
    }
};
