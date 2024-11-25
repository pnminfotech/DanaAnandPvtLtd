const express = require('express')
const router = express.Router();
const {  UserRecord , loginRecord} = require('../controller/userController');

router.post('/register',UserRecord);

router.post('/login',loginRecord);
module.exports = router;

