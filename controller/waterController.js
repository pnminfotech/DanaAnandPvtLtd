 const WaterReading = require("../models/waterReadingModel")

// POST request to add water reading
exports.submitWater = async (req, res) => {
  try {
    const { serialNo, date, startReading, endReading,  name, waterType } = req.body;

    // Validation
    if (!serialNo || !date || !startReading || !endReading  || !name || !waterType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (endReading <= startReading) {
      return res.status(400).json({ error: 'End reading must be greater than start reading' });
    }

    const total = endReading - startReading;

  
    const newWaterReading = new WaterReading({ serialNo, date, startReading, endReading, total, name ,waterType });
    await newWaterReading.save();
    res.status(201).json({ message: 'Water reading added successfully', newWaterReading });
  } catch (error) {
    res.status(500).json({ error: 'Error adding water reading', details: error.message });
  }
};

// GET request to fetch all water readings
exports.getAllWater = async (req, res) => {
  try {
    const readings = await WaterReading.find();
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching water readings', details: error.message });
  }
};

exports.updateWaterReading = async (req, res) => {
  const { id } = req.params;
  const { startReading, endReading, waterType, name } = req.body;

  try {
    const updatedRecord = await WaterReading.findByIdAndUpdate(id, {
      startReading,
      endReading,
      waterType,
      name,
      total: endReading - startReading, // Calculate total on update
    }, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error updating water record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.deleteWaterReading = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReading = await WaterReading.findByIdAndDelete(id);

    if (!deletedReading) {
      return res.status(404).json({ error: 'Water reading not found' });
    }

    res.status(200).json({ message: 'Water reading deleted successfully', deletedReading });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting water reading', details: error.message });
  }
};

exports.downloadExport = async(req,res) =>{
  
    try {
      const records = await WaterReading.find().sort({ date: -1 });
  
      // Transform data to include a serial number
      const waterData = records.map((record, index) => ({
        serialNo: index + 1,
        date: record.date,
        startReading: record.startReading,
        endReading: record.endReading,
        total: record.endReading - record.startReading,
        name: record.name,
        waterType: record.waterType,
      }));
  
      res.status(200).json(waterData);
    } catch (error) {
      console.error('Error fetching water records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}