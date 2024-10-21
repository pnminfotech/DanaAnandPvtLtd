const Vendor = require('../models/vendorModel');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');


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

// Update a vendor by ID
const updateVendor = async (req, res) => {
    try {
        const { date, contractorName, contractDetails, inTime, outTime, remarks } = req.body;

        const updatedVendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            { date, contractorName, contractDetails, inTime, outTime, remarks },
            { new: true, runValidators: true }
        );

        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json(updatedVendor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a vendor by ID
const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await Vendor.findByIdAndDelete(id);

        if (!deletedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ message: 'Vendor deleted successfully',deletedVendor });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};



// Route to download vendor records as an Excel file
const downloadReport = async (req, res) => {
    try {
        // Fetch the vendors from the controller
        const vendors = await getVendors();

        // Transform vendor data to include serial numbers
        const vendorData = vendors.map((vendor, index) => ({
            serialNo: index + 1,
            date: vendor.date,
            contractorName: vendor.contractorName,
            contractDetails: vendor.contractDetails,
            inTime: vendor.inTime,
            outTime: vendor.outTime,
            remarks: vendor.remarks
        }));

        // Return the transformed vendor data as a JSON response
        res.status(200).json(vendorData);
    } catch (error) {
        console.error('Error fetching vendor records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createVendor,
    getVendors,
    getVendorById,
    updateVendor,
    deleteVendor,
    downloadReport
};
