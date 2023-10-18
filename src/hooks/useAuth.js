import userInfoQueryStore from '../userStore.ts';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useQuery } from "react-query";
import Cookies from 'js-cookie';
const base = {
    userOtpLogin: 'http://api-dev.charm-life.com/login/phone/validate-otp',
    userEmailLogin: 'http://api-dev.charm-life.com/login/user',
    userSendOtp: 'http://api-dev.charm-life.com/login/phone/send-otp',
    addUser: 'http://api-dev.charm-life.com/register/email',
    otpRegister: 'http://api-dev.charm-life.com/register/phone/send-otp',
    otpRegisterValidate: 'http://api-dev.charm-life.com/register/phone/validate-otp',
    emailRegisterValidate: 'http://api-dev.charm-life.com/register',
    setUserProfile:'http://api-dev.charm-life.com/user/set_user_profile',
    clickVerification:'http://api-dev.charm-life.com/register/clickVerification'
};

export function useUserOptLogin() {
    const userInfo = userInfoQueryStore(s => s.userInfo);
    const fetchUserLogin = async () => {
        const res = await axios.post(base.userOtpLogin, {
            "mobile": userInfo.mobile,
            "otp": userInfo.otp
        });
        return res.data;
    };
    return useQuery(['userLogin', userInfo.mobile, userInfo.otp], fetchUserLogin, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}


export function useUserRegister() {
    const fetchUserRegister = async (username,email,password,userRole) => {
        const res = await axios.post(base.addUser, {
            username,
            email,
            password,
            userRole
        });
        return res.data;
    };
    return useMutation((credentials) => fetchUserRegister(credentials.username, credentials.email, credentials.password, credentials.userRole));
}

export function useUserEmailLogin(){
    const fetchEmailLogin = async (email, password,provider,identity) => {
        const res = await axios.post(base.userEmailLogin, {
            email,
            password,
            provider,
            identity
        });
        return res.data;
    };
    return useMutation((credentials) => fetchEmailLogin(credentials.email, credentials.password, credentials.provider, credentials.identity));
}
export function useSocialLogin() {
    const fetchSocialLogin = async (googleAccessToken, provider) => {
        const res = await axios.post(base.userEmailLogin, {
            googleAccessToken,
            provider
        });
        return res.data;
    };
    return useMutation((credentials) => fetchSocialLogin(credentials.googleAccessToken, credentials.provider));
}


export function useUserOtpRegister(){
    const fetchUserOtpRegister = async (phoneNumber) => {
        const res = await axios.post(base.otpRegister, {
            "mobile": phoneNumber,
        });
        return res.data;
    };
    return useMutation((credentials) => fetchUserOtpRegister(credentials.phoneNumber));
}
export function useUserOtpRegisterValidate(){
    const fetchUserOtpRegisterValidate = async (mobile,otp,userRole) => {
        const res = await axios.post(base.otpRegisterValidate, {
            mobile,
            otp,
            userRole
        });
        return res.data;
    };
    return useMutation((credentials) => fetchUserOtpRegisterValidate(credentials.mobile, credentials.otp, credentials.userRole));
}
export function useUserEmailRegisterValidate(token) {
    const fetchUserEmailRegisterValidate = async (token) => {
        const endpoint = `${base.emailRegisterValidate}/verifyEmail`;
        const res = await axios.get(endpoint, {
            params: {
                token: token
            }
        });
        return res.data;
    }

    return useQuery(['userEmailRegisterValidate', token], () => fetchUserEmailRegisterValidate(token));
}
export function useSetUserProfile(){
    const token = Cookies.get('token');
    const fetchSetUserProfile = async (gender, interestArea, email,birthday,nickname) => {
            if (!token) {
                alert('user not login');
            }
            const res = await axios.post(base.setUserProfile, {
                gender,
                interestArea,
                email,
                birthday,
                nickname

            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    };
    return useMutation((credentials) => fetchSetUserProfile(credentials.gender, credentials.interestArea, credentials.email, credentials.birthday,credentials.nickname));
}
export function useClickVerification(){
    const fetchClickVerification = async (email) => {
        console.log('useClickVerification',email);
        const res = await axios.post(base.clickVerification, {
            email,
        });
        return res.data;
    };
    return useMutation((credentials) => fetchClickVerification(credentials.email));
}