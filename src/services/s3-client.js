import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const s3Client = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  },
  logger: console,
});
const uploadToS3 = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: fileName,
      Body: file,
    },
    partSize: 8 * 1024 * 1024, // 设置每个部分大小为 1MB
    queueSize: 4, // 同时上传的部分数量
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log(
      `upload progress '${Math.round(
        (progress.loaded / progress.total) * 100
      )}%`
    );
  });

  try {
    const data = await upload.done();
    if (data.$metadata.httpStatusCode === 200) {
      console.log("upload success", data);
      return data;
    }
  } catch (err) {
    console.error("upload faild", err);
    /* TODO: Error handling */
  }
};
// export default s3Client;
export { uploadToS3 };
