import { create } from "zustand";
import jwt_decode from "jwt-decode";

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

interface userInfo {
  token?: string;
  googleToken?: string;
  userId?: string;
  email?: string;
  phoneNumber?: string;
  gender?: number | null;
  accountType: number | null;
  birthday?: string | null;
  username?: string;
  password?: string;
  selectedInterests: Set<string> | null;
  profile?: string;
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
  description?: string;
  avatar?: string;
  verificationStatus?: number;
  trigger?: number;
  // Used to control the register popup page and open/close
  popupState:
    | "closed"
    | "signUp"
    | "gender"
    | "interest"
    | "birthday"
    | "success"
    | "verifyEmail"
    | "login"
    | "sendVerifyEmail"
    | "phoneNumberLogin"
    | "doctorProfile"
    | "doctorFinish"
    | "doctorSuccess";
}

interface userInfoQuery {
  userInfo: userInfo;
  setEmail: (email: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setGender: (gender: number) => void;
  setAccountType: (accountType: number) => void;
  setInterested: (interest: string) => void;
  setGoogleToken: (token: string) => void;
  setUsername: (username: string) => void;
  setBirthday: (birthday: string) => void;
  setToken: (token: string) => void;
  setUserId: (userId: string) => void;
  removeToken: () => void;
  // setProfile: (profile: string) => void;
  setPostCount: (postCount: number) => void;
  setFollowerCount: (followerCount: number) => void;
  setFollowingCount: (followingCount: number) => void;
  setDescription: (description: string) => void;
  setAvatar: (avatar: string) => void;

  setVerificationStatus: (verificationStatus: number) => void;
  refreshProfile: (trigger: number) => void;
  togglePopup: (
    open: boolean,
    initialState?:
      | "gender"
      | "interest"
      | "birthday"
      | "success"
      | "verifyEmail"
      | "login"
      | "sendVerifyEmail"
      | "phoneNumberLogin"
      | "doctorProfile"
      | "doctorFinish"
      | "doctorSuccess"
  ) => void;
  switchPopupTab: (
    tab:
      | "gender"
      | "interest"
      | "birthday"
      | "success"
      | "verifyEmail"
      | "login"
      | "sendVerifyEmail"
      | "phoneNumberLogin"
      | "doctorProfile"
      | "doctorFinish"
      | "doctorSuccess"
  ) => void;
}

const userInfoQueryStore = create<userInfoQuery>((set) => ({
  userInfo: {
    token: "",
    userId: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: 0,
    accountType: null,
    birthday: "",
    googleToken: "",
    selectedInterests: new Set<string>(),
    // profile: "",
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
    description: "",
    avatar: "",
    verificationStatus: 0,
    // Initial state is closed
    popupState: "closed",
    trigger: 0,
  },

  setEmail: (email: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, email },
    }));
  },
  setPhoneNumber: (phoneNumber: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, phoneNumber },
    }));
  },
  setPassword: (password: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, password },
    }));
  },
  setGender: (gender: number) => {
    set((store) => ({
      userInfo: { ...store.userInfo, gender },
    }));
  },
  setAccountType: (accountType: number) => {
    set((store) => ({
      userInfo: { ...store.userInfo, accountType },
    }));
  },
  setGoogleToken: (token: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, googleToken: token },
    }));
  },
  setUsername: (username: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, username },
    }));
  },
  setBirthday: (birthday: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, birthday },
    }));
  },

  setPostCount: (postCount: number) => {
    set((store) => ({
      userInfo: { ...store.userInfo, postCount },
    }));
  },
  setFollowerCount: (followerCount: number) => {
    set((store) => ({
      userInfo: { ...store.userInfo, followerCount },
    }));
  },
  setFollowingCount: (followingCount: number) => {
    set((store) => ({
      userInfo: { ...store.userInfo, followingCount },
    }));
  },
  setDescription: (description: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, description },
    }));
  },
  setAvatar: (avatar: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, avatar },
    }));
  },
  refreshProfile(trigger) {
    set((store) => ({
      userInfo: { ...store.userInfo, trigger },
    }));
  },
  setVerificationStatus: (verificationStatus: number) => {
    set((store) => ({
      userInfo: { ...store.userInfo, verificationStatus },
    }));
  },

  togglePopup: (
    open: boolean,
    initialState?:
      | "gender"
      | "interest"
      | "birthday"
      | "success"
      | "verifyEmail"
      | "login"
      | "sendVerifyEmail"
      | "phoneNumberLogin"
      | "doctorProfile"
      | "doctorFinish"
      | "doctorSuccess"
  ) => {
    //console.log("togglePopup", open, initialState);
    if (open) {
      set((store) => ({
        userInfo: { ...store.userInfo, popupState: initialState || "gender" },
      }));
    } else {
      set((store) => ({
        userInfo: { ...store.userInfo, popupState: "closed" },
      }));
    }
  },
  switchPopupTab: (
    tab:
      | "gender"
      | "interest"
      | "birthday"
      | "success"
      | "verifyEmail"
      | "login"
      | "sendVerifyEmail"
      | "phoneNumberLogin"
      | "doctorProfile"
      | "doctorFinish"
      | "doctorSuccess"
  ) => {
    set((store) => ({
      userInfo: { ...store.userInfo, popupState: tab },
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
          selectedInterests: newInterests,
        },
      };
    });
  },
  setUserId: (userId: string) => {
    set((store) => ({
      userInfo: { ...store.userInfo, userId },
    }));
  },
  setToken: (token: string) => {
    try {
      const decodedToken: DecodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      set((store) => ({
        userInfo: { ...store.userInfo, token, userId },
      }));
    } catch (error) {
      console.error("Failed to decode the token", error);
    }
  },
  removeToken: () => {
    try {
      set((store) => ({
        userInfo: { ...store.userInfo, token: "", userId: "" },
      }));
    } catch (error) {
      console.error("Failed to remove the token", error);
    }
  },
}));
export default userInfoQueryStore;
