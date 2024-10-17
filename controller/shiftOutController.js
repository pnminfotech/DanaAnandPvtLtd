const ShiftOut = require('../models/ShiftOut');

// POST - Create a Shift Out record
exports.createShiftOut = async (req, res) => {
    const { shift, busRoute, kilometerDetails, numberOfEmployees } = req.body;

    // Validate input
    if (!shift || !busRoute || !kilometerDetails || !numberOfEmployees) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new Shift Out entry
        const newShiftOut = new ShiftOut({
            shift,
            busRoute,
            kilometerDetails,
            numberOfEmployees
        });

        // Save to the database
        await newShiftOut.save();

        res.status(201).json({ message: 'Shift out added successfully', newShiftOut });
    } catch (error) {
        res.status(500).json({ error: 'Error saving shift out data' });
    }
};
