const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
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
});


module.exports = mongoose.model('Visitor', visitorSchema);
