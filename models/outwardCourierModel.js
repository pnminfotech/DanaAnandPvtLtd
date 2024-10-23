const mongoose = require('mongoose');

const OutwardCourierSchema = new mongoose.Schema({
    serialNo: { type: Number, required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    desc: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    receivedBy: { type: String, required: true }
});

module.exports = mongoose.model('OutwardCourier', OutwardCourierSchema);
