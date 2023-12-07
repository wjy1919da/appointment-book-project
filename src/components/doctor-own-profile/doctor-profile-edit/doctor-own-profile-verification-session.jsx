import React, { useState, useRef } from "react";
import "./doctor-own-profile-verification-session.styles.scss";
import { Button, Dropdown, Form } from "react-bootstrap";
import UploadIcon from "../../../assets/doctor/Upload.png";
import DoctorVerification from "../../doctor-signUp-process/doctor-verification";
import useUploadFile from "../../../hooks/useUploadFile";
import CloseButton from "../../../assets/doctor/doctor-verification-close-Icon.png";

const DoctorEditVerificationSession = () => {
  const options = ["Doctor Profile", "Option 2", "Option 3"];
  const defaultOption = options[0];
  const {
    selectedFiles,
    handleFileSelection,
    uploadProgress,
    isLoading,
    isError,
    uploadedFiles,
    resetFiles,
    removeFile,
    handleUpload,
    uploadingFiles,
    removeUploadedFile,
  } = useUploadFile();
  const fileInputRef = useRef(null);
  const handleBrowseFiles = () => {
    fileInputRef.current.click();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    handleFileSelection({ target: { files: e.dataTransfer.files } });
  };
  return (
    <div className="doctor-edit-verification-session-container">
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
          <Dropdown.Menu className="search-doctor-dropDown-menu">
            Doctor Profile
          </Dropdown.Menu>
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

          <Dropdown.Menu className="search-doctor-dropDown-menu">
            Board Certificate
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="doctor-veri-upload-main-section">
        <div
          className="doctor-profile-verification-upload-body"
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
        <div className="doctor-edit-verification-file-section">
          <span className="doctor-verification-text">
            Uploading {uploadedFiles.length}/{uploadingFiles.length}files
          </span>
          {uploadingFiles.map((file) => (
            <div key={file.name}>
              <div className="doctor-edit-veri-upload-button">
                <span
                  className="doctor-edit-veri-upload-text"
                  style={{ marginLeft: "10px" }}
                >
                  {file.name}
                </span>
                <img
                  src={CloseButton}
                  onClick={() => removeFile(file)}
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
        <div className="doctor-edit-verification-file-section">
          <span className="doctor-verification-text">Uploaded Files</span>
          {uploadedFiles.map((file) => (
            <div key={file.name}>
              <div className="doctor-edit-veri-upload-button">
                <span
                  className="doctor-edit-veri-upload-text"
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
        <div className="doctor-edit-upload-button-section">
          <button className="doctor-edit-upload-button" onClick={handleUpload}>
            UPLOAD FILES
          </button>
        </div>
      </div>
    </div>
  );
};
export default DoctorEditVerificationSession;
