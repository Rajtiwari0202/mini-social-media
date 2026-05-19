const imagekit = require("../config/imagekit");

async function uploadFile(file) {
    const response = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
    });

    return response;
}

module.exports = uploadFile;