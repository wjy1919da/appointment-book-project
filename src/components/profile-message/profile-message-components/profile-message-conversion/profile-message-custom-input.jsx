import React, { useState, useRef, useEffect } from "react";
import useUploadImg from "../../../../hooks/useUploadImg";
import SendBird from "sendbird";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import userInfoQueryStore from "../../../../userStore";
import axios from "axios";
const ProfileMessageCustomInput = ({ channelUrl }) => {
  const {
    selectedFiles,
    setSelectedFiles,
    handleFileSelection,
    uploadProgress,
    isLoading,
    isError,
    uploadedFiles,
    setUploadedFiles,
    resetFiles,
    removeUploadedFile,
  } = useUploadImg();
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const globalStore = useSendbirdStateContext();
  const sdk = sendbirdSelectors.getSdk(globalStore);
  // const sendFileMessage = sendbirdSelectors.getOpenChannelSendFileMessage(
  //     globalStore
  // );
  const fileInputRef = useRef(null);
  //   console.log("sdkInstance", sdkInstance);
  const handleBrowseFiles = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelection({ target: { files: e.dataTransfer.files } });
  };

  const handleFileChange = async (e) => {
    await handleFileSelection(e); // This will update uploadedFiles after upload

    const config = {
      headers: {
        "Api-Token": "8ac0a9f2362e2a19dd5f1267ca33758f5b20f21b",
      },
    };

    try {
      for (const uploadedFile of uploadedFiles) {
        const requestBody = {
          user_id: userInfo.userId,
          file: uploadedFile, // Use the fileUrl from the uploaded file
          message_type: "FILE",
          url: uploadedFile, // Use the fileUrl from the uploaded file
        };

        const response = await axios.post(
          `https://api-03EB6025-A8DF-44E6-AEBB-09781295279C.sendbird.com/v3/group_channels/${channelUrl}/messages`,
          requestBody,
          config
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        console.log("File sent successfully", data);
      }
    } catch (error) {
      console.error("Error sending files:", error);
    }
  };
  //   console.log("uploaded files", uploadedFiles);
  return (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      multiple
    />
  );
};

export default ProfileMessageCustomInput;
