import React, { useState,useEffect } from "react";
import OtpInput from 'react-otp-input';
import './send-otp-verification.styles.scss';
import LoginRegisterTitle from "./login-register-title.component";
import NextButton from "./next-button.component";
import { useUserOtpRegisterValidate } from '../../../hooks/useAuth';
import UserInfo from "../../user-info/user-info/user-info";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import userInfoQueryStore from '../../../userStore.ts';

import { Form, InputGroup } from 'react-bootstrap'

const SendOtpVerification = () => {
    // const userInfo = userInfoQueryStore((state) => state.userInfo);
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    const userRole = localStorage.getItem('accountType');
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const [otp, setOtp] = useState('');
    const [isValid, setIsValid] = useState(false); // Start with false since OTP is initially empty
    const [otpError, setOtpError] = useState(''); 
    console.log("userInfo ",userInfo);
    useEffect(() => { // <- useEffect to validate OTP in real-time
        validateOtp();
    }, [otp]);
    const {mutate,data,isLoading,isError,error} = useUserOtpRegisterValidate();
    const validateOtp = () => {
        if (!otp) {
            setIsValid(false);
            setOtpError('OTP is required.');
        } else if (otp.length !== 6) {
            setIsValid(false);
            setOtpError('OTP must be 6 digits.');
        } else {
            setIsValid(true);
            setOtpError('');
        }
    };

    const onSubmit = (e) => {
        console.log("onSubmit");
        e.preventDefault(); 
        // if (validateOtp()) {
            // console.log("otp is valid");
            mutate({
                mobile: userInfo.phoneNumber,
                otp: otp,
                userRole: userRole
            });
        // }
    };
    useEffect(() => {
        if (data?.code === 100) {
            alert(data.msg);
        }
        if (data?.code === 104 || data?.code === 501) {
            alert(data.msg);  
        }
    }, [data]);

    return (
        <div className="send-verification-outer-container">
            <div className="send-verification-title-container">
                <LoginRegisterTitle title="Enter OTP" />
            </div>
            <Form onSubmit={onSubmit}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    inputStyle={{ width: '40px', height: '40px', margin: '0 10px', fontSize: '20px', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.3)' }}
                    renderInput={(props) => <input {...props} />}
                />
                { !isValid && <p style={{ color: 'red' }}>{otpError}</p> }
                <div className="verification-button-section">
                    <div onClick={()=>switchPopupTab('phoneNumberLogin')}>go back</div>
                    <div onClick={()=>switchPopupTab('login')}>go to login</div>
                    <NextButton type="submit" title='Verify' width='180px' disabled={!isValid} />
                </div>
            </Form>
        </div>
    );
}

export default SendOtpVerification;
