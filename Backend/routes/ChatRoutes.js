const express = require('express');
const router = express.Router();
const {registerUser, authUser, allUsers} = require('../Controller/ChatController');

// router.route('/').post(registerUser).get(allUsers);
// router.route('/login').post(authUser);

module.exports = router;