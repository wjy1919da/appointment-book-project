import React from 'react';
import { Button } from 'react-bootstrap'; 
import LoginRegisterTitle from './login-register-title.component'; 
import './sign-up-account-type.styles.scss'; 
import userInfoQueryStore from '../../../userStore.ts';
import NextButton from './next-button.component'; 
import MemberAndDoctorButton from './member-doctor-button.component'; 

const SignUpAccountType = () => {
    const setAccountType = userInfoQueryStore((state) => state.setAccountType);
    const switchPopupTab = userInfoQueryStore(state => state.switchPopupTab);
    const userInfo = userInfoQueryStore((state) => state.userInfo);

    const handleLoginButtonClick = () => {
        console.log("Login button clicked!");
        // Add your logic for the login button click event
    };

    console.log('accountType', userInfo.accountType);

    return (
        <div className="signup-account-type-container">
            <div className="group-title-buttons">
                <div className="title-container">
                    Join Charm as a...
                </div>
                <div className="button-container">
                    <MemberAndDoctorButton 
                        title="Doctor"
                        onClick={() => {
                            console.log('Doctor button clicked');  
                            setAccountType('doctor');
                            if (userInfo.accountType === 'doctor') {
                                setAccountType(null);
                            } else {
                                setAccountType('doctor');
                            }
                        }}
                        disabled={userInfo.accountType && userInfo.accountType !== 'doctor'}
                    />
                    <MemberAndDoctorButton 
                        title="Member"
                        onClick={() => {
                            console.log('Member button clicked');  
                            setAccountType('member');
                            if (userInfo.accountType === 'member') {
                                setAccountType(null);
                            } else {
                                setAccountType('member');
                            }
                        }}
                        disabled={userInfo.accountType && userInfo.accountType !== 'member'}
                    />
                </div>
            </div>
            <NextButton title="Next" type="submit" disabled={!userInfo.accountType} />
            <div className="login-prompt-container">
    <span>Already have an account? </span> 
  
    <button style={{ color: '#F48C8A', textDecoration: 'none', background: 'none', border: 'none' }} onClick={handleLoginButtonClick}>  Log in</button>

</div>


        </div>
    );
};

export default SignUpAccountType;
