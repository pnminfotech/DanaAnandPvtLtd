const Vendor = require('../models/vendorModel');

// Create a new vendor entry
const createVendor = async (req, res) => {
    try {
        const { date, contractorName, contractDetails, inTime, outTime, remarks } = req.body;

        const vendor = new Vendor({
            date,
            contractorName,
            contractDetails,
            inTime,
            outTime,
            remarks
        });

        const savedVendor = await vendor.save();
        res.status(201).json(savedVendor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all vendors
const getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a single vendor by ID
const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = {
    createVendor,
    getVendors,
    getVendorById,
};
