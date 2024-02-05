import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./doctor-own-profile-edit.styles.scss";

import DoctorEditVoucherSession from "./doctor-edit-voucher-session";
import DoctorEditInterestCategory from "./doctor-profile-edit-interest-area";
import DoctorEditVerificationSession from "./doctor-own-profile-verification-session";
import DoctorEditHightLightSession from "./doctor-edit-profile-hightlight-session";
import useUploadImg from "../../../hooks/useUploadImg";
const DoctorProfileEdit = () => {
  const imageSize = 8 * 1024 * 1024; // 8MB
  // call api hooks
  const {
    selectedFiles,
    setSelectedFiles,
    handleFileSelection,
    uploadProgress,
    uploadedFiles,
    setUploadedFiles,
    resetFiles,
    removeUploadedFile,
  } = useUploadImg({ fileSize: imageSize });
  const fileInputRef = useRef(null);
  const [changePic, setChangePic] = useState(false);
  const [isTextClicked, setIsTextClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const interests = ["Body", "Face", "Lorum", "Lorum", "Lorum", "Lorum"];
  const [underlinePosition, setUnderlinePosition] = useState({
    left: 50,
    top: 106,
  });
  const navigate = useNavigate();
  const navigateToBasicProfile = () => {
    navigate("/doctorProfile");
  };
  const handleHover = (isHovered) => {
    setChangePic(isHovered);
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
  const changeTextColor = (index) => {
    const updatedStates = isTextClicked.map((_, i) =>
      i === index ? true : false
    );
    setIsTextClicked(updatedStates);
    if (index < 3) {
      setUnderlinePosition({ left: 50 + 63 * index });
    } else {
      setUnderlinePosition({ left: 50 + 63 * 2 + 74 * (index - 2) });
    }
  };
  var displayImage = selectedFiles[0]
    ? URL.createObjectURL(selectedFiles[0])
    : null;
  return (
    <div className="user-profile-edit-container">
      <div className="user-profile-edit-screen">
        <div className="doctor-edit-header">
          <button
            class="button-to-userprofile"
            onClick={navigateToBasicProfile}
          ></button>
          <span className="edit-profile-text">Edit Profile</span>
          <button class="button-save-changes">
            <span className="subtext-save-changes">Save Changes</span>
          </button>
        </div>
        <div className="personal-info-table">
          <span className="table-subheading">Personal Information</span>
          <div
            className="avatar-picture"
            onMouseEnter={() => handleHover(true)}
            style={{
              backgroundImage: displayImage ? `url(${displayImage})` : "none",
            }} // Added line
          ></div>
          <input
            ref={fileInputRef}
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileSelection}
            multiple
          />
          {changePic && (
            <div
              className="avatar-picture-on-hover"
              onMouseLeave={() => handleHover(false)}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleBrowseFiles}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="100"
                  fill="#141414"
                  fill-opacity="0.5"
                />
              </svg>
              <span className="click-to-change-text">Click to Change</span>
              <div className="delete-pic"></div>
            </div>
          )}
          <span
            className="gender-text"
            style={{ position: "absolute", top: "265px", left: "315px" }}
          >
            Female
          </span>
          <span
            className="gender-text"
            style={{ position: "absolute", top: "265px", left: "423px" }}
          >
            Male
          </span>
          <span
            className="gender-text"
            style={{ position: "absolute", top: "265px", left: "513px" }}
          >
            Other
          </span>

          <textarea
            style={{
              width: "278px",
              height: "40px",
              top: "165px",
              left: "281px",
              padding: "9px 20px 9px 12px",
            }}
            placeholder="Name"
          />
          <textarea
            style={{
              width: "504px",
              height: "48px",
              top: "364px",
              left: "55px",
              padding: "13px 374px 13px 12px",
            }}
            placeholder="mm/dd/yyyy"
          />
          <textarea
            style={{
              width: "504px",
              height: "48px",
              top: "471px",
              left: "55px",
              padding: "13px 320px 13px 12px",
            }}
            placeholder="charm@gmail.com"
          />
          <textarea
            style={{
              width: "504px",
              height: "48px",
              top: "578px",
              left: "55px",
              padding: "13px 365px 13px 12px",
            }}
            placeholder="(xxx)-xxxx-xxxx"
          />
          <textarea
            style={{
              width: "504px",
              height: "48px",
              top: "678px",
              left: "55px",
              padding: "13px 365px 13px 12px",
            }}
            placeholder="(xxx)-xxxx-xxxx"
          />
          <textarea
            style={{
              width: "504px",
              height: "48px",
              top: "778px",
              left: "55px",
              padding: "13px 300px 13px 12px",
            }}
            placeholder="Clinic/Organization"
          />
          <textarea
            style={{
              width: "504px",
              height: "48px",
              top: "878px",
              left: "55px",
              padding: "13px 300px 13px 12px",
            }}
            placeholder="City,state"
          />
          <textarea
            style={{
              width: "504px",
              height: "48px",
              top: "978px",
              left: "55px",
              padding: "13px 300px 13px 12px",
            }}
            placeholder="www.charm.com"
          />
          <textarea
            style={{
              width: "504px",
              height: "178px",
              top: "1085px",
              left: "55px",
              padding: "8px 12px 148px 12px",
            }}
            placeholder="Description"
          />
          <span className="table-body" style={{ top: "124px", left: "281px" }}>
            Name
          </span>
          <div className="other-gender-marker" style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: "relative", left: "479px", top: "264px" }}
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                fill="#FBFCFF"
                stroke="#675D59"
                stroke-width="2"
              />
            </svg>
          </div>
          <div className="male-gender-marker" style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: "relative", left: "389px", top: "240px" }}
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                fill="#FBFCFF"
                stroke="#675D59"
                stroke-width="2"
              />
            </svg>
          </div>
          <div className="female-gender-marker" style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: "relative", left: "281px", top: "216px" }}
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                fill="#FBFCFF"
                stroke="#F48C8A"
                stroke-width="2"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{ position: "relative", left: "287px", top: "198px" }}
            >
              <circle cx="6" cy="6" r="6" fill="#F48C8A" stroke="#FBFCFF" />
            </svg>
          </div>
          <span className="table-body" style={{ top: "223px", left: "281px" }}>
            Gender
          </span>
          <span className="table-body" style={{ top: "323px", left: "55px" }}>
            Age
          </span>
          <span className="table-body" style={{ top: "430px", left: "55px" }}>
            Email
          </span>
          <span className="table-body" style={{ top: "537px", left: "55px" }}>
            Phone Number
          </span>
          <span className="table-body" style={{ top: "642px", left: "55px" }}>
            Business Number
          </span>
          <span className="table-body" style={{ top: "742px", left: "55px" }}>
            Clinic
          </span>
          <span className="table-body" style={{ top: "842px", left: "55px" }}>
            Location
          </span>
          <span className="table-body" style={{ top: "942px", left: "55px" }}>
            Website
          </span>
          <span className="table-body" style={{ top: "1044px", left: "55px" }}>
            Bio
          </span>
        </div>
        <div className="interests-table">
          <span className="table-subheading">Interests</span>
          {isTextClicked.map((isClicked, index) => (
            <span
              className="interest-options"
              key={index}
              style={{
                color: isClicked
                  ? "var(--text-1-footer, #352C29)"
                  : "var(--text-2-button, #675D59)",
                top: "102px",
                left: "48px",
                marginRight: "24px",
              }}
              onClick={() => changeTextColor(index)}
            >
              {interests[index]}
            </span>
          ))}
          <div
            className="underline"
            style={{
              position: "relative",
              left: `${underlinePosition.left}px`,
              top: `${underlinePosition.top}px`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="4"
              viewBox="0 0 34 4"
              fill="none"
            >
              <path
                d="M2 2H32"
                stroke="url(#paint0_linear_3221_24210)"
                stroke-width="4"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3221_24210"
                  x1="2"
                  y1="2.5"
                  x2="32"
                  y2="2.50001"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F48C8A" />
                  <stop offset="1" stop-color="#F0A484" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="doctor-edit-profile-interest-category-mapping">
            <DoctorEditInterestCategory />
          </div>
        </div>
        <div className="doctoe-edit-verification-session">
          <DoctorEditVerificationSession />
        </div>
        <div>
          <DoctorEditHightLightSession />
        </div>
        <div>
          <DoctorEditVoucherSession />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileEdit;
