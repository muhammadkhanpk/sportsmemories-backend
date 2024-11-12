import AWS from 'aws-sdk';

const GetPresignedURL = async ({
  bucketName,
  key,
  fileType
}) => {
  const s3 = new AWS.S3();

  const params = {
    Bucket: `sportmemories-media-storage/${bucketName}/ID_${Date.now()}`,
    Key: key,
    Expires: 60 * 10,
    ContentType: fileType 
  };

  return s3.getSignedUrlPromise('putObject', params);
}

export default GetPresignedURL;