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
