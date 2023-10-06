import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; 
import LoginRegisterTitle from './login-register-title.component'; 
import './sign-up-account-type.styles.scss'; 
import userInfoQueryStore from '../../../userStore.ts';
// import NextButton from './next-button.component'; 
import MemberAndDoctorButton from './member-doctor-button.component'; 


const SignUpAccountType = () => {
    const setAccountType = userInfoQueryStore((state) => state.setAccountType);
    const switchPopupTab = userInfoQueryStore(state => state.switchPopupTab);

    const [isValid, setIsValid] = useState(false);

    return (
        <div className="signup-account-type-container">
            <div className="title-container">
               
                <LoginRegisterTitle title="Join Charm as a..."/>
              
            </div>
         
            <div className="button-container">

                <MemberAndDoctorButton 
                    title="Doctor"
                    onClick={() => {
                        console.log('Doctor button clicked');  
                        setAccountType('doctor');
                        setIsValid(true);
                    }}
                />

                <MemberAndDoctorButton 
                    title="Member"
                    onClick={() => {
                        console.log('Member button clicked');  
                        setAccountType('member');
                        setIsValid(true);
                    }}
                />

                {/* <NextButton title="Next" type="submit" disabled={!isValid} /> */}
            </div>
        </div>
    );
};

export default SignUpAccountType;
