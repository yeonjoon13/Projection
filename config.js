require('dotenv').config();
const AWS = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
});

module.exports = {
    S3_BUCKET,
    REGION,
};
