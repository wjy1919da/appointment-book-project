import "./doctor-verification-page.styles.scss";
import Arrow from "../../assets/post/iconoir_arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import cancelIcon from "../../assets/doctor/Cancel.png";
import UploadIcon from "../../assets/doctor/Upload.svg";
import DoctorOwnProfileEditButton from "../doctor-own-profile/doctor-own-profile-edit-button";
import useUploadImg from "../../hooks/useUploadImg";
import { useRef, useEffect } from "react";
import DoctorSearchLoadingBar from "../doctor-search-loading-bar/doctor-search-loading-bar.component";
function DoctorVerificationPage({ pageNumber, onFileSelected }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/doctorProfile");
  };
  const fileInputRef = useRef(null);
  const verificationFileSize = 8 * 1024 * 1024; // 8MB
  // call api hooks
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
  } = useUploadImg({ fileSize: verificationFileSize });
  function extractFileName(url) {
    const decodedUrl = decodeURIComponent(url);
    const fileName = decodedUrl.split("/").pop();
    return fileName.replace(/^\d+-/, ""); // Remove the leading digits and hyphen
  }
  useEffect(() => {
    console.log("Uploaded Files changed:", uploadedFiles);
    if (uploadedFiles.length > 0) {
      handleFileSelectedAndUploaded(uploadedFiles[0]);
    }
  }, [uploadedFiles]);
  const handleFileSelectedAndUploaded = (selectedFile) => {
    // Call the function passed from the parent component
    console.log("have call the function?");
    onFileSelected(selectedFile);
  };

  console.log("what is the uploadFiles", uploadedFiles);
  /* uploadedFiles.join(", ") is licences */
  console.log("uploadedFiles", uploadedFiles.join(", "));
  console.log("selectedFile", selectedFiles);
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
      <div className="doctor-verification-content-container">
        <div className="doctor-verification-content">
          <div className="doctor-verification-content-title">
            Add Document {pageNumber}
          </div>
          <div className="doctor-verification-content-sub-area">
            <div className="doctor-verification-content-sub-title">
              Choose Document
            </div>
            <div className="doctor-verification-content-sub-text">
              *Please Upload all Required Medical Licenses Or Certification to
              Verify your Profile.
            </div>
            <Select placeholder="Select your License to upload" size="md">
              <option value="medicalLicense">
                Medical License - Issued by the medical board in the state where
                they practice.
              </option>
              <option value="boardCertification">
                Board Certification - By entities like the American Society of
                Plastic Surgeons (ASPS).
              </option>
              <option value="malpracticeInsurance">
                Malpractice Insurance - Proof of current malpractice insurance.
              </option>
              <option value="educationalCredentials">
                Educational Credentials - Copies of medical school diploma and
                relevant certificates.
              </option>
              <option value="proofOfAddress">
                Proof of Address - Document proving the practice address.
              </option>
              <option value="stateControlledSubstanceRegistration">
                State Controlled Substance Registration - Required in some
                states for prescribing certain medications.
              </option>
              <option value="cvOrResume">CV or Resume (Optional)</option>
              <option value="proofOfIdentity">
                Proof of Identity - Government-issued ID like a passport or
                driver's license.
              </option>
              <option value="nationalProviderIdentifier">
                National Provider Identifier (NPI) - Unique ID for health care
                providers in the US.
              </option>
              <option value="others">Others</option>
            </Select>
          </div>
          <div className="doctor-verification-content-sub-area">
            <div className="doctor-verification-content-sub-title">
              Attach Document
            </div>
            {isLoading && <DoctorSearchLoadingBar />}
            {!uploadedFiles.length > 0 && (
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
                {!isLoading && !uploadedFiles.length > 0 && (
                  <div style={{ textAlign: "center" }}>
                    <div className="doctor-verification-file-upload-text">
                      Drag & Drop Files Here
                    </div>

                    <div className="doctor-verification-file-upload-sub-text">
                      or
                    </div>
                    <div className="doctor-verification-file-upload-sub-text">
                      Click Here to Browse
                    </div>
                  </div>
                )}
                {isLoading &&
                  selectedFiles.length > 0 &&
                  !uploadedFiles.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <div
                        className="doctor-verification-file-upload-text"
                        style={{ fontSize: "24px", marginBottom: "30px" }}
                      >
                        {selectedFiles[0].name}
                      </div>
                      <div className="doctor-verification-file-upload-sub-text">
                        Uploading...
                      </div>
                    </div>
                  )}
              </div>
            )}
            {uploadedFiles.length > 0 && (
              <div>
                <div className="uploadFile-box">
                  <span
                    className="doctor-verification-text"
                    style={{ marginLeft: "10px" }}
                  >
                    {extractFileName(uploadedFiles[0])}
                  </span>
                  <button
                    className="uploadFile-box-cancel-icon"
                    onClick={resetFiles}
                  >
                    <img src={cancelIcon}></img>
                  </button>
                </div>
                <div
                  className="doctor-verification-content-sub-title"
                  style={{ marginTop: "20px" }}
                >
                  Document Description(optional)
                </div>
                <textarea
                  placeholder="Enter something"
                  style={{
                    width: "669px",
                    height: "159px",
                    borderRadius: "5px",
                    border: "1px solid black",
                    marginTop: "30px",
                  }}
                ></textarea>
                <div></div>
              </div>
            )}
            {/* <div className="doctor-verification-choose-file-section">
            {uploadedFiles.map((url, index) => (
              <div key={index} className="selected-file">
                <div className="uploadFile-box">
                  <span className="doctor-verification-text" style={{ marginLeft: "10px" }}>
                    {extractFileName(url)}
                  </span>
                </div>
              </div>
            ))}
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorVerificationPage;
