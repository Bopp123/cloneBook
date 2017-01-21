const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');


AWS.config.loadFromPath('Server/config/aws.json');
AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();



const uploadS3 = (bucketName, file, contentType, key) => {

	let uploadParams = {};
	uploadParams.Body = file;
	uploadParams.Key = key;
	uploadParams.Bucket = bucketName;
	uploadParams.ContenType = contentType;

	return s3.upload(uploadParams).promise();
};

const deleteS3 = (bucketName, key) => {
	let params = {};
	params.Key = key;
	params.Bucket = bucketName;

	return s3.deleteObject(params).promise();
};

module.exports = {
	uploadS3,
	deleteS3
};