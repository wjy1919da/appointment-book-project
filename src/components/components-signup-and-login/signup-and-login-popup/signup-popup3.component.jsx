import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './signup-popup3.styles.scss';
import Cookies from 'js-cookie';
import userInfoQueryStore from '../../../userStore.ts';
import {useUserRegister} from '../../../hooks/useAuth';
import SignUpForm from './signup-form.component';
import SignupVerify from './signup-varify.component';
import SocialSignUP from './social-signup.component';
import ChooseGender from './choose-gender.component';
import BirthYearPicker from './birth-year-picker.component';
import ChooseInterestedArea from './choose-interested-area.component';
import SignUpFinal from './sign-up-final.component';
// 注册
// 主页面
const SignupPopup3 = (props) => {
    /*
        1. sign up
        2. login in
        3. choose gender
        4. pick birth year
        5. pick interested area
        6. thanks
        7. waiting for verify
    */
    const [activeTab, setActiveTab] = useState("signup");
    return (
        <Modal dialogClassName="signup-popup-modal"
               show={props.show} 
               onHide={props.onHide} 
               size="lg" // the modal will have a large size, can use the other size options such as 'sm' for small or 'xl' for extra-large
               // aria-labelledby="example-custom-modal-styling-title"
               style={{ marginTop:"100px" }}> 
            {activeTab === "signup" && <SignUpForm setActiveTab={setActiveTab} />}
            {activeTab === "verify" && <SignupVerify setActiveTab={setActiveTab} />}
            {activeTab === "gender" && <ChooseGender setActiveTab={setActiveTab} />}
            {activeTab === "birth" && <BirthYearPicker setActiveTab={setActiveTab} />}
            {activeTab === "interested" && <ChooseInterestedArea setActiveTab={setActiveTab} />}
            {activeTab === "thanks" && <SignUpFinal onHide={props.onHide} />}
            {(activeTab === "signup" || activeTab === "verify") && <SocialSignUP />}
        </Modal>
    )
}

export default SignupPopup3;