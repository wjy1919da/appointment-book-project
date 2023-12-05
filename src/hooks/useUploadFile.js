import { useState, useRef } from "react";
import { uploadToS3 } from "../services/s3-client";
// import { useToast } from "@chakra-ui/react";
const useUploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(new Map());
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    newFiles.forEach((file) => {
      setUploadProgress((prevProgress) =>
        new Map(prevProgress).set(file.name, 0)
      );
    });
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleUpload(newFiles);
  };

  const handleUpload = async (files) => {
    setIsLoading(true);

    const uploadPromises = files.map((file) => {
      const controller = new AbortController();
      uploadControllers.current.set(file, controller);

      return uploadToS3(file, controller.signal, (progress) => {
        setUploadProgress((prevProgress) => {
          const newProgress = new Map(prevProgress);
          newProgress.set(file.name, progress);
          return newProgress;
        });
      }).then((uploadResponse) => {
        const uploadedFile = {
          ...uploadResponse,
          name: file.name,
        };

        setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);
        return uploadedFile;
      });
    });

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    selectedFiles,
    uploadedFiles,
    uploadProgress,
    isLoading,
    handleFileSelection,
    handleUpload,
    removeFile,
    resetFiles,
    removeUploadedFile,
  };
};

export default useUploadFile;
