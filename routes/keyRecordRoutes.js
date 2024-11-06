const express = require('express');
const {submitKey , getAllKeyRecords,deleteKeyRecord, updateKeyRecord, getKeyRecordById} = require('../controller/keyController')
const router = express.Router();

// POST request to add a key record
router.post('/submit', submitKey );
  

// GET request to fetch all key records
router.get('/all', getAllKeyRecords);

// GET request to fetch a specific key record by ID
router.get('/get/:id', getKeyRecordById);

// PUT request to update a key record by ID
router.put('/update/:id', updateKeyRecord);

// DELETE request to delete a key record by ID
router.delete('/delete/:id', deleteKeyRecord);

module.exports = router;
