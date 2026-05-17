const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const {
    createPost,
    getAllPosts,
    deletePost,
} = require("../controllers/post.controller");
router.get("/", getAllPosts);

router.post(
    "/create",
    authMiddleware,
    upload.single("image"),
    createPost
);

router.delete("/:id", authMiddleware, deletePost);
module.exports = router;