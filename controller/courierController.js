// controllers/courierController.js
const Courier = require('../models/courierModel');
const InwardCourier = require('../models/inwardCourierModel');
const OutwardCourier = require('../models/outwardCourierModel');


// Submit a new courier
exports.submitCourier = async (req, res) => {
    try {
        const { serialNo, date, formType, name, qty, desc, from, to, receivedBy } = req.body;

        if (!serialNo || !date || !formType || !name || !qty || !desc || !from || !to || !receivedBy) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let newCourier;

        // Based on the form type, store the data in the respective collection
        if (formType === 'inward') {
            newCourier = new InwardCourier({
                serialNo,
                date,
                name,
                qty,
                desc,
                from,
                to,
                receivedBy
            });
        } else if (formType === 'outward') {
            newCourier = new OutwardCourier({
                serialNo,
                date,
                name,
                qty,
                desc,
                from,
                to,
                receivedBy
            });
        } else {
            return res.status(400).json({ message: 'Invalid form type' });
        }

        await newCourier.save();
        return res.status(201).json({ message: 'Courier submitted successfully', courier: newCourier });
    } catch (error) {
        return res.status(500).json({ message: 'Error submitting courier', error: error.message });
    }
};


exports.getAllInwardCouriers = async (req, res) => {
    try {
        const couriers = await InwardCourier.find();
        return res.status(200).json(couriers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching inward couriers', error: error.message });
    }
};
// Fetch all couriers
exports.getAllCouriers = async (req, res) => {
    try {
        const couriers = await Courier.find();
        return res.status(200).json(couriers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching couriers', error: error.message });
    }
};

// Fetch couriers by type (inward/outward)
exports.getCouriersByType = async (req, res) => {
    try {
        const { type } = req.params;
        const couriers = await Courier.find({ formType: type });
        return res.status(200).json(couriers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching couriers by type', error: error.message });
    }
};

// Update an existing courier
exports.updateCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const { serialNo, date, name, qty, desc, from, to, receivedBy } = req.body;
        const courierType = req.body.formType; // to identify if inward or outward

        let updatedCourier;
        
        if (courierType === 'inward') {
            updatedCourier = await InwardCourier.findByIdAndUpdate(
                id,
                { serialNo, date, name, qty, desc, from, to, receivedBy },
                { new: true }
            );
        } else if (courierType === 'outward') {
            updatedCourier = await OutwardCourier.findByIdAndUpdate(
                id,
                { serialNo, date, name, qty, desc, from, to, receivedBy },
                { new: true }
            );
        } else {
            return res.status(400).json({ message: 'Invalid courier type' });
        }

        if (!updatedCourier) {
            return res.status(404).json({ message: 'Courier not found' });
        }

        return res.status(200).json({ message: 'Courier updated successfully', courier: updatedCourier });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating courier', error: error.message });
    }
};

// Delete an existing courier
exports.deleteCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const courierType = req.query.type; // to identify if inward or outward

        let deletedCourier;

        if (courierType === 'inward') {
            deletedCourier = await InwardCourier.findByIdAndDelete(id);
        } else if (courierType === 'outward') {
            deletedCourier = await OutwardCourier.findByIdAndDelete(id);
        } else {
            return res.status(400).json({ message: 'Invalid courier type' });
        }

        if (!deletedCourier) {
            return res.status(404).json({ message: 'Courier not found' });
        }

        return res.status(200).json({ message: 'Courier deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting courier', error: error.message });
    }
};
exports.getAllInwardCouriers = async (req, res) => {
    try {
        const couriers = await InwardCourier.find();
        return res.status(200).json(couriers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching inward couriers', error: error.message });
    }
};

// Update an existing inward courier
exports.updateInwardCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const { serialNo, date, name, qty, desc, from, to, receivedBy } = req.body;

        const updatedCourier = await InwardCourier.findByIdAndUpdate(
            id,
            { serialNo, date, name, qty, desc, from, to, receivedBy },
            { new: true }
        );

        if (!updatedCourier) {
            return res.status(404).json({ message: 'Inward courier not found' });
        }

        return res.status(200).json({ message: 'Inward courier updated successfully', courier: updatedCourier });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating inward courier', error: error.message });
    }
};

// Delete an existing inward courier
exports.deleteInwardCourier = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCourier = await InwardCourier.findByIdAndDelete(id);

        if (!deletedCourier) {
            return res.status(404).json({ message: 'Inward courier not found' });
        }

        return res.status(200).json({ message: 'Inward courier deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting inward courier', error: error.message });
    }
};

exports.getAllOutwardCouriers = async (req, res) => {
    try {
        const couriers = await OutwardCourier.find();
        return res.status(200).json(couriers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching outward couriers', error: error.message });
    }
};

// Update an existing outward courier
exports.updateOutwardCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const { serialNo, date, name, qty, desc, from, to, receivedBy } = req.body;

        const updatedCourier = await OutwardCourier.findByIdAndUpdate(
            id,
            { serialNo, date, name, qty, desc, from, to, receivedBy },
            { new: true }
        );

        if (!updatedCourier) {
            return res.status(404).json({ message: 'Outward courier not found' });
        }

        return res.status(200).json({ message: 'Outward courier updated successfully', courier: updatedCourier });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating outward courier', error: error.message });
    }
};

// Delete an existing outward courier
exports.deleteOutwardCourier = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCourier = await OutwardCourier.findByIdAndDelete(id);

        if (!deletedCourier) {
            return res.status(404).json({ message: 'Outward courier not found' });
        }

        return res.status(200).json({ message: 'Outward courier deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting outward courier', error: error.message });
    }
};