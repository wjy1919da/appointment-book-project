import { useState } from "react";
import { uploadImgToS3 } from "../services/s3-client.js";

const useUploadImg = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resetFiles = () => {
    setSelectedFiles([]);
    setUploadedFiles([]);
    setUploadingFiles([]);
  };
  const handleFileSelection = async (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles(newFiles);
    setUploadingFiles(newFiles);
    setIsError(false);
    setIsLoading(true);
    try {
      await Promise.all(
        newFiles.map(async (file) => {
          try {
            const result = await uploadImgToS3(file);
            if (result.success) {
              setUploadedFiles((prevFiles) => [...prevFiles, result.location]);
            } else {
              setIsError(true);
              console.log("error uploading file", result.message);
            }
          } catch (err) {
            setIsError(true);
            console.log("error uploading file", err);
          } finally {
            setUploadingFiles((prevUploadingFiles) =>
              prevUploadingFiles.filter(
                (uploadingFile) => uploadingFile !== file
              )
            );
          }
        })
      );
    } catch (err) {
      setIsError(true);
      console.log("error uploading files", err);
    } finally {
      setIsLoading(false);
      setSelectedFiles([]);
    }
  };
  return {
    selectedFiles,
    uploadedFiles,
    handleFileSelection,
    uploadingFiles,
    isError,
    isLoading,
    resetFiles,
  };
};

export default useUploadImg;
