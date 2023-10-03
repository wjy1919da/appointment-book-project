import React from 'react';
import { Button } from 'react-bootstrap'; 
import LoginRegisterTitle from './login-register-title.component'; 
import './sign-up-account-type.styles.scss'; 

const SignUpAccountType = () => {
    return (
        <div className="signup-account-type-container">
            <div className="title-container">
                <LoginRegisterTitle title="Join Charm as a..."/>
            </div>
            <div className="button-container">
                <Button variant="primary">Doctor</Button>
                <Button variant="secondary">User</Button>
            </div>
        </div>
    );
};

// Commenting to test 

export default SignUpAccountType;
