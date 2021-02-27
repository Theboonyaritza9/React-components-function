const aws = require('aws-sdk');

// You can get those keys from My Security from Credentials of Aws S3
aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const s3 = new aws.S3();

const uploadFile = (req, res) => {
    // req.file is only an image
    console.log(req.body);
    console.log(req.file);
}

const uploadFiles = (req, res) => {
    // req.files is images morn than one.
    console.log(req.body);
    console.log(req.files);
}

const deleteFile = (req, res) => {
    console.log(req.body.name);
    // file that you want to delete, it must have file's lastname such as jpeg, png, pdf
    let files = ["73ab5973-0675-4371-b0ea-328bae93ce87.jpeg", "8a717079-f4bc-40e0-97aa-632b582dbfcb.jpeg"]

    // Loop all of images after all delete it.
    for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        s3.deleteObject({
            Bucket: 'test-boonyarit',
            Key: files[i]
        }, (err, data) => {
            if (err) console.log("can not delete an image in Aws S3")
            else console.log("delete an image in Aws S3 successfully.")
        })
    }
}

exports.uploadFile = uploadFile;
exports.uploadFiles = uploadFiles;
exports.deleteFile = deleteFile;

