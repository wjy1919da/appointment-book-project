import { useState } from "react";
import { uploadImgToS3 } from "../services/s3-client.js";
import { useToast } from "@chakra-ui/react";

const useUploadImg = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const resetFiles = () => {
    setSelectedFiles([]);
    setUploadedFiles([]);
    setUploadingFiles([]);
  };
  const handleFileSelection = async (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    setUploadingFiles(newFiles);
    setIsError(false);
    setIsLoading(true);

    const uploadPromises = newFiles.map((file) => uploadImgToS3(file));

    toast.promise(
      Promise.all(uploadPromises),
      {
        success: { title: "image uploaded" },
        error: { title: "image upload failed", description: "Something wrong" },
        loading: { title: "image is uploading", description: "Please wait" },
      },
      {
        position: "top",
        duration: 1000,
        isClosable: true,
      }
    );

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
