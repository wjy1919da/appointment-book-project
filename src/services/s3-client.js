import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const uploadToS3 = async (file) => {
  const maxFileSize = 8 * 1024 * 1024; // 8MB
  if (file.size > maxFileSize) {
    return {
      success: false,
      message: "File size is too large. Max file size is 8MB.",
    };
  }
  const fileName = `${Date.now()}-${file.name}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: "verificationbucketcharm",
      Key: fileName,
      Body: file,
    },
    partSize: 8 * 1024 * 1024,
    queueSize: 4,
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log(
      `upload progress '${Math.round(
        (progress.loaded / progress.total) * 100
      )}%`
    );
  });

  try {
    var data = await upload.done();
    console.log("upload done", data);
    if (data.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        message: "Upload successful!",
        location: data.Location,
      };
    }
    return {
      success: false,
      message: "Upload failed. Please try again.",
      location: data.Location,
    };
  } catch (err) {
    return {
      success: false,
      message: "Upload failed. Please try again.",
      location: data.Location,
    };
  }
};
const uploadImgToS3 = async (file) => {
  const maxFileSize = 8 * 1024 * 1024; // 8MB
  if (file.size > maxFileSize) {
    return {
      success: false,
      message: "Image size is too large. Max file size is 8MB.",
    };
  }
  const fileName = `${Date.now()}-${file.name}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: "charm-post-img",
      Key: fileName,
      Body: file,
    },
    partSize: 8 * 1024 * 1024,
    queueSize: 4,
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log(
      `upload progress '${Math.round(
        (progress.loaded / progress.total) * 100
      )}%`
    );
  });

  try {
    var data = await upload.done();
    console.log("upload done", data);
    if (data.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        message: "Upload successful!",
        location: data.Location,
      };
    }
    return {
      success: false,
      message: "Upload failed. Please try again.",
      location: data.Location,
    };
  } catch (err) {
    return {
      success: false,
      message: "Upload failed. Please try again.",
      location: data.Location,
    };
  }
};
const s3Client = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  },
  logger: console,
});

// export default s3Client;
export { s3Client, uploadToS3, uploadImgToS3 };
