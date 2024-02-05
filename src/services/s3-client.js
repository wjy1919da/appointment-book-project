import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import APIClient from "../services/api-client";
import axios from "axios";
const uploadImgToS3 = async (file, maxFileSize) => {
  // const maxFileSize = 8 * 1024 * 1024; // 8MB

  if (file.size > maxFileSize) {
    return {
      success: false,
      message: "Image size is too large. Max file size is 8MB.",
    };
  }
  const fileName = `${Date.now()}-${file.name}`;
  const apiClient = new APIClient("/upload/sign");

  const res = await apiClient.get({ fileName });
  if (res?.data?.code === 100) {
    var presignedUrl = res.data.msg;
  }
  try {
    const response = await axios.put(presignedUrl, file);
    if (response.status === 200) {
      const bucketName = "charm-post-img";
      const region = "us-west-1";
      const accessUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

      return {
        success: true,
        message: "Image uploaded successfully.",
        location: accessUrl,
      };
    } else {
      return { success: false, message: "Upload failed." };
    }
  } catch (error) {
    console.error("Error uploading file: ", error);
    return { success: false, message: "Error occurred during image upload." };
  }
};

const uploadToS3 = async (file) => {
  const maxFileSize = 8 * 1024 * 1024; // 8MB

  if (file.size > maxFileSize) {
    return {
      success: false,
      message: "FIle size is too large. Max file size is 8MB.",
    };
  }
  const fileName = `${Date.now()}-${file.name}`;
  const apiClient = new APIClient("/upload/sign");

  const res = await apiClient.get({ fileName });
  if (res?.data?.code === 100) {
    var presignedUrl = res.data.msg;
  }
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.ok) {
      const uploadedFileName = fileName;
      const bucketName = "verificationbucketcharm";
      const region = "us-west-1";
      const accessUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${uploadedFileName}`;

      return {
        success: true,
        message: "File uploaded successfully.",
        location: accessUrl,
      };
    } else {
      // console.error("Upload failed.");
      return { success: false, message: "Upload failed." };
    }
  } catch (error) {
    // console.error("Error uploading file: ", error);
    return { success: false, message: "Error occurred during file upload." };
  }
};

export { uploadImgToS3, uploadToS3 };
