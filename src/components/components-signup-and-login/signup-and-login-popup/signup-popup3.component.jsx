import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './signup-popup3.styles.scss';
import SignUpForm from './signup-form.component';
import SignupVerify from './signup-varify.component';
import SocialSignUP from './social-signup.component';
import ChooseGender from './choose-gender.component';
import BirthYearPicker from './birth-year-picker.component';
import ChooseInterestedArea from './choose-interested-area.component';
import SignUpFinal from './sign-up-final.component';
import { useReducer } from 'react';
import registerReducer from '../../../reducer/registerReducer.ts';
import { RegisterState } from '../../../reducer/registerReducer.ts';
//src/reducer/registerReducer.ts
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
   // const [activeTab, setActiveTab] = useState("signup");
    const [state, dispatch] = useReducer(registerReducer, RegisterState.SIGN_UP);
    return (
        <Modal dialogClassName="signup-popup-modal"
               show={props.show} 
               onHide={props.onHide} 
               size="lg" 
               style={{ marginTop:"100px" }}> 
            {state === RegisterState.SIGN_UP && <SignUpForm setActiveTab={() => dispatch({ type: 'VERIFY_EMAIL' })} />}
            {state === RegisterState.VERIFY_EMAIL && <SignupVerify setActiveTab={() => dispatch({ type: 'GENDER' })} />}
            {state === RegisterState.GENDER && <ChooseGender setActiveTab={() => dispatch({ type: 'BIRTHDAY' })} />}
            {state === RegisterState.BIRTHDAY && <BirthYearPicker setActiveTab={() => dispatch({ type: 'INTEREST' })} />}
            {state === RegisterState.INTEREST && <ChooseInterestedArea setActiveTab={() => dispatch({ type: 'SIGN_UP_SUCCESS' })} />}
            {state === RegisterState.SIGN_UP_SUCCESS && <SignUpFinal onHide={props.onHide} />}
            {(state === RegisterState.SIGN_UP || state === RegisterState.VERIFY_EMAIL) && <SocialSignUP />}
        </Modal>
    )
}

export default SignupPopup3;