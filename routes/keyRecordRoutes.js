const express = require('express');
const {submitKey , getallKeyRecords} = require('../controller/keyController')
const router = express.Router();

// POST request to add a key record
router.post('/submit', submitKey );
  
// GET request to fetch all key records
router.get('/all', getallKeyRecords);

module.exports = router;
