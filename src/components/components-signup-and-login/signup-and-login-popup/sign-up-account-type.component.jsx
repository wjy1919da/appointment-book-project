import React from 'react';
import { Button } from 'react-bootstrap'; 
import LoginRegisterTitle from './login-register-title.component'; 
import './sign-up-account-type.styles.scss'; 
import userInfoQueryStore from '../../../userStore.ts';

const SignUpAccountType = () => {
    const setAccountType = userInfoQueryStore((state) => state.setAccountType);
    const switchPopupTab = userInfoQueryStore(state => state.switchPopupTab);

   
    console.log(setAccountType);

    return (
        <div className="signup-account-type-container">
            <div className="title-container">
                <LoginRegisterTitle title="Join Charm as a..."/>
            </div>
            <div className="button-container">
                <Button 
                    variant="primary" 
                    onClick={() => {
                        console.log('Doctor button clicked');  
                        setAccountType('doctor');
                    }}>
                    Doctor
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={() => {
                        console.log('User button clicked');  
                        setAccountType('user');
                    }}>
                    User
                </Button>
                <Button 
         
                    onClick={() => {
                        console.log('User button clicked');  
                        switchPopupTab('login');
                    }}>
                    Next
                </Button>
          
            </div>
        </div>
    );
};

export default SignUpAccountType;
