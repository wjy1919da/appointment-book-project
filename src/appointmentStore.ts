import {create} from "zustand";
import jwt_decode from 'jwt-decode';

interface DecodedToken {
    sub: string;
    [key: string]: any;
}
/*
    1. open popup
    2. close popup
    3. open popup and stay in gender page
    4. open popup and stay in interest page
    5. open popup and stay in birthday page
    6. open popup and stay in sign up success page
    7. open popup and stay in verify email page
    8. open popup and stay in sign in page
    9. open popup and stay in sign up page
*/

interface appointInfo {
    token?: string;
    googleToken?: string;
    appointId?: string;
    email?: string;
    clinic?: string;
    string?:string;
    BusinessName?: string;
    username?: string;
    password?: string;
    website?:string;
    selectedInterests: Set<string>;
     // Used to control the register popup page and open/close
    popupState: 'closed'| 'mainSection' | 'appointmentDetail' | 'appointmentDescription' | 'EditAppointment' | 'finish';
}

interface appointInfoQuery {
    appointInfo: appointInfo;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setClinic: (clinic: string) => void;
    setStreet: (street: string) => void;
    setGoogleToken: (token: string) => void;
    setWebsite: (website: string) => void;
    setUsername: (username: string) => void;
    setBusinessName: (BusinessName: string) => void;
    setToken: (token: string) => void;
    setAppointId: (appointId: string) => void;
    removeToken: () => void;
    togglePopup: (open: boolean, initialState?:'mainSection' | 'appointmentDetail' | 'appointmentDescription' | 'EditAppointment' | 'finish') => void;
    switchPopupTab: (tab: 'mainSection' | 'appointmentDetail' | 'appointmentDescription' | 'EditAppointment' | 'finish') => void;
}

const AppInfoQueryStore = create<appointInfoQuery>((set) => ({
    appointInfo: {
        token:"",
        googleToken:"",
        appointId:"",
        email:"",
        clinic:"",
        string:"",
        BusinessName:"",
        username:"",
        password:"",
        website:"",
        selectedInterests: new Set<string>(),
        popupState: "closed"
    },
    setEmail: (email: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, email }
        }));
    },
    setPassword: (password: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, password }
        }));
    },
    setClinic: (clinic: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, clinic }
        }));
    },
    setGoogleToken: (token: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, googleToken: token }
        }));
    },
    setUsername: (username: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, username }
        }));
    },
    setStreet: (street: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, street }
        }));
    },
    setWebsite: (website: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, website }
        }));
    },
    setBusinessName: (BusinessName: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, BusinessName }
        }));
    },
    togglePopup: (open: boolean, initialState?:'mainSection' | 'appointmentDetail' | 'appointmentDescription' | 'EditAppointment' | 'finish') => {
        if (open) {
            set((store) => ({
                appointInfo: { ...store.appointInfo, popupState: initialState || 'mainSection' }
            }));
        } else {
            set((store) => ({
                appointInfo: { ...store.appointInfo, popupState: 'closed' }
            }));
        }
    },
    switchPopupTab: (tab: 'mainSection' | 'appointmentDetail' | 'appointmentDescription' | 'EditAppointment' | 'finish') => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, popupState: tab }
        }));
    },

    setAppointId: (appointId: string) => {
        set((store) => ({
            appointInfo: { ...store.appointInfo, appointId }
        }));
    },
    setToken: (token: string) => {
        try {
            const decodedToken: DecodedToken = jwt_decode(token);
            const appointId = decodedToken.sub;
            set((store) => ({
                appointInfo: { ...store.appointInfo, token, appointId }
            }));
        } catch (error) {
            console.error("Failed to decode the token", error);
        }
    },
    removeToken: () => {
        try {
            set((store) => ({
                appointInfo: { ...store.appointInfo, token: "", appointId: "" }
            }));
        } catch (error) {
            console.error("Failed to remove the token", error);
        }
    }
}));
export default AppInfoQueryStore;