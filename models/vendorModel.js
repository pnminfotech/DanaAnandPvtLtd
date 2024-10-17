const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    contractorName: {
        type: String,
        required: true
    },
    contractDetails: {
        type: String,
        required: true
    },
    inTime: {
        type: String,
        required: true
    },
    outTime: {
        type: String,
        required: true
    },
    remarks: {
        type: String
    }
}, { timestamps: true });



module.exports = mongoose.model('Vendor', vendorSchema);
