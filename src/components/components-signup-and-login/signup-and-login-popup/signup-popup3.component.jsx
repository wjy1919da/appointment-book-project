import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './signup-popup3.styles.scss';
import SignUpForm from './signup-form.component';
import SignupVerify from './signup-varify.component';
import SocialSignUP from './social-signup.component';
import ChooseGender from './choose-gender.component';

import ChooseInterestedArea from './choose-interested-area.component';
import SignUpFinal from './sign-up-final.component';
import userInfoQueryStore from '../../../userStore.ts';
import LoginForm from './login-form.component';
import SendVerifyEmail from './send-verify-email.component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// 注册&登录
// 主页面
const SignupPopup3 = (props) => {
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const userInfo = userInfoQueryStore(state=>state.userInfo);
    //console.log("userInfo in signup-popup3",userInfo);
    return (
        <Modal dialogClassName="signup-popup-modal"
               show={props.show} 
               onHide={props.onHide} 
               size="lg" 
               style={{ marginTop:"100px" }}
            > 
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
            </Modal.Header>
            {/* {userInfo.popupState !== 'login' && <StepTracker currentStep={userInfo.popupState} />} */}
            {userInfo.popupState === 'accountType' && <SignUpAccountType />}
            {userInfo.popupState === 'signUp' && <SignUpForm/>}
            {userInfo.popupState === 'login' && <LoginForm/>}
            {userInfo.popupState === 'verifyEmail' && <SignupVerify />}
            {userInfo.popupState === 'gender' && <ChooseGender/>}
            {userInfo.popupState === 'interest' && <ChooseInterestedArea />}
            {userInfo.popupState === 'download' && <SignUpDownloadPopUp />}
            {userInfo.popupState === 'success' && <SignUpFinal />}
            {(userInfo.popupState === 'signUp' || userInfo.popupState === 'verifyEmail') && <SocialSignUP />}
        </Modal>
    )
}

export default SignupPopup3;

// Adding comment to test