const express = require('express');
const router = express.Router();
const { authProtect } = require("../middleware/AuthMiddleware");
const { sendMessage, allMessages } = require('../Controller/MessageController');

router.route('/').post(authProtect, sendMessage);
router.route('/:chatId').get(authProtect, allMessages);

module.exports = router;