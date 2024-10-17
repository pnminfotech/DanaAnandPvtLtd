// controllers/courierController.js
const Courier = require('../models/courierModel');

// Submit a new courier
exports.submitCourier = async (req, res) => {
    try {
        const { serialNo, date, formType, name, qty, desc, from, to, receivedBy } = req.body;

        if (!serialNo || !date || !formType || !name || !qty || !desc || !from || !to || !receivedBy) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCourier = new Courier({
            serialNo,
            date,
            formType,
            name,
            qty,
            desc,
            from,
            to,
            receivedBy
        });

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
