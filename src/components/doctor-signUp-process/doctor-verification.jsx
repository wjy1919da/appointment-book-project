import "./doctor-verification.styles.scss";
import { Link } from "react-router-dom";
import CloseButton from "../../assets/doctor/doctor-verification-close-Icon.png";
import UploadIcon from "../../assets/doctor/Upload.png";
import { Button, Dropdown, Form } from "react-bootstrap";

import React from "react";
import { useState, useRef } from "react";
import { uploadToS3 } from "../../services/s3-client";

const DoctorVerification = () => {
  // console.log("process", process.env);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelection = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => {
      const existingFileNames = new Set(prevFiles.map((file) => file.name));
      const newUniqueFiles = newFiles.filter(
        (file) => !existingFileNames.has(file.name)
      );
      return [...prevFiles, ...newUniqueFiles];
    });
  };

  const handleUploadClick = async () => {
    console.log(`uploading ${selectedFiles.length} files...`);
    const uploadPromises = selectedFiles.map((file) => uploadToS3(file));

    try {
      const uploadResults = await Promise.all(uploadPromises);
      console.log("all the files uploaded successfully", uploadResults);
      setUploadingFiles(selectedFiles);
      setSelectedFiles([]);
    } catch (err) {
      console.error("faild uploaded ", err);
    }
  };
  const handleRemoveFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };
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
          Uploading {selectedFiles.length}/3 files
        </span>
        {selectedFiles.map((file) => (
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
                onClick={() => handleRemoveFile(file.name)}
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
        <button
          className="doctor-verification-upload-button"
          onClick={handleUploadClick}
        >
          UPLOAD FILES
        </button>
      </div>
    </div>
  );
};

export default DoctorVerification;
