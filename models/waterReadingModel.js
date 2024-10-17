
const mongoose = require('mongoose');
// Define the schema for Water Reading
const waterReadingSchema = new mongoose.Schema({
    serialNo: {type: String, required: true,
    },
    date: {type: Date, required: true,
    },
    startReading: {type: Number, required: true,
    },
    endReading: {type: Number,required: true,
    },
    total: {type: Number, required: true,
    },
    name: {type: String,required: true,
    },    
    waterType: {type: String,required: true,
        enum: ['Water Coolant', 'RO Water'], // You can add more types here if needed
    },
}, { timestamps: true }); // timestamps will automatically add createdAt and updatedAt fields

// Create and export the WaterReading model
module.exports = mongoose.model('WaterReading', waterReadingSchema);
