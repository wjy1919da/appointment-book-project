import { useMutation } from 'react-query';
import APIClient from '../services/api-client.js';
export function useDoctorAddProfile() {
    const sendProfileToServer = async (doctorData) => {
        const apiClient = new APIClient('/user_action/set_doctor_profile');
        const res = await apiClient.post(doctorData);
        return res.data;
    };
    return useMutation((doctorData) => sendProfileToServer(doctorData));
}