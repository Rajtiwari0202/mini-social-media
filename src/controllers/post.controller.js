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
        user: req.user.id,
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
async function getAllPosts(req, res) {

    try {

        const posts = await postModel
            .find()
            .populate("user", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            posts,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}
async function deletePost(req, res) {

    try {

        const { id } = req.params;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can delete only your own posts",
            });
        }

        await postModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Post deleted successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}
module.exports = {
    createPost,
    getAllPosts,
    deletePost,
};