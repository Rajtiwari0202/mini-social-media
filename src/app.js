const express = require("express");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Health check route
app.get("/", (req, res) => {
    res.json({
        message: "Mini Social Media API is running",
    });
});

module.exports = app;