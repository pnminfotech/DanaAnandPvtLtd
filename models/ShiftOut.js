const mongoose = require('mongoose');

const ShiftOutSchema = new mongoose.Schema({
    shift: { type: String, required: true },
    busRoute: { type: String, required: true },
    kilometerDetails: { type: Number, required: true },
    numberOfEmployees: { type: Number, required: true },
});

module.exports = mongoose.model('ShiftOut', ShiftOutSchema);
