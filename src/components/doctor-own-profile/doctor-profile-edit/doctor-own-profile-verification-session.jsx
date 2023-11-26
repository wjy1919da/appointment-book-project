import React, { useState, useRef } from 'react';
import './doctor-own-profile-verification-session.styles.scss';
import { Button, Dropdown, Form } from "react-bootstrap";
import UploadIcon from "../../../assets/doctor/Upload.png";
import DoctorVerification from '../../doctor-signUp-process/doctor-verification';


const DoctorEditVerificationSession = () => {
    const options = ['Doctor Profile', 'Option 2', 'Option 3'];
    const defaultOption = options[0];
    const [selectedFileOne, setSelectedFileOne] = useState(null);
    const [selectedFileTwo, setSelectedFileTwo] = useState(null);

    const handleFileOneChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFileOne(file.name);
      }
    };

    const handleFileTwoChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFileTwo(file.name);
      }
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
            <Dropdown.Menu className="search-doctor-dropDown-menu">Doctor Profile</Dropdown.Menu>
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

            <Dropdown.Menu className="search-doctor-dropDown-menu">Board Certificate</Dropdown.Menu>
            </Dropdown>
        </div>

        <div className='doctor-veri-upload-main-section'>
            <div>
                <span className='doctor-verification-text'>Upload</span>
            </div>
            <div className="doctor-edit-veri-upload-button">
                <label htmlFor="file-upload-one" className="doctor-verification-upload-button">
                    {selectedFileOne || "Click here to Choose File"}
                </label>
                <input
                    id="file-upload-one"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileOneChange}
                    style={{ display: 'none' }}
                />
            </div>
            <div className="doctor-edit-veri-upload-button">
                <label htmlFor="file-upload-two" className="doctor-verification-upload-button">
                    {selectedFileTwo || "Click here to Choose File"}
                </label>
                <input
                    id="file-upload-two"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileTwoChange}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
      </div>
    );
  };
export default DoctorEditVerificationSession;