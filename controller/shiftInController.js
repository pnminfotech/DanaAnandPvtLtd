const ShiftIn = require('../models/shiftin');

exports.submitShift = async (req , res) =>{
    try{
         const {shift ,busRoute ,kilometerDetails,numberOfEmployees} = req.body;
         if (!shift || !busRoute || !kilometerDetails || !numberOfEmployees) {
            return res.status(400).json({message :"All fields are required"});
         }

         const newShiftIn = new ShiftIn({
            shift,
            busRoute,
            kilometerDetails,
            numberOfEmployees
         });

         await newShiftIn.save();
         res.status(201).json({message:"shift in added succesfully", newShiftIn});
    }catch(err){
      console.error(err);
      res.status(500).json({message: "server error" , error: err.message});
    }
};

exports.getallshits = async (req, res) =>{
    try{
        const records = await ShiftIn.find();
        res.status(200).json(records)
    }catch(err){
        res.status(500).json({error : "error fetching shift in records" , details: err.message})
    }
        
    
}