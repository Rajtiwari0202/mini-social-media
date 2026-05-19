const userModel = require("../models/user.model");
const postModel = require("../models/post.model");

async function getUserProfile(req, res) {

    try {

        const { id } = req.params;

        const user = await userModel
            .findById(id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const posts = await postModel
            .find({ user: id })
            .populate("user", "username email")
            .sort({ createdAt: -1 });

        const totalLikes = posts.reduce(
            (acc, post) => acc + post.likes.length,
            0
        );

        const totalComments = posts.reduce(
            (acc, post) => acc + post.comments.length,
            0
        );

        res.status(200).json({
            user,
            posts,
            stats: {
                totalPosts: posts.length,
                totalLikes,
                totalComments,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    getUserProfile,
};