const express = require("express")
const multer = require("multer")

const app = express();
app.use(express.json());

const upload = multer({storage: multer.memoryStorage() })

app.post(
    "/create-post",
    upload.single("image"),
    async (req, res) => {

        console.log(req.file);
        console.log(req.body);

        res.json({
            message: "Post created"
        });
    }
);

module.exports = app;