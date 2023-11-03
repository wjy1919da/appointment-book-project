import './doctor-signUp-process.styles.scss';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import DoctorVerification from './doctor-verification';
import doctorInfoQueryStore from '../../doctorStore.ts';
import HomeLogo from '../../assets/home/logo.png'
import DoctorSignUpFinish from './doctor-signUp-finish';
import DoctorPersonalInformation from './doctor-personal-information'
import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
const DoctorSignUpProcess = () => {
    const switchPopupTab = doctorInfoQueryStore(state=>state.switchPopupTab);
    const doctorInfo = doctorInfoQueryStore(state=>state.doctorInfo);
    const [startInformation, setStartInformation] = useState(false);
    const togglePopup = doctorInfoQueryStore(state=>state.togglePopup);
    const handleModalToggle = () => {
        setStartInformation(prevState => !prevState);
        togglePopup(true, 'personal Information')
    }
    return (
        <div className='doctor-signUp-process-container'>
            <div className='doctor-signUp-process-mainSection'>
                {
                !startInformation&&
                <div>
                    <span className='doctor-SignUp-process-text'>Welcome to Charm Life</span>
                    <img src = {HomeLogo} style={{width:'269px',height:'286px',marginTop:'50px',marginLeft:'100px'}}></img>
                    <div className='doctor-signUp-main-button'>
                    <SignupAndLoginButton title ='Let’s Set Up Your Profile' height= '45px'  width='300px' onClick={handleModalToggle}/>
                    </div>
                </div>

                }
                {
                    startInformation
                    &&
                    <div>
                        {doctorInfo.popupState === 'personal Information' && <DoctorPersonalInformation/>}
                        {doctorInfo.popupState === 'verification' && <DoctorVerification/>}
                        {doctorInfo.popupState === 'finish' && <DoctorSignUpFinish/>}
                    </div>
                }
            </div>
            <div className='doctor-signUp-process-right-orange-render'>

            </div>
            <div className='doctor-signUp-process-left-orange-render'>
            </div>     
        </div>   
    )
}

export default DoctorSignUpProcess;