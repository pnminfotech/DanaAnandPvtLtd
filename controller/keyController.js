const KeyRecord = require('../models/keyRecordModel');

// POST request to add a key record
exports.submitKey = async (req, res) => {
  try {
    const { date, employee, department, keyQuantity, inTime, outTime } = req.body;

    if (!date || !employee || !department || !keyQuantity || !inTime || !outTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newKeyRecord = new KeyRecord({
      date,
      employee,
      department,
      keyQuantity,
      inTime,
      outTime
    });

    await newKeyRecord.save();
    res.status(201).json({ message: "Key record added successfully", newKeyRecord });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getKeyRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await KeyRecord.findById(id);

    if (!record) {
      return res.status(404).json({ error: 'Key record not found' });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching key record by ID:", error);
    res.status(500).json({ error: 'Error fetching key record by ID', details: error.message });
  }
};

exports.getAllKeyRecords = async (req, res) => {
  try {
    const records = await KeyRecord.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching key records:", error);
    res.status(500).json({ error: 'Error fetching key records', details: error.message });
  }
};

exports.getKeyRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await KeyRecord.findById(id);

    if (!record) {
      return res.status(404).json({ error: 'Key record not found' });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching key record by ID:", error);
    res.status(500).json({ error: 'Error fetching key record by ID', details: error.message });
  }
};
// GET request to fetch all key records
exports.getallKeyRecords = async (req, res) => {
  try {
    const records = await KeyRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching key records', details: error.message });
  }
};

exports.updateKeyRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Validate the fields to be updated
    if (!updatedData) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    // Find and update the key record
    const updatedRecord = await KeyRecord.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Key record not found' });
    }

    res.status(200).json({ message: 'Key record updated successfully', updatedRecord });
  } catch (error) {
    console.error("Error updating key record:", error);
    res.status(500).json({ error: 'Error updating key record', details: error.message });
  }
};

exports.deleteKeyRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the key record by ID
    const deletedRecord = await KeyRecord.findByIdAndDelete(id);
    
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Key record not found' });
    }

    res.status(200).json({ message: 'Key record deleted successfully' });
  } catch (err) {
    console.error("Error deleting key record:", err);
    res.status(500).json({ error: 'Failed to delete the key record', details: err.message });
  }
};
