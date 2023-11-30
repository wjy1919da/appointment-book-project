import React, { useState, useEffect, useRef } from "react";
import arrowLeft from "../../../assets/user/doctor-arrow-left.png";
import arrowRight from "../../../assets/user/doctor-arrow-right.png";
import "./doctor-edit-profile-highLight.styles.scss";
import creatPostIcon from "../../../assets/post/create-post-icon.png";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import useUploadImg from "../../../hooks/useUploadImg";
const DoctorEditHightLightSession = () => {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const {
    selectedFiles,
    handleFileSelection,
    uploadProgress,
    isLoading,
    isError,
    uploadedFiles,
    resetFiles,
  } = useUploadImg();
  const fileInputRef = useRef(null);
  // const displayImage =
  //   selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : null;
  if (isError) {
    setAlert({
      show: true,
      type: "error",
      message: "Failed to uploaded file.",
    });
  }
  // file upload
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
  return (
    <div className="doctor-edit-hightLight-session-container">
      <div className="doctor-edit-hightlight-title-container">
        <div className="hightlight-title-text">Hightlight Cases</div>
        <div className="hightlight-title-arrow-session">
          <img src={arrowLeft} style={{ width: "24px", height: "24px" }}></img>
          <img src={arrowRight} style={{ width: "24px", height: "24px" }}></img>
        </div>
      </div>
      <div className="doctor-edit-hightlight-post-container">
        <div className="hightlight-creat-post-session">
          <input
            ref={fileInputRef}
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileSelection}
            multiple
          />

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleBrowseFiles}
          >
            <img src={creatPostIcon} />
          </div>

          <span className="hightlight-creat-post-text-container">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </span>
        </div>
        <div className="hightlight-post-container">
          <img className="hightlight-post-img" />
          <div className="highlight-post-text">
            Description 1 lorum ipsum Description 1 lorum ipsumDescription 1
            lorum ipsumDescription 1 lorum ipsum
          </div>
        </div>
        {/* <div className="hightlight-post-container">
          <div className="hightlight-post-img"></div>
          <div className="highlight-post-text">
            Description 1 lorum ipsum Description 1 lorum ipsumDescription 1
            lorum ipsumDescription 1 lorum ipsum
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default DoctorEditHightLightSession;
