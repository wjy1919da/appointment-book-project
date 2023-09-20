import create from "zustand";
import jwt_decode from 'jwt-decode';

interface DecodedToken {
    sub: string;
    [key: string]: any;
}

interface userInfo {
    token?: string;
    userId?: string;
}

interface userInfoQuery {
    userInfo: userInfo;
    setToken: (token: string) => void;
    setUserId: (userId: string) => void;
    removeToken: ()=>void;
}

const userInfoQueryStore = create<userInfoQuery>((set) => ({
    userInfo: {
        token: "",
        userId: ""
    },
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