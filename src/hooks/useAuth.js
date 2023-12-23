import userInfoQueryStore from "../userStore.ts";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import APIClient from "../services/api-client.js";

export function useUserOptLogin() {
  const apiClient = new APIClient("/login/phone/validate-otp");
  const fetchUserOtpRegisterValidate = async (mobile, otp, userRole) => {
    const res = await apiClient.post({
      mobile,
      otp,
      userRole,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchUserOtpRegisterValidate(
      credentials.mobile,
      credentials.otp,
      credentials.userRole
    )
  );
}

export function useUserRegister() {
  const apiClient = new APIClient("/register/email");
  const fetchUserRegister = async (email, password, userRole) => {
    const res = await apiClient.post({
      email,
      password,
      userRole,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchUserRegister(
      credentials.email,
      credentials.password,
      credentials.userRole
    )
  );
}
export async function retrieveUserFollowList() {
  const apiClient = new APIClient("/user/follows");
  const fetchAllUsersWeFollow = async () => {
    try {
      const res = await apiClient.post({
        currentPage: 0,
        pageSize: 100,
      });
      const idArray = [];
      let myObjectArray = res?.data?.data;
      myObjectArray.forEach((followedUser) => idArray.push(followedUser.id));
      return idArray;
    } catch (err) {
      console.log("Error retrieving all followed users: ", err);
    }
  };
  const followRes = await fetchAllUsersWeFollow();
  return followRes;
}
export function useUserEmailLogin() {
  const apiClient = new APIClient("/login/user");
  const fetchEmailLogin = async (email, password, provider, userRole) => {
    return apiClient
      .post({
        email,
        password,
        provider,
        userRole,
      })
      .then((res) => res.data);
  };
  return useMutation((credentials) =>
    fetchEmailLogin(
      credentials.email,
      credentials.password,
      credentials.provider,
      credentials.userRole
    )
  );
}
export function useSocialLogin() {
  const apiClient = new APIClient("/login/social");
  const fetchSocialLogin = async (googleAccessToken, provider) => {
    const res = await apiClient.post({
      googleAccessToken,
      provider,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchSocialLogin(credentials.googleAccessToken, credentials.provider)
  );
}

export function useUserOtpRegister() {
  const apiClient = new APIClient("/register/phone/send-otp");
  const fetchUserOtpRegister = async (phoneNumber) => {
    const res = await apiClient.post({
      mobile: phoneNumber,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchUserOtpRegister(credentials.phoneNumber)
  );
}
export function useUserOtpRegisterValidate() {
  const apiClient = new APIClient("/register/phone/validate-otp");
  const fetchUserOtpRegisterValidate = async (mobile, otp, userRole) => {
    const res = await apiClient.post({
      mobile,
      otp,
      userRole,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchUserOtpRegisterValidate(
      credentials.mobile,
      credentials.otp,
      credentials.userRole
    )
  );
}
export function useUserEmailRegisterValidate(token) {
  const apiClient = new APIClient("/register/verifyEmail");
  const fetchUserEmailRegisterValidate = async ({ queryKey }) => {
    const [, token] = queryKey;
    const res = await apiClient.get({ token });
    return res.data;
  };
  return useQuery(["userEmailRegisterValidate", token], (token) =>
    fetchUserEmailRegisterValidate(token)
  );
}
export function useSetUserProfile() {
  const apiClient = new APIClient("/user/set_user_profile");
  //const token = localStorage.getItem('token');
  const fetchSetUserProfile = async (
    gender,
    interestArea,
    email,
    birthday,
    nickname
  ) => {
    // if (!token) {
    //     alert('user not login');
    // }
    const res = await apiClient.post({
      gender,
      interestArea,
      email,
      birthday,
      nickname,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchSetUserProfile(
      credentials.gender,
      credentials.interestArea,
      credentials.email,
      credentials.birthday,
      credentials.nickname
    )
  );
}
export function useClickVerification() {
  const apiClient = new APIClient("/register/clickVerification");
  const fetchClickVerification = async (email, userRole) => {
    const res = await apiClient.post({
      email,
      userRole,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchClickVerification(credentials.email, credentials.userRole)
  );
}
export function useDoctorLogin() {
  const apiClient = new APIClient("/login/doctor");
  const fetchDoctorLogin = async (email, password, provider, userRole) => {
    const res = await apiClient.post({
      email,
      password,
      provider,
      userRole,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchDoctorLogin(
      credentials.email,
      credentials.password,
      credentials.provider,
      credentials.userRole
    )
  );
}

export function useGetUserInfo() {
  const apiClient = new APIClient("/user/fetch_user_profile");
  const userInfo = userInfoQueryStore((s) => s.userInfo);

  const fetchGetUserInfo = async () => {
    const res = await apiClient.get();
    return res.data;
  };

  return useQuery(["getUserInfo", userInfo.token], fetchGetUserInfo, {
    retry: 1,
  });
}

export function useGetDoctorInfo() {
  const userInfo = userInfoQueryStore((s) => s.userInfo);
  const apiClient = new APIClient("/user_action/doctor_profile");

  const fetchGetDoctorInfo = async () => {
    const res = await apiClient.get(userInfo.userId);
    return res.data;
  };

  return useQuery(["getDoctorInfo", userInfo.token], fetchGetDoctorInfo);
}
