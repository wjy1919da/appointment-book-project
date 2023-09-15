import create from "zustand";

interface userInfo {
    mobile?: string;
    otp?: string;
    email?: string;
    password?: string;
    following?: number;
    followers?: number;
}
interface userInfoQuery {
    userInfo: userInfo;
    setMobile: (mobile: string) => void;
    setOtp: (otp: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setFollowing: (following: number) => void;
    setFollowers: (followers: number) => void;
}

const userInfoQueryStore = create<userInfoQuery>((set) => ({
    userInfo: { mobile: "", otp: "", email: "", password: "", following: 0, followers: 0 },
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
        set((store) => ({ userInfo: { ...store.userInfo, followers } }))
}));

export default userInfoQueryStore;
