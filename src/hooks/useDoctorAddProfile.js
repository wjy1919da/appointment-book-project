import { useMutation } from 'react-query';
import APIClient from '../services/api-client.js';
import Cookies from 'js-cookie';

export function useDoctorAddProfile() {
    const token = localStorage.getItem('token');
    const sendProfileToServer = async (doctorData) => {
        const apiClient = new APIClient('/user_action/set_doctor_profile', token);
        const res = await apiClient.post(doctorData);
        return res.data;
    };
    return useMutation((doctorData) => sendProfileToServer(doctorData));
}