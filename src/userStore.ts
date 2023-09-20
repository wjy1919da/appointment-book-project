import create from "zustand";
import jwt_decode from 'jwt-decode';

interface DecodedToken {
    sub: string;
    [key: string]: any;
}

interface userInfo {
    token?: string;
    googleToken?: string;
    userId?: string;
    gender?: string;
    selectedInterests: Set<string>;
}

interface userInfoQuery {
    userInfo: userInfo;
    setGender: (gender: string) => void;
    setInterested: (interest: string) => void;
    setGoogleToken: (token: string) => void;
    setToken: (token: string) => void;
    setUserId: (userId: string) => void;
    removeToken: () => void;
}

const userInfoQueryStore = create<userInfoQuery>((set) => ({
    userInfo: {
        token: "",
        userId: "",
        gender: "",
        googleToken: "",
        selectedInterests: new Set<string>()
    },
    setGender: (gender: string) => {
        set((store) => ({
            userInfo: { ...store.userInfo, gender }
        }));
    },
    setGoogleToken: (token: string) => {
        set((store) => ({
            userInfo: { ...store.userInfo, googleToken: token }
        }));
    },
    setInterested: (interest: string) => {
        set((store) => {
            const newInterests = new Set(store.userInfo.selectedInterests);
            if (newInterests.has(interest)) {
                newInterests.delete(interest);
            } else {
                newInterests.add(interest);
            }
            return {
                userInfo: { 
                    ...store.userInfo, 
                    selectedInterests: newInterests
                }
            };
        });
    },
    setUserId: (userId: string) => {
        set((store) => ({
            userInfo: { ...store.userInfo, userId }
        }));
    },
    setToken: (token: string) => {
        try {
            const decodedToken: DecodedToken = jwt_decode(token);
            const userId = decodedToken.sub;
            set((store) => ({
                userInfo: { ...store.userInfo, token, userId }
            }));
        } catch (error) {
            console.error("Failed to decode the token", error);
        }
    },
    removeToken: () => {
        try {
            set((store) => ({
                userInfo: { ...store.userInfo, token: "", userId: "" }
            }));
        } catch (error) {
            console.error("Failed to remove the token", error);
        }
    }
}));
export default userInfoQueryStore;

