const express = require('express');
const router = express.Router();
const {registerUser} = require('../Controller/UserController');

router.route('/register').post(registerUser);
module.exports = router;