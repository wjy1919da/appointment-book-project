import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import APIClient from "../services/api-client";
import axios from "axios";
const uploadImgToS3 = async ({ file, maxFileSize, bucketName }) => {
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
      const bucketName = bucketName;
      const region = process.env.REACT_APP_IMG_BUCKET_REGION;
      const accessUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

      return {
        success: true,
        message: "uploaded successfully.",
        location: accessUrl,
      };
    } else {
      // console.error("Upload failed.");
      return { success: false, message: "Upload failed." };
    }
  } catch (error) {
    // console.error("Error uploading file: ", error);
    return { success: false, message: "Error occurred during image upload." };
  }
};

export { uploadImgToS3 };
