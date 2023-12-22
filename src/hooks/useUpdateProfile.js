import userInfoQueryStore from "../userStore.ts";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import APIClient from "../services/api-client.js";

export function useSetDoctorProfile() {
    const apiClient = new APIClient("/user_action/set_doctor_profile");
    //const token = localStorage.getItem('token');
    const fetchSetUserProfile = async (
      address,
      licenses,
      mechName,
      mechTel,
      miaoshu,
      mobile,
      nickname,
      password

    ) => {
      // if (!token) {
      //     alert('user not login');
      // }
      const res = await apiClient.post({
        address,
        licenses,
        mechName,
        mechTel,
        miaoshu,
        mobile,
        nickname,
        password
      });
      return res.data;
    };
    return useMutation((credentials) =>
      fetchSetUserProfile(
        credentials.address,
        credentials.licenses,
        credentials.mechName,
        credentials.mechTel,
        credentials.miaoshu,
        credentials.mobile,
        credentials.nickname,
        credentials.password
      ),
      {
        // Success callback
        onSuccess: (data) => {
            console.log('Response from server:', data);
        },
        // Error callback
        onError: (error) => {
            console.error('Error sending data:', error);
        }
      }
    );
  }