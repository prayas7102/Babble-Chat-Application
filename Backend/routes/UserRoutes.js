const express = require('express');
const router = express.Router();
const {authProtect} = require("../middleware/AuthMiddleware")
const { registerUser, authUser, allUsers } = require('../Controller/UserController');

router.route('/').post(registerUser).get(authProtect, allUsers);
router.route('/login').post(authUser);

module.exports = router;