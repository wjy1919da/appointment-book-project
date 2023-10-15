import create from "zustand";
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

interface doctorInfo {
    token?: string;
    googleToken?: string;
    doctorId?: string;
    email?: string;
    clinic?: string;
    string?:string;
    BusinessName?: string;
    username?: string;
    password?: string;
    website?:string;
    selectedInterests: Set<string>;
     // Used to control the register popup page and open/close
    popupState: 'closed'| 'personal Information' | 'verification'|'finish';
}

interface doctorInfoQuery {
    doctorInfo: doctorInfo;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setClinic: (clinic: string) => void;
    setStreet: (street: string) => void;
    setGoogleToken: (token: string) => void;
    setWebsite: (website: string) => void;
    setUsername: (username: string) => void;
    setBusinessName: (BusinessName: string) => void;
    setToken: (token: string) => void;
    setDoctorId: (doctorId: string) => void;
    removeToken: () => void;
    togglePopup: (open: boolean, initialState?:'personal Information' | 'verification'|'finish') => void;
    switchPopupTab: (tab: 'personal Information' | 'verification'|'finish') => void;
}

const doctorInfoQueryStore = create<doctorInfoQuery>((set) => ({
    doctorInfo: {
        token:"",
        googleToken:"",
        doctorId:"",
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
            doctorInfo: { ...store.doctorInfo, email }
        }));
    },
    setPassword: (password: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, password }
        }));
    },
    setClinic: (clinic: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, clinic }
        }));
    },
    setGoogleToken: (token: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, googleToken: token }
        }));
    },
    setUsername: (username: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, username }
        }));
    },
    setStreet: (street: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, street }
        }));
    },
    setWebsite: (website: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, website }
        }));
    },
    setBusinessName: (BusinessName: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, BusinessName }
        }));
    },
    togglePopup: (open: boolean, initialState?:'personal Information' | 'verification'|'finish') => {
        if (open) {
            set((store) => ({
                doctorInfo: { ...store.doctorInfo, popupState: initialState || 'personal Information' }
            }));
        } else {
            set((store) => ({
                doctorInfo: { ...store.doctorInfo, popupState: 'closed' }
            }));
        }
    },
    switchPopupTab: (tab: 'personal Information' | 'verification'|'finish') => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, popupState: tab }
        }));
    },

    setDoctorId: (doctorId: string) => {
        set((store) => ({
            doctorInfo: { ...store.doctorInfo, doctorId }
        }));
    },
    setToken: (token: string) => {
        try {
            const decodedToken: DecodedToken = jwt_decode(token);
            const doctorId = decodedToken.sub;
            set((store) => ({
                doctorInfo: { ...store.doctorInfo, token, doctorId }
            }));
        } catch (error) {
            console.error("Failed to decode the token", error);
        }
    },
    removeToken: () => {
        try {
            set((store) => ({
                doctorInfo: { ...store.doctorInfo, token: "", doctorId: "" }
            }));
        } catch (error) {
            console.error("Failed to remove the token", error);
        }
    }
}));
export default doctorInfoQueryStore;
