const HubTransportation = require('../models/HubTransportation');

exports.submitHub = async (req, res) => {
    const { route, vehicleNumber, numberOfEmployees } = req.body;

    if (!route || !vehicleNumber || !numberOfEmployees) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new hub transportation entry
        const newEntry = new HubTransportation({
            route,
            vehicleNumber,
            numberOfEmployees
        });

        // Save the entry to the database
        await newEntry.save();

        res.status(201).json({
            message: 'Hub transportation data added successfully',
            newEntry
        });
    } catch (error) {
        console.error('Error saving hub transportation data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
