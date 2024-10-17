const mongoose = require('mongoose');

const waterReadingSchema = new mongoose.Schema({
  serialNo: { type: String, required: true },
  date: { type: Date, required: true },
  startReading: { type: Number, required: true },
  endReading: { type: Number, required: true },
  total: { type: Number, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('WaterReading', waterReadingSchema);
