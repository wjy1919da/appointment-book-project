import { useMutation } from 'react-query';
//import doctorInfoQueryStore from '../doctorStore.ts';  // Assuming this is the correct path
import APIClient from '../services/api-client.js';
import Cookies from 'js-cookie';

export function useDoctorAddProfile() {
    const token = Cookies.get('token');
    const sendProfileToServer = async (doctorData) => {
        const apiClient = new APIClient('/user_action/set_doctor_profile', token);
        const res = await apiClient.post(doctorData);
        return res.data;
    };
    return useMutation((doctorData) => sendProfileToServer(doctorData));
}