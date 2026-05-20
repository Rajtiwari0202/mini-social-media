const postModel = require("../models/post.model");
const commentModel = require("../models/comment.model");
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

        if (!caption || caption.trim() === "") {
            return res.status(400).json({
                message: "Caption is required",
            });
        }

        const uploadedImage = await uploadFile(file);

        const post = await postModel.create({
            image: uploadedImage.url,
            caption: caption.trim(),
            user: req.user.id,
        });

        const populatedPost = await postModel
            .findById(post._id)
            .populate("user", "username email");

        res.status(201).json({
            message: "Post created successfully",
            post: populatedPost,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function getAllPosts(req, res) {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const totalPosts = await postModel.countDocuments();

        const posts = await postModel
            .find()
            .populate("user", "username email")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username email",
                },
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Posts fetched successfully",
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts,
            posts,
        });

    } catch (error) {

        console.error(error);

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

        await commentModel.deleteMany({
            post: id,
        });

        await postModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Post deleted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function toggleLike(req, res) {

    try {

        const { id } = req.params;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        const userId = req.user.id;

        const alreadyLiked = post.likes.some(
            (like) => like.toString() === userId
        );

        if (alreadyLiked) {

            post.likes = post.likes.filter(
                (like) => like.toString() !== userId
            );

        } else {

            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            message: alreadyLiked
                ? "Post unliked"
                : "Post liked",
            likesCount: post.likes.length,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function getPostById(req, res) {

    try {

        const { id } = req.params;

        const post = await postModel
            .findById(id)
            .populate("user", "username email")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username email",
                },
            });

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        res.status(200).json({
            post,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function editPost(req, res) {

    try {

        const { id } = req.params;
        const { caption } = req.body;

        if (!caption || caption.trim() === "") {
            return res.status(400).json({
                message: "Caption is required",
            });
        }

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can edit only your own posts",
            });
        }

        post.caption = caption.trim();

        await post.save();

        const updatedPost = await postModel
            .findById(post._id)
            .populate("user", "username email");

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    toggleLike,
    getPostById,
    editPost,
};