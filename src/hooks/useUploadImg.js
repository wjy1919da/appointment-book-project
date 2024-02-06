import { useState, useRef } from "react";
import { uploadImgToS3 } from "../services/s3-client.js";
import { useToast } from "@chakra-ui/react";

const useUploadImg = ({
  fileSize = 0,
  bucketName = process.env.REACT_APP_IMG_BUCKET_NAME,
}) => {
  // console.log("fileSize", fileSize);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const uploadControllers = useRef(new Map());

  const resetFiles = () => {
    setSelectedFiles([]);
    setUploadedFiles([]);
    setUploadingFiles([]);
  };
  const removeFile = (fileToRemove) => {
    if (uploadControllers.current.has(fileToRemove)) {
      const controller = uploadControllers.current.get(fileToRemove);
      controller.abort();
      uploadControllers.current.delete(fileToRemove);
    }
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((file) => file !== fileToRemove)
    );
  };
  const removeUploadedFile = (indexToRemove) => {
    setUploadedFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFileSelection = async (event) => {
    // get files from input and transform into array
    const newFiles = Array.from(event.target.files);
    if (uploadingFiles.length + newFiles.length > 3) {
      toast({
        title: "Upload limit exceeded",
        description: "You can upload up to 3 files at a time.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    setUploadingFiles(newFiles);
    setIsError(false);
    setIsLoading(true);

    const uploadPromises = newFiles.map((file) => {
      // const controller = new AbortController();
      // uploadControllers.current.set(file, controller);
      return uploadImgToS3({
        file: file,
        maxFileSize: fileSize,
        bucketName: bucketName,
      });
    });

    toast.promise(
      Promise.allSettled(uploadPromises),
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

    // Handling the results of Promise.allSettled
    const results = await Promise.allSettled(uploadPromises);
    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value.success) {
        // spread
        setUploadedFiles((prevFiles) => [...prevFiles, result.value.location]);
      } else {
        setIsError(true);
      }
      // Removing the file from uploadingFiles regardless of the outcome
      setUploadingFiles((prevUploadingFiles) =>
        prevUploadingFiles.filter(
          (uploadingFile) => uploadingFile !== newFiles[index]
        )
      );
    });
    setIsLoading(false);
  };

  return {
    selectedFiles,
    setSelectedFiles,
    setUploadedFiles,
    uploadedFiles,
    handleFileSelection,
    uploadingFiles,
    isError,
    isLoading,
    resetFiles,
    removeFile,
    removeUploadedFile,
  };
};

export default useUploadImg;
