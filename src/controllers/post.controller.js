const postModel = require("../models/post.model");
const uploadFile = require("../services/storage.service");

async function createPost(req, res) {
    try {
        const file = req.file;
        const { caption } = req.body;

        if (!file) {
            return res.status(400).json({
                message: "Image is required",
            });
        }

        const uploadedImage = await uploadFile(file);

        const post = await postModel.create({
            image: uploadedImage.url,
            caption,
        });

        res.status(201).json({
            message: "Post created",
            post,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
}

module.exports = {
    createPost,
};