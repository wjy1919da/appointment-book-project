import axios from 'axios';
import { useMutation } from 'react-query';
import doctorInfoQueryStore from '../doctorStore.ts';  // Assuming this is the correct path

export function useDoctorAddProfile() {

    const addDoctorProfileToStore = doctorInfoQueryStore(state => state.addDoctorProfile);  // Assuming you have an addDoctorProfile action in your store

    const sendProfileToServer = async (doctorData) => {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTciLCJleHAiOjE2OTYxMjE2MDcsImlhdCI6MTY5NjAzNTIwN30.W0w8HIyrtYUknJyeGC-ijTcEOZnQCtFbKPFmclO-s6I";  // Replace with your token or get it dynamically
        const res = await axios.post("http://localhost:8080/user_action/set_doctor_profile", doctorData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Response from server:", res.data);
        return res.data;
    };

    return useMutation(
        (newDoctorData) => sendProfileToServer(newDoctorData),
        {
            onSuccess: (data) => {
                console.log("Doctor profile added successfully:", data); 
                addDoctorProfileToStore(data);
            },
            onError: (error) => {
                console.log("Error adding doctor profile:", error);
                if (error.response && error.response.data) {
                    console.log("Server response:", error.response.data);
                }
            }
        }
    );
}