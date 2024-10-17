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

// GET request to fetch all key records
exports.getallKeyRecords = async (req, res) => {
  try {
    const records = await KeyRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching key records', details: error.message });
  }
};


