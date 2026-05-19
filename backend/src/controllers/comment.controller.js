const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");

async function createComment(req, res) {

    try {

        const { text } = req.body;
        const { postId } = req.params;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                message: "Comment text is required",
            });
        }

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        const comment = await commentModel.create({
            text: text.trim(),
            user: req.user.id,
            post: postId,
        });

        post.comments.push(comment._id);

        await post.save();

        const populatedComment = await commentModel
            .findById(comment._id)
            .populate("user", "username email");

        res.status(201).json({
            message: "Comment added successfully",
            comment: populatedComment,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    createComment,
};