import userInfoStore from '../stores/userInfoStore';
import axios from 'axios';
import { useQuery } from "react-query";

const base = {
    userLoginUrl: 'http://localhost:8080/login/validate-otp',
};
export function useUserLogin() {
    const userInfo = userInfoStore(s => s.userInfo);
    const fetchUserLogin = async () => {
        const res = await axios.post(base.userLoginUrl, {
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
    const userInfo = userInfoStore(s => s.userInfo);
    const fetchUserRegister = async () => {
        const res = await axios.post(base.userLoginUrl, {
            "email": userInfo.email,
            "password": userInfo.password,
        });
        return res.data;
    };
    return useQuery(['userRegister', userInfo.email, userInfo.password], fetchUserRegister, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}