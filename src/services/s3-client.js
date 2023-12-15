import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import APIClient from "../services/api-client";
const uploadToS3 = async (file, signal, onProgress) => {
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
    leavePartsOnError: true,
    abortSignal: signal,
    params: {
      Bucket: "verificationbucketcharm",
      Key: fileName,
      Body: file,
    },
    partSize: 8 * 1024 * 1024,
    queueSize: 4,
  });

  upload.on("httpUploadProgress", (progress) => {
    const percent = Math.round((progress.loaded / progress.total) * 100);
    console.log(`upload progress '${percent}%`);
    onProgress(percent);
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
  const apiClient = new APIClient("/upload/sign");

  try {
    const res = await apiClient.get({ fileName });
    if (res?.data?.code === 100) {
      var url = res.data.msg;
      // console.log("Signed URL", url);
      // Additional logic for using the URL to upload the file goes here
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });
      if (response.ok) {
        // Handle a successful upload
        console.log("upload response", response);
        return {
          success: true,
          message: "Upload successful!",
          location: url.split("?")[0],
        };
      } else {
        // Handle an error scenario
        console.error("Upload failed", response);
        return {
          success: false,
          message: "Upload failed. Please try again.",
          location: url.split("?")[0],
        };
      }
    } else {
      // Handle any other codes or no response
      return {
        success: false,
        message: "Unable to get the signed URL for upload.",
      };
    }
  } catch (error) {
    // Handle the error scenario
    console.error("Error fetching signed URL", error);
    return;
  }
  // const upload = new Upload({
  //   client: s3Client,
  //   params: {
  //     Bucket: "charm-post-img",
  //     Key: fileName,
  //     Body: file,
  //   },
  //   partSize: 8 * 1024 * 1024,
  //   queueSize: 4,
  // });

  // upload.on("httpUploadProgress", (progress) => {
  //   console.log(
  //     `upload progress '${Math.round(
  //       (progress.loaded / progress.total) * 100
  //     )}%`
  //   );
  // });

  // try {
  //   var data = await upload.done();
  //   console.log("upload done", data);
  //   if (data.$metadata.httpStatusCode === 200) {
  //     return {
  //       success: true,
  //       message: "Upload successful!",
  //       location: data.Location,
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: "Upload failed. Please try again.",
  //     location: data.Location,
  //   };
  // } catch (err) {
  //   return {
  //     success: false,
  //     message: "Upload failed. Please try again.",
  //     location: data.Location,
  //   };
  // }
};
const s3Client = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    signatureVersion: "v4",
  },
  logger: console,
});

// export default s3Client;
export { uploadToS3, uploadImgToS3 };
