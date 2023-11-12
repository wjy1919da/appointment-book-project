import React from 'react';
import LoginRegisterTitle from './login-register-title.component'; 
import './sign-up-account-type.styles.scss'; 
import userInfoQueryStore from '../../../userStore.ts';
import NextButton from './next-button.component'; 
import MemberAndDoctorButton from './member-doctor-button.component'; 
import { useEffect,useState } from 'react';

const SignUpAccountType = () => {
    const [activeButtonType, setActiveButtonType] = useState(null);
    const setAccountType = userInfoQueryStore((state) => state.setAccountType);
    const switchPopupTab = userInfoQueryStore(state => state.switchPopupTab);
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    //console.log("userInfo in account type page",userInfo);
    
    useEffect(() => {
        localStorage.removeItem('accountType');
        const accountTypeFromLocalStorage = localStorage.getItem('accountType') || null;
        setAccountType(accountTypeFromLocalStorage);
    }, []);
    return (
        <div className="signup-account-type-container">
            <div className="group-title-buttons">
                <div className="title-container">
                    <LoginRegisterTitle title="Join Charm as a... "/>
                </div>
                <div className="button-container">
                    <MemberAndDoctorButton 
                        title="Doctor"
                        onClick={() => {
                            //console.log('Doctor button clicked');  
                            //setAccountType(0);
                            let newType = userInfo.accountType === 2 ? null : 2;
                            localStorage.setItem('accountType', newType);
                            setAccountType(newType);
                            setActiveButtonType(newType === 2 ? 'doctor' : null);
                        }}
                        isActive={activeButtonType === 'doctor'}
                    />
                    <MemberAndDoctorButton 
                        title="Member"
                        onClick={() => {
                           // console.log('Member button clicked');  
                            //setAccountType(0);
                            let newType = userInfo.accountType === 1 ? null : 1;
                            localStorage.setItem('accountType', newType);
                            setAccountType(newType);
                            setActiveButtonType(newType === 1 ? 'member' : null);
                        }}
                        isActive={activeButtonType === 'member'}
                    />
                </div>
            </div>
            <NextButton title="Next" onClick={()=>switchPopupTab('login')} disabled={!userInfo.accountType} />
        </div>
    );
};

export default SignUpAccountType;
