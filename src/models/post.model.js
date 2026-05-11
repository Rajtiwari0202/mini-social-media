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
    },
    {
        timestamps: true,
    }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;