import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './signup-popup3.styles.scss';
import SignUpForm from './signup-form.component';
import SignupVerify from './signup-varify.component';
import SocialSignUP from './social-signup.component';
import ChooseGender from './choose-gender.component';
// import BirthYearPicker from './birth-year-picker.component';
import ChooseInterestedArea from './choose-interested-area.component';
import SignUpFinal from './sign-up-final.component';
import userInfoQueryStore from '../../../userStore.ts';
import LoginForm from './login-form.component';
import SendVerifyEmail from './send-verify-email.component';
import SignUpAccountType from './sign-up-account-type.component';
import SignUpDownloadPopUp from './signup-popUp-4-download';
import CreateAccount from './create-account.component';

// 注册&登录
// 主页面
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
  //console.log("userInfo in signup-popup3",userInfo);
  return (
    <Modal
      dialogClassName='signup-popup-modal'
      show={props.show}
      onHide={props.onHide}
      size='lg'
      style={{ marginTop: '100px' }}
    >
      <Modal.Header closeButton style={{ borderBottom: 'none' }}></Modal.Header>
      <Modal.Body>
      {userInfo.popupState === 'accountType' && <SignUpAccountType />}
      {userInfo.popupState === 'login' && <LoginForm />}
      {userInfo.popupState === 'signUp' && <SignUpForm />}
      {userInfo.popupState === 'sendVerifyEmail' && <SendVerifyEmail />}
      {userInfo.popupState === 'verifyEmail' && <SignupVerify />}
      {userInfo.popupState === 'gender' && <ChooseGender />}
      {userInfo.popupState === 'interest' && <ChooseInterestedArea />}
      {userInfo.popupState === 'success' && <SignUpDownloadPopUp />}
      {(userInfo.popupState === 'signUp' || userInfo.popupState === 'login') && <SocialSignUP />}
      {(userInfo.popupState === 'signUp' || userInfo.popupState === 'login' || userInfo.popupState === 'sendVerifyEmail' || userInfo.popupState === 'verifyEmail') && 
          <CreateAccount title="Already have an account?" subTitle="Log in" onClick={()=>switchPopupTab('accountType')}/>}
      {userInfo.popupState === 'accountType' && <CreateAccount title="Don't have an account?" subTitle="Sign up" onClick={()=>switchPopupTab('login')}/>}
      </Modal.Body>
    </Modal>
  );
};

export default SignupPopup3;
