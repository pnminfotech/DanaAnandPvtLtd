const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    visitToPerson: {
        type: String,
        required: true
    },
    reason: {
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
    },
}, { timestamps: true });


module.exports = mongoose.model('Visitor', visitorSchema);
