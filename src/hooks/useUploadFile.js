import { useState, useRef } from "react";
import { uploadToS3 } from "../services/s3-client";
import { useToast } from "@chakra-ui/react";
const useUploadFile = () => {
  console.log("useUploadFile");
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
  const removeUploadedFile = (fileToRemove) => {
    setUploadedFiles((currentFiles) =>
      currentFiles.filter((file) => file.name !== fileToRemove.name)
    );
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
    setUploadingFiles((currentFiles) =>
      currentFiles.filter((file) => file !== fileToRemove)
    );
  };

  const handleFileSelection = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setUploadingFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleUpload = async () => {
    setIsError(false);
    setIsLoading(true);

    const uploadPromises = uploadingFiles.map((file) => {
      const controller = new AbortController();
      uploadControllers.current.set(file, controller);

      return uploadToS3(file, controller.signal).then((uploadResponse) => {
        const uploadedFile = {
          ...uploadResponse,
          name: file.name,
        };

        setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);
        return uploadedFile;
      });
    });

    toast.promise(
      Promise.all(uploadPromises),
      {
        success: { title: "File uploaded" },
        error: { title: "File upload failed", description: "Something wrong" },
        loading: { title: "File is uploading", description: "Please wait" },
      },
      {
        position: "top",
        duration: 1000,
        isClosable: true,
      }
    );

    try {
      await Promise.all(uploadPromises);
      setUploadingFiles([]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    selectedFiles,
    uploadedFiles,
    uploadingFiles,
    isError,
    isLoading,
    handleFileSelection,
    handleUpload,
    removeFile,
    resetFiles,
    removeUploadedFile,
  };
};

export default useUploadFile;
