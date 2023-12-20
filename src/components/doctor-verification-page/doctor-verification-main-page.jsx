import './doctor-verification-main-page-styles.scss';
import DoctorVerificationPage from './doctor-verification-page.component';
import Arrow from "../../assets/post/iconoir_arrow-left.svg";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import {useDoctorAddProfile} from '../../hooks/useDoctorAddProfile'
import DoctorVerifiedSubmitted from './dotcor-verification-submmitted-page';
import useUploadFile from "../../hooks/useUploadFile";
import HomeButtonPink from '../home-button-pink/home-button-pink';
import DoctorOwnProfileEditButton from "../doctor-own-profile/doctor-own-profile-edit-button";
import postMoreIcon from '../../assets/post/create-post-icon.png'
import './doctor-verification-page.styles.scss'

const DoctorVerificationMainPage = () => {
    const navigate = useNavigate();
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [showSubmittedPage, setShowSubmittedPage] = useState(false);

    const handleOnClick = () => {
        navigate("/doctorProfile");
    };

    const addDoctorVerificationPage = () => {
        setNumberOfPages(numberOfPages + 1);
    };

    return (
        <div>
            <div className="doctor-verfication-header-container" style={{marginTop:'100px', paddingLeft:'50px', paddingRight:'50px'}}>
                <div className="doctor-verification-header-navi" onClick={handleOnClick}>
                    <img src={Arrow} alt="arrow" className="doctor-verification-header-arrow" />
                    <div className="doctor-verification-header-title">Verification</div>
                </div>
                <div className='doctor-verification-main-page-button-container'>
                    <DoctorOwnProfileEditButton onClick={() => setShowSubmittedPage(false)} title="Verification Dashboard" />
                    <HomeButtonPink title='Submit' onClick={() => setShowSubmittedPage(true)} />
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
                            <DoctorVerificationPage pageNumber={index + 1} />
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