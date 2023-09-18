import userInfoQueryStore from '../userStore.ts';
//src/userStore.ts
import axios from 'axios';
import { useQuery } from "react-query";

const base = {
    userOtpLogin: 'http://localhost:8080/login/phone/validate-otp',
    userEmailLogin: 'http://localhost:8080/login/user',
    userSendOtp: 'http://localhost:8080/login/phone/send-otp',
    addUser: 'http://localhost:8080/register/email',
    otpRegister: 'http://localhost:8080/register/phone/send-otp',
    otpRegisterValidate: 'http://localhost:8080/register/phone/validate-otp',
    emailRegisterValidate: 'http://localhost:8080/register/verifyEmail',
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
    const userInfo = userInfoQueryStore(s => s.userInfo);
    const fetchUserRegister = async () => {
        const res = await axios.post(base.addUser, {
            "email": userInfo.email,
            "password": userInfo.password,
        });
        return res.data;
    };
    return useQuery(['userRegister', userInfo.email, userInfo.password], fetchUserRegister, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}
export function useUserEmailLogin(){
    const userInfo = userInfoQueryStore(s => s.userInfo);
    const fetchEmailLogin = async () => {
        const res = await axios.post(base.userEmailLogin, {
            "email": userInfo.email,
            "password": userInfo.password,
        });
        return res.data;
    };
    return useQuery(['emailLogin', userInfo.email, userInfo.password], fetchEmailLogin, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}
export function useSendOpt(){
    const userInfo = userInfoQueryStore(s => s.userInfo);
    const fetchSendOpt = async () => {
        const res = await axios.post(base.userSendOtp, {
            "mobile": userInfo.mobile,
        });
        return res.data;
    };
    return useQuery(['sendOpt', userInfo.mobile], fetchSendOpt, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}
// export function useUserFacebookLogin(){

// }
export function useUserOtpRegister(){
    const userInfo = userInfoQueryStore(s => s.userInfo);
    const fetchUserOtpRegister = async () => {
        const res = await axios.post(base.otpRegister, {
            "mobile": userInfo.mobile,
        });
        return res.data;
    };
    return useQuery(['userOtpRegister', userInfo.mobile], fetchUserOtpRegister, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}
export function useUserOtpRegisterValidate(){
    const userInfo = userInfoQueryStore(s => s.userInfo);
    const fetchUserOtpRegisterValidate = async () => {
        const res = await axios.post(base.otpRegisterValidate, {
            "mobile": userInfo.mobile,
            "otp": userInfo.otp,
        });
        return res.data;
    };
    return useQuery(['userOtpRegisterValidate', userInfo.mobile, userInfo.otp], fetchUserOtpRegisterValidate, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}
export function useUserEmailRegisterValidate(){
    const fetchUserEmailRegisterValidate = async () => {
        const res = await axios.get(base.emailRegisterValidate);
        return res.data;
    }
    return useQuery(['userEmailRegisterValidate'], fetchUserEmailRegisterValidate);
}