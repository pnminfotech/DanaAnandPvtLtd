const mongoose = require('mongoose');

const keyRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  employee: { type: String, required: true },
  department: { type: String, required: true },
  keyQuantity: { type: Number, required: true },
  inTime: { type: String, required: true },
  outTime: { type: String, required: true }
},{ timestamps: true });

module.exports = mongoose.model('KeyRecord', keyRecordSchema);
