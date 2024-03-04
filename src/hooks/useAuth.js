import userInfoQueryStore from "../userStore.ts";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import APIClient from "../services/api-client.js";
import defaultAvatar from "../assets/post/user-profile-avatar.png";
import { useToast } from "@chakra-ui/react";
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

export function useAppleLogin() {
  const apiClient = new APIClient("/login/social");
  const fetchAppleSignIn = async (appleIdToken) => {
    const res = await apiClient.post({
      appleIdToken,
    });
    return res.data;
  }
  return useMutation((credentials) =>
    fetchAppleSignIn(credentials.appleIdToken)
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
// used to set user profile
export function useSetUserProfile() {
  const toast = useToast();
  const apiClient = new APIClient("/user/set_user_profile");
  const fetchSetUserProfile = async (
    birthday,
    gender,
    interested,
    nickname
  ) => {
    const res = await apiClient.post({
      birthday,
      gender,
      interested,
      nickname,
    });
    return res.data;
  };
  return useMutation(
    (credentials) =>
      fetchSetUserProfile(
        credentials.birthday,
        credentials.gender,
        credentials.interested,
        credentials.nickname
      ),
    {
      onSuccess: (data) => {
        if (data.code === 100) {
          toast({
            title: "Profile updated successfully.",
            description: data.msg,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Profile updated failed.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
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
  const setAvatar = userInfoQueryStore((s) => s.setAvatar);
  const setUsername = userInfoQueryStore((s) => s.setUsername);
  const setAccountType = userInfoQueryStore((s) => s.setAccountType);
  const setPostCount = userInfoQueryStore((s) => s.setPostCount);
  const setFollowerCount = userInfoQueryStore((s) => s.setFollowerCount);
  const setFollowingCount = userInfoQueryStore((s) => s.setFollowingCount);
  const setDescription = userInfoQueryStore((s) => s.setDescription);
  const togglePopup = userInfoQueryStore((s) => s.togglePopup);
  const removeToken = userInfoQueryStore((s) => s.removeToken);
  const setVerificationStatus = userInfoQueryStore(
    (s) => s.setVerificationStatus
  );

  const fetchGetUserInfo = async () => {
    const res = await apiClient.get();
    return res.data;
  };

  return useQuery(
    ["getUserInfo", userInfo.trigger, userInfo.token],
    fetchGetUserInfo,
    {
      retry: 1,
      onSuccess: (data) => {
        setUsername(data.data.nickname);
        setAccountType(data.data.accountType);
        setPostCount(data.data.postsNumber);
        setFollowerCount(data.data.follower);
        setFollowingCount(data.data.followings);
        setDescription(data.data.description);
        setAvatar(data.data.image || defaultAvatar);
        setVerificationStatus(data.data.status || 0);
      },
      onError: (error) => {
        localStorage.removeItem("token");
        removeToken();
        if (userInfo.popupState === false) {
          togglePopup(true, "accountType");
        }
      },
    }
  );
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
