import "./doctor-verification-page.styles.scss";
import Arrow from "../../assets/post/iconoir_arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import UploadIcon from "../../assets/doctor/Upload.svg";
import DoctorOwnProfileEditButton from "../doctor-own-profile/doctor-own-profile-edit-button";
import useUploadFile from "../../hooks/useUploadFile";
import { useRef } from "react";
import DoctorSearchLoadingBar from "../doctor-search-loading-bar/doctor-search-loading-bar.component";
function DoctorVerificationPage() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/doctorProfile");
  };
  const fileInputRef = useRef(null);
  const {
    selectedFiles,
    uploadedFiles,
    uploadProgress,
    isLoading,
    handleFileSelection,
    handleUpload,
    removeFile,
    resetFiles,
    removeUploadedFile,
  } = useUploadFile();
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
    <div className="doctor-verification-outer-container">
      <div className="doctor-verfication-header-container">
        <div
          className="doctor-verification-header-navi"
          onClick={handleOnClick}
        >
          <img
            src={Arrow}
            alt="arrow"
            className="doctor-verification-header-arrow"
          />
          <div className="doctor-verification-header-title">Verification</div>
        </div>
        <DoctorOwnProfileEditButton
          onClick={handleOnClick}
          title="Verification Dashboard"
        />
      </div>
      <div className="doctor-verification-content-container">
        <div className="doctor-verification-content">
          <div className="doctor-verification-content-title">
            Add Document 1
          </div>

          <div className="doctor-verification-content-sub-area">
            <div className="doctor-verification-content-sub-title">
              Choose Document
            </div>
            <div className="doctor-verification-content-sub-text">
              *Please Upload all Required Medical Licenses Or Certification to
              Verify your Profile.
            </div>
            <Select placeholder="Select option" size="md">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
          <div className="doctor-verification-content-sub-area">
            <div className="doctor-verification-content-sub-title">
              Attach Document
            </div>
            {isLoading && <DoctorSearchLoadingBar />}
            <div
              className="doctor-verification-file-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleBrowseFiles}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelection}
                multiple
                style={{ display: "none" }}
              />
              <img src={UploadIcon} alt="uploadIcon" />
              <div className="doctor-verification-file-upload-text">
                Drag & Drop Files Here
              </div>
              <div className="doctor-verification-file-upload-sub-text">or</div>
              <div className="doctor-verification-file-upload-sub-text">
                Click Here to Browse
              </div>
            </div>
            <div className="doctor-verification-choose-file-section">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorVerificationPage;
