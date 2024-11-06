const express = require('express');
const { submitHub, getAllHubTransportations , updateHubTransportation , deleteHubTransportation} = require('../controller/Hubtransportation');
const router = express.Router();

router.post('/submit', submitHub);
router.get('/all', getAllHubTransportations);
router.put('/update/:id', updateHubTransportation);
router.delete('/delete/:id', deleteHubTransportation);

module.exports = router;
