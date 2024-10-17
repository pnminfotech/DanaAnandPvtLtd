const mongoose = require('mongoose');

const HubTransportationSchema = new mongoose.Schema({
    route: String,
    vehicleNumber: String,
    numberOfEmployees: Number,

  });

  module.exports = mongoose.model('HubTransportation',HubTransportationSchema)