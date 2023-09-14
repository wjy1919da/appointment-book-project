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