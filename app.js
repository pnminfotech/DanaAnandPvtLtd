const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const courierRoutes = require('./routes/courierRoutes'); 
const keyRecordRoutes = require('./routes/keyRecordRoutes');
const waterReadingRoutes = require('./routes/waterReadingRoutes');
const { connectToMongoDB } = require("./config/connection");

const app = express();
const cors = require('cors');



// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB Connection
connectToMongoDB();
// Routes
app.use('/api/key-record', keyRecordRoutes);
app.use('/api/water-reading', waterReadingRoutes);
app.use('/api/courier', courierRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
