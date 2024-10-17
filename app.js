const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const courierRoutes = require('./routes/courierRoutes'); 
const keyRecordRoutes = require('./routes/keyRecordRoutes');
const waterReadingRoutes = require('./routes/waterReadingRoutes');
const vendorRoutes = require('./routes/vendorRoutes')
const visitorRoutes = require('./routes/visitorRoutes')
const ShiftIn = require('./routes/shiftInRoutes');
const ShiftOut = require('./routes/shiftOut');
const HubTransportation = require('./routes/HubTransportation')
const { connectToMongoDB } = require("./config/connection");

const app = express();
const cors = require('cors');



// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB Connection
connectToMongoDB();
// Routes
app.use('/api/key-record', keyRecordRoutes);
app.use('/api/water-reading', waterReadingRoutes);
app.use('/api/courier', courierRoutes);
app.use('/api/vendors',vendorRoutes)
app.use('/api/visitors', visitorRoutes);
app.use('/api/shiftIn', ShiftIn);
app.use('/api/shiftOut',ShiftOut);
app.use('/api/hubTransportation',HubTransportation);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
