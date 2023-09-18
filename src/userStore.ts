import create from "zustand";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
    sub: string;
    [key: string]: any;
}

interface userInfo {
    mobile?: string;
    otp?: string;
    email?: string;
    password?: string;
    following?: number;
    followers?: number;
    token?: string;
    userId?: string;
}

interface userInfoQuery {
    userInfo: userInfo;
    setMobile: (mobile: string) => void;
    setOtp: (otp: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setFollowing: (following: number) => void;
    setFollowers: (followers: number) => void;
    setToken: (token: string) => void;
    setUserId: (userId: string) => void;
    removeToken: ()=>void;
}
// const initialToken = Cookies.get('token') || "";
// let initialUserId = "";
// if (initialToken) {
//     console.log("initialToken", initialToken);
//     try {
//         const decodedToken: DecodedToken = jwt_decode(initialToken);
//         initialUserId = decodedToken.sub || "";
//     } catch (error) {
//         console.error("Failed to decode the initial token", error);
//     }
// }

const userInfoQueryStore = create<userInfoQuery>((set) => ({
    userInfo: {
        mobile: "",
        otp: "",
        email: "",
        password: "",
        following: 0,
        followers: 0,
        token: "",
        userId: ""
    },
    setMobile: (mobile) =>
        set((store) => ({ userInfo: { ...store.userInfo, mobile } })),
    setOtp: (otp) =>
        set((store) => ({ userInfo: { ...store.userInfo, otp } })),
    setEmail: (email) =>
        set((store) => ({ userInfo: { ...store.userInfo, email } })),
    setPassword: (password) =>
        set((store) => ({ userInfo: { ...store.userInfo, password } })),
    setFollowing: (following) =>
        set((store) => ({ userInfo: { ...store.userInfo, following } })),
    setFollowers: (followers) =>
        set((store) => ({ userInfo: { ...store.userInfo, followers } })),
    setUserId: (userId: string) =>
        set((store) => ({ userInfo: { ...store.userInfo, userId } })),
    setToken: (token) => {
        try {            
            const decodedToken: DecodedToken = jwt_decode(token);
            const userId = decodedToken.sub;
            set((store) => ({
                userInfo: { ...store.userInfo, token }
            }));
            set((store) => ({
                userInfo: { ...store.userInfo, userId }
            }));
        } catch (error) {
            console.error("Failed to decode the token", error);
        }
    },
    removeToken: ()=>{
        try{
            set((store) => ({
                userInfo: { ...store.userInfo, token: "" }
            }));
            set((store) => ({
                userInfo: { ...store.userInfo, userId: "" }
            }));
        }catch(error){
            console.error("Failed to remove the token", error);
        }
    }
}));

export default userInfoQueryStore;