const express = require("express");

const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/posts", postRoutes);

module.exports = app;