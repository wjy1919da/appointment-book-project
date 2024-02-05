import "./doctor-verification.styles.scss";
import { Link } from "react-router-dom";
import CloseButton from "../../assets/doctor/doctor-verification-close-Icon.png";
import UploadIcon from "../../assets/doctor/Upload.png";
import { Button, Dropdown, Form } from "react-bootstrap";
import React, { useState, useRef } from "react";
import useUploadImg from "../../hooks/useUploadImg";
const DoctorVerification = () => {
  const fileInputRef = useRef(null);
  const verificationFileSize = 8 * 1024 * 1024; // 8MB
  // call api hooks
  const {
    selectedFiles,
    setSelectedFiles,
    handleFileSelection,
    uploadProgress,
    uploadingFiles,
    uploadedFiles,
    setUploadedFiles,
    resetFiles,
    removeUploadedFile,
  } = useUploadImg({ fileSize: verificationFileSize });

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
    <div className="doctor-verification-main-container">
      <div className="doctor-verification-title">
        <span className="doctor-verification-text">Verification</span>
      </div>
      <div className="doctor-verification-doctor-profile">
        <span className="doctor-verification-text">
          Which Profile do you want to Claim
        </span>
        <label htmlFor="doctorProfile"></label>
        <Dropdown>
          <Dropdown.Toggle
            className="doctor-verification-dropDown--button"
            id="dropdownMenuButton"
            data-bs-auto-close="outside"
          >
            Doctor Profile
          </Dropdown.Toggle>
          <Dropdown.Menu className="search-doctor-dropDown-menu"></Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="doctor-verification-certification">
        <Dropdown>
          <Dropdown.Toggle
            className="doctor-verification-dropDown--button"
            id="dropdownMenuButton"
            data-bs-auto-close="outside"
          >
            Board Certificate
          </Dropdown.Toggle>

          <Dropdown.Menu className="search-doctor-dropDown-menu"></Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="doctor-verification-upload-section">
        <span className="doctor-verification-gray-text">Step 1 of 1</span>
        <span className="doctor-verification-text">
          Please upload all required medical licenses or certifications to
          verify your profile.
        </span>
      </div>
      <div
        className="doctor-verification-upload-body"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBrowseFiles}
      >
        <img src={UploadIcon} alt="Upload Icon" />
        <span className="doctor-verification-text">
          Drag and Drop files or Browse
        </span>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelection}
        multiple
        style={{ display: "none" }}
      />
      <div className="doctor-verification-choose-file-section">
        <span className="doctor-verification-text">
          Uploading {uploadingFiles.length}/{selectedFiles.length}files
        </span>
        {uploadingFiles.map((file) => (
          <div key={file.name} className="selected-file">
            <div className="uploadFile-box">
              <span
                className="doctor-verification-text"
                style={{ marginLeft: "10px" }}
              >
                {file.name}
              </span>
              <img
                src={CloseButton}
                onClick={() => removeUploadedFile(file)}
                style={{
                  width: "15px",
                  height: "15px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                alt="Remove"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="doctor-verification-list-file-section">
        <span className="doctor-verification-text">Upload</span>
        {uploadedFiles.map((file) => (
          <div key={file.name} className="selected-file">
            <div className="uploadFile-box">
              <span
                className="doctor-verification-text"
                style={{ marginLeft: "10px" }}
              >
                {file.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="doctor-verification-upload-button">
        <button className="doctor-verification-upload-button">
          UPLOAD FILES
        </button>
      </div>
    </div>
  );
};

export default DoctorVerification;
