import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './signup-popup3.styles.scss';
import SignUpForm from './signup-form.component';
import SignupVerify from './signup-varify.component';
import SocialSignUP from './social-signup.component';
import ChooseGender from './choose-gender.component';
import ChooseInterestedArea from './choose-interested-area.component';
import userInfoQueryStore from '../../../userStore.ts';
import LoginForm from './login-form.component';
import SendVerifyEmail from './send-verify-email.component';
import SignUpAccountType from './sign-up-account-type.component';
import SignUpDownloadPopUp from './signup-popUp-4-download';
import CreateAccount from './create-account.component';
import LoginPhone from './login-phone.component';
import DoctorPersonalInformation from '../../doctor-signUp-process/doctor-personal-information.jsx'
import SendOtpVerification from './send-otp-verification.component';
import DoctorSignUpFinish from '../../doctor-signUp-process/doctor-signUp-finish';
import DoctorVerification from '../../doctor-signUp-process/doctor-verification';
const StepTracker = ({ currentStep }) => {
    const steps = ['accountType', 'signUp', 'verifyEmail', 'gender', 'interest', 'download'];
    return (
        <div className="step-tracker">
            {steps.map((step, index) => (
                <div 
                    key={index} 
                    className={`bullet-point ${currentStep === step ? 'active' : ''}`}
                />
            ))}
        </div>
    );
}
const SignupPopup3 = (props) => {
  const switchPopupTab = userInfoQueryStore((state) => state.switchPopupTab);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  let modalClass = 'signup-popup-modal';
  let modalStyle = { marginTop: '100px' };
  if (userInfo.popupState === 'doctorProfile') {
      modalClass = 'signup-popup-doctor-profile';
      modalStyle = { marginTop: '120px' };
  } else if (userInfo.popupState === 'doctorVerification') {
      modalClass = 'signup-popup-doctor-verification'; 
      modalStyle = { marginTop: '0px' };
  } else if (userInfo.popupState === 'doctorFinish') {
      modalClass = 'signup-popup-doctor-finish'; 
      modalStyle = { marginTop: '100px' };
  }
  return (
    <Modal
      dialogClassName={modalClass}
      show={props.show}
      onHide={props.onHide}
      size='lg'
      style={modalStyle}
    >
      <Modal.Header closeButton style={{ borderBottom: 'none' }}></Modal.Header>
      <Modal.Body style={{ padding: "15px" }}>
      {userInfo.popupState === 'accountType' && <SignUpAccountType />}
      {userInfo.popupState === 'login' && <LoginForm />}
      {userInfo.popupState === 'signUp' && <SignUpForm />}
      {userInfo.popupState === 'sendVerifyEmail' && <SendVerifyEmail />}
      {userInfo.popupState === 'verifyEmail' && <SignupVerify />}
      {userInfo.popupState === 'gender' && <ChooseGender />}
      {userInfo.popupState === 'interest' && <ChooseInterestedArea />}
      {userInfo.popupState === 'success' && <SignUpDownloadPopUp />}
      {userInfo.popupState === 'phoneNumberLogin' && <LoginPhone />}
      {userInfo.popupState === 'sendOtpVerification' && <SendOtpVerification />}
      {userInfo.popupState === 'doctorProfile' && <DoctorPersonalInformation />}
      {userInfo.popupState === 'doctorVerification' && <DoctorVerification />}
      {userInfo.popupState === 'doctorFinish' && <DoctorSignUpFinish />}
      {(userInfo.popupState === 'signUp' || userInfo.popupState === 'login') && <SocialSignUP />}
      {(userInfo.popupState === 'signUp' || userInfo.popupState === 'sendVerifyEmail')&& <CreateAccount title="Already have an account?" subTitle="Login!" onClick={()=>switchPopupTab('login')}/>}
      {userInfo.popupState === 'login' && <CreateAccount title="Don't have an account?" subTitle="Sign up" onClick={()=>switchPopupTab('sendVerifyEmail')}/>}
      </Modal.Body>
    </Modal>
  );
};

export default SignupPopup3;
