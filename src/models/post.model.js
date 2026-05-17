const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
            trim: true,
        },

        caption: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true,
    }
);

postSchema.index({ user: 1 });
postSchema.index({ createdAt: -1 });

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;