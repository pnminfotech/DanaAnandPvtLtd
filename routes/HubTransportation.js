const express = require('express');
const { submitHub } = require('../controller/Hubtransportation');
const router = express.Router();

router.post('/submit', submitHub);

module.exports = router;
