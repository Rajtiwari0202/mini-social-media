const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const {
    createPost,
    getAllPosts,
    deletePost,
    toggleLike,
    getPostById,
    editPost,
} = require("../controllers/post.controller");

// Get all posts
router.get("/", getAllPosts);
router.get("/:id", getPostById);
// Create a post
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPost
);

// Like / Unlike a post
router.post("/:id/like", authMiddleware, toggleLike);

router.put("/:id", authMiddleware, editPost);
// Delete a post
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;