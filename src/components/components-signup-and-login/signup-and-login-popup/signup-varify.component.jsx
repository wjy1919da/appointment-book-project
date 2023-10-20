import React from 'react'
import './signup-varify.styles.scss';
import userInfoQueryStore from '../../../userStore.ts';
import LoginRegisterTitle from './login-register-title.component';
import { useClickVerification } from '../../../hooks/useAuth';
import NextButton from './next-button.component';
import { useEffect, useState } from 'react';
const SignupVerify = () => {
   const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
   const userInfo = userInfoQueryStore(state=>state.userInfo);
   const {mutate,data,isLoading,isError,error} = useClickVerification();
   const [countdown, setCountdown] = useState(10);
   const [isTiming, setIsTiming] = useState(false);
   var email;
   var userRole;
   useEffect(() => {
       email = localStorage.getItem('email');
       userRole = localStorage.getItem('accountType') === 1 ? 'USER' : 'DOCTOR';
   });
   const handleOnClick = () => {
        if(!email){
            alert("email is empty");
            switchPopupTab('sendVerifyEmail');
            return;
        }
         mutate({
              email: email
         });
        setCountdown(10);
        setIsTiming(true);
   }; 
   useEffect(() => {
        if (data?.code === 100) {
        //  切换到下一个tab
            alert("sending email ",data.msg);
            // switchPopupTab('gender');
        }
        if (data?.data && 400<=data.code <=500) {
            alert(data.msg);
        }
    }, [data]);
   
    useEffect(() => {
        if (isTiming) {
            if (countdown > 0) {
                const timerId = setTimeout(() => {
                    setCountdown(prevCount => prevCount - 1);
                }, 1000);
                return () => clearTimeout(timerId);
            } else {
                setIsTiming(false);
            }
        }
    }, [isTiming, countdown]); 
   return (
        <div className='signip-varify-container'>        
            <div className='signup-varify-title-container'>
                <LoginRegisterTitle title={ userRole==="USER"? "User Sign Up" : "Doctor Sign Up"} handleBackwards={()=>switchPopupTab("sendVerifyEmail")}/> 
           </div>
            <div className='signup-varify-resend'>{isTiming ? `Please wait for ${countdown} seconds` : "We have sent you an email to verify your email address."}</div>
            <div>
                <NextButton type="submit" title='resend' width='180px' disabled={isTiming} onClick={handleOnClick} />
            </div> 
        </div>
  )
}

export default SignupVerify