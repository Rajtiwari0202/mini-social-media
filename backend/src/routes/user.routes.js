const express = require("express");

const router = express.Router();

const {
    getUserProfile,
} = require("../controllers/user.controller");

// Get user profile
router.get("/:id", getUserProfile);

module.exports = router;