const ShiftIn = require('../models/shiftin');

exports.submitShift = async (req , res) =>{
    try{
         const {shift ,busRoute ,kilometerDetails,numberOfEmployees, date} = req.body;
         if (!shift || !busRoute || !kilometerDetails || !numberOfEmployees || !date) {
            return res.status(400).json({message :"All fields are required"});
         }

         const newShiftIn = new ShiftIn({
            shift,
            busRoute,
            kilometerDetails,
            numberOfEmployees,
            date
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


exports.updateShift = async (req, res) => {
    const { id } = req.params;
    const { shift, busRoute, kilometerDetails, numberOfEmployees,date } = req.body;

    try {
        const updatedShift = await ShiftIn.findByIdAndUpdate(
            id,
            { shift, busRoute, kilometerDetails, numberOfEmployees, date },
            { new: true, runValidators: true }
        );

        if (!updatedShift) {
            return res.status(404).json({ message: "Shift record not found" });
        }

        res.status(200).json({ message: "Shift updated successfully", updatedShift });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.deleteShift = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShift = await ShiftIn.findByIdAndDelete(id);

        if (!deletedShift) {
            return res.status(404).json({ message: "Shift record not found" });
        }

        res.status(200).json({ message: "Shift deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};