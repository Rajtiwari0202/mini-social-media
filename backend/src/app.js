const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Health route
app.get("/", (req, res) => {
    res.json({
        message: "Mini Social Media API is running",
    });
});

module.exports = app;