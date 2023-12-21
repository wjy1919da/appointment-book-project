import './doctor-verification-main-page-styles.scss';
import DoctorVerificationPage from './doctor-verification-page.component';
import Arrow from "../../assets/post/iconoir_arrow-left.svg";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import useUploadFile from "../../hooks/useUploadFile";
import {useDoctorAddProfile} from '../../hooks/useDoctorAddProfile'
import DoctorVerifiedSubmitted from './dotcor-verification-submmitted-page';
import HomeButtonPink from '../home-button-pink/home-button-pink';
import DoctorOwnProfileEditButton from "../doctor-own-profile/doctor-own-profile-edit-button";
import postMoreIcon from '../../assets/post/create-post-icon.png'
import './doctor-verification-page.styles.scss'
import doctorInfoQueryStore from '../../doctorStore';


const DoctorVerificationMainPage = () => {
    const navigate = useNavigate();
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [list,setList] =  useState([{}]);
    const [isVerifying, setIsVerifying] = useState(false);
    
    const [showSubmittedPage, setShowSubmittedPage] = useState(false);
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
    const handleOnClick = () => {
        navigate("/doctorProfile");
    };
    const addDoctorVerificationPage = () => {
        setNumberOfPages(numberOfPages + 1);
    };
    const handleFileSelectionFromPage = (file, pageNumber) => {
        // Update the list state with the new file at the correct index
        setList((prevList) => {
            const newList = [...prevList];
            newList[pageNumber - 1] = file;
            console.log("what is the list now",newList);
            return newList;
        });
    };

    const { mutate: addDoctorProfile } = useDoctorAddProfile();
    const submitProfile = () => {
        const doctorInfo = doctorInfoQueryStore.getState().doctorInfo;
        setShowSubmittedPage(true);
        setIsVerifying(true);
        doctorInfoQueryStore.getState().setVerificationSubmitted(true);
        const profileData = {
            address: doctorInfo.clinic, // or any other field that represents the address
            highlightedCases: [], // Assuming you'll have data for this, or keep it empty if not
            mechName: doctorInfo.BusinessName,
            mechTel: "", // Fetch from store if available
            miaoshu: "", // Fetch from store if available
            mobile: doctorInfo.mobile, // Ensure this is stored in the doctorInfo
            nickname: doctorInfo.username,
            specializationIds: [1, 2, 3], // Default values as mentioned
            verificationFilePaths: list.map(item => item.filePath || item) // Assuming list contains file paths
        };

        addDoctorProfile(profileData, {
            onSuccess: (data) => {
                console.log('Profile added successfully', data);
                // Handle successful submission here
            },
            onError: (error) => {
                console.error('Error adding profile', error);
                // Handle errors here
            }
        });
    }
    return (
        <div>
            <div className="doctor-verfication-header-container" style={{marginTop:'100px', paddingLeft:'50px', paddingRight:'50px'}}>
                <div className="doctor-verification-header-navi" onClick={handleOnClick}>
                    <img src={Arrow} alt="arrow" className="doctor-verification-header-arrow" />
                    <div className="doctor-verification-header-title">Verification</div>
                </div>
                <div className='doctor-verification-main-page-button-container'>
                    <DoctorOwnProfileEditButton onClick={() => setShowSubmittedPage(false)} title="Verification Dashboard" />
                    <HomeButtonPink title='Submit'  onClick={submitProfile} />
                </div>
            </div>            
            {showSubmittedPage ? (
                <div className='doctor-verifi-submmited-container'>
                    <DoctorVerifiedSubmitted />
                </div>
            ) : (
                <div className='doctor-verification-main-container'>
                    {Array.from({ length: numberOfPages }, (_, index) => (
                        <div key={index}>
                            <DoctorVerificationPage 
                                pageNumber={index + 1} 
                                onFileSelected={(file) => handleFileSelectionFromPage(file, index + 1)} 
                            />
                        </div>
                    ))}
                    <div className='doctor-verifi-main-page-click-more-area' onClick={addDoctorVerificationPage}>
                        <img src={postMoreIcon} alt="Add More"></img>
                    </div>
                </div> 
            )}
        </div>
    );
};
export default DoctorVerificationMainPage;