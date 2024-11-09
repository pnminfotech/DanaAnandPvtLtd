const mongoose = require('mongoose');

const ShiftInSchema = new  mongoose.Schema({
    
    shift:{
        type:String,
        required: true
    },
    busRoute:{
        type:String,
        required:true
    },
    kilometerDetails:{
        type:String,
        required:true
    },
    numberOfEmployees:{
        type:String,
        required:true
    }, date: {type: Date }
});

module.exports = mongoose.model('ShiftIn',ShiftInSchema);