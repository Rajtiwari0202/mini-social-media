const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const {
    createComment,
} = require("../controllers/comment.controller");

// Create comment on a post
router.post("/:postId", authMiddleware, createComment);

module.exports = router;