const crypto = require("crypto");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multer = require("../config/multer");
require("dotenv").config();

const restaurant = {
    storage: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                const fileName = `restaurant/${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            });
        }
    }),
    limits: { fileSize: multer.fileSize["2mb"] },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [...multer.fileType.image];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}

module.exports = { restaurant }