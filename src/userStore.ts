import create from "zustand";

interface userInfo {
    mobile?: string;
    otp?: string;
    email?: string;
    password?: string;
}

interface userInfoStore {
    userInfo: userInfo;
    setMobile: (mobile: string) => void;
    setOtp: (otp: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

const userInfoStore = create<userInfoStore>((set) => ({
    userInfo: { mobile: "", otp: "", email: "", password: "" },
    setMobile: (mobile) =>
        set((store) => ({ userInfo: { ...store.userInfo, mobile } })),
    setOtp: (otp) =>
        set((store) => ({ userInfo: { ...store.userInfo, otp } })),
    setEmail: (email) =>
        set((store) => ({ userInfo: { ...store.userInfo, email } })),
    setPassword: (password) =>
        set((store) => ({ userInfo: { ...store.userInfo, password } })),
}));

export default userInfoStore;
