const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const {
    createPost,
    getAllPosts,
    deletePost,
} = require("../controllers/post.controller");
router.get("/", getAllPosts);

router.post(
    "/create",
    upload.single("image"),
    createPost
);

router.delete("/:id", deletePost);

module.exports = router;