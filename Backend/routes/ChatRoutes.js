const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../Controller/ChatController");
const { authProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(authProtect, accessChat);
router.route("/").get(authProtect, fetchChats);
router.route("/group").post(authProtect, createGroupChat);
router.route("/rename").put(authProtect, renameGroup);
router.route("/groupremove").put(authProtect, removeFromGroup);
router.route("/groupadd").put(authProtect, addToGroup);

module.exports = router;