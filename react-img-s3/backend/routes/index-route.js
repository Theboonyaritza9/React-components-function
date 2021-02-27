const express = require('express');

const router = express.Router();
const { uploadFile, uploadFiles, deleteFile } = require("../controllers/index-controller");
const fileUpload = require("../middleware/file-upload");

router.get("/data", (req, res) => {
    res.json("hi")
});

router.post(
    '/file',
    fileUpload.single('image'),
    uploadFile
)

router.post(
    '/files',
    fileUpload.array('images', 2),
    uploadFiles
)

router.delete(
    '/',
    deleteFile
)

module.exports = router