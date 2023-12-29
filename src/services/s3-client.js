import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import APIClient from "../services/api-client";
const s3Client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: "AKIAWQE6ZUZGKDFRGFEM",
    secretAccessKey: "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",
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
  },
  logger: console,
});

const uploadImgToS3 = async (file) => {
  const maxFileSize = 8 * 1024 * 1024; // 8MB
  if (file.size > maxFileSize) {
    return {
      success: false,
      message: "Image size is too large. Max file size is 8MB.",
    };
  }
  const fileName = `${Date.now()}-${file.name}`;
  const params = {
    Bucket: "charm-post-img",
    Key: fileName,
    Body: file,
  };

  const command = new PutObjectCommand(params);
  try {
    const data = await s3Client.send(command);
    // console.log("upload result", data);
    return {
      success: true,
      message: "Upload successful!",
      location: `https://${params.Bucket}.s3.amazonaws.com/${encodeURIComponent(
        params.Key
      )}`,
    };
  } catch (error) {
    console.error("upload error", error);
    return {
      success: false,
      message: "Upload failed. Please try again.",
    };
  }
};

const uploadToS3 = async (file) => {
  const maxFileSize = 8 * 1024 * 1024; // 8MB
  if (file.size > maxFileSize) {
    return {
      success: false,
      message: "File size is too large. Max file size is 8MB.",
    };
  }
  const fileName = `${Date.now()}-${file.name}`;
  const params = {
    Bucket: "verificationbucketcharm",
    Key: fileName,
    Body: file,
  };

  const command = new PutObjectCommand(params);

  try {
    const data = await s3Client.send(command);
    console.log("upload result", data);
    return {
      success: true,
      message: "Upload successful!",
      location: `https://${params.Bucket}.s3.amazonaws.com/${encodeURIComponent(
        params.Key
      )}`,
    };
  } catch (error) {
    console.error("upload error", error);
    return {
      success: false,
      message: "Upload failed. Please try again.",
    };
  }
};

export { uploadToS3, uploadImgToS3 };
