// models/courierModel.js
const mongoose = require('mongoose');

const CourierSchema = new mongoose.Schema({
    serialNo: { type: Number, required: true },  // Serial number
    date: { type: Date, required: true },  // Date of courier
    formType: { type: String, required: true, enum: ['inward', 'outward'] },  // Inward or Outward
    name: { type: String, required: true },  // Courier Name
    qty: { type: Number, required: true },  // Quantity
    desc: { type: String, required: true },  // Description
    from: { type: String, required: true },  // Courier From
    to: { type: String, required: true },  // Courier To
    receivedBy: { type: String, required: true }  // Received by
}, { timestamps: true });

module.exports = mongoose.model('Courier', CourierSchema);
