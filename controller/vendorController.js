const Vendor = require('../models/vendorModel');

const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { getVendors } = require('../controller/vendorController'); // Assuming getVendors fetches all vendors

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
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

        if (!deletedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};



// Route to download vendor records as an Excel file
const downloadReport = async (req, res) => {
    try {
        // Fetch the vendors from the controller
        const vendors = await getVendors();

        // Prepare the vendor data for the Excel sheet
        const filteredVendors = vendors.map(vendor => ({
            date: vendor.date,
            contractorName: vendor.contractorName,
            contractDetails: vendor.contractDetails,
            inTime: vendor.inTime,
            outTime: vendor.outTime,
            remarks: vendor.remarks
        }));

        // Create a new workbook and a worksheet with vendor data
        const worksheet = XLSX.utils.json_to_sheet(filteredVendors);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");

        // Write the workbook to a file
        const filePath = path.join(__dirname, '..', 'downloads', 'vendors.xlsx');
        XLSX.writeFile(workbook, filePath);

        // Send the file to the client for download
        res.download(filePath, 'vendors.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading file');
            } else {
                // Optionally, remove the file after sending
                fs.unlinkSync(filePath);
            }
        });

    } catch (error) {
        console.error('Error generating vendor Excel file:', error);
        res.status(500).send('Failed to generate Excel file');
    }
};

module.exports = router;



module.exports = {
    createVendor,
    getVendors,
    getVendorById,
    updateVendor,
    deleteVendor,
    downloadReport
};
