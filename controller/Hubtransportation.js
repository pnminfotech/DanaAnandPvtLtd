const HubTransportation = require('../models/HubTransportation');

exports.submitHub = async (req, res) => {
    const { route, vehicleNumber, numberOfEmployees, date } = req.body;

    if (!route || !vehicleNumber || !numberOfEmployees || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new hub transportation entry
        const newEntry = new HubTransportation({
            route,
            vehicleNumber,
            numberOfEmployees,
            date,
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
exports.getAllHubTransportations = async (req, res) => {
    try {
        const transportations = await HubTransportation.find();
        res.status(200).json(transportations);
    } catch (error) {
        console.error('Error fetching hub transportation data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an entry
exports.updateHubTransportation = async (req, res) => {
    const { id } = req.params;
    const { route, vehicleNumber, numberOfEmployees,  date } = req.body;

    try {
        const updatedEntry = await HubTransportation.findByIdAndUpdate(
            id,
            { route, vehicleNumber, numberOfEmployees,    date },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        res.status(200).json({ message: 'Hub transportation data updated successfully', updatedEntry });
    } catch (error) {
        console.error('Error updating hub transportation data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an entry
exports.deleteHubTransportation = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await HubTransportation.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        res.status(200).json({ message: 'Hub transportation data deleted successfully' });
    } catch (error) {
        console.error('Error deleting hub transportation data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};