const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;