const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const { createPost } = require("../controllers/post.controller");

router.post(
    "/create",
    upload.single("image"),
    createPost
);

module.exports = router;