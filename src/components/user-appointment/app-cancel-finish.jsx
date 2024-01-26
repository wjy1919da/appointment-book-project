import DoctorProfile from '../../assets/doctor/doctor-profile-image.png'
import './app-cancel-finish.scss';
// import './appointment-detail.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AppInfoQueryStore from '../../appointmentStore.ts'
import arrowLeft from '../../assets/user/arrow-left.png';
// import ChakraUserAppointmentModal from '../chakra-modal/chakra-user-appointment-modal';
const AppointmentCancelFinish = ({appointmentObj}) => {
    const navigate = useNavigate();
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const cancelAppointmentCallback = () => {
    //     console.log('Trying to cancel the appointment!');
    //     setIsModalOpen(false);
    // }
    // const dontCancelAppointmentCallback = () => {
    //     togglePopup(true,'mainSection');
    //     setIsModalOpen(false);
    // }
    return (
        <div className='app-cancel-finish-main-container'>
            <div className='app-cancel-title-container'>
                <h2 className='app-cancel-title-text app-cancel-finish-title-text'>Your Appointment Cancelled</h2>
                <p className='app-finish-title-text'>Please be aware that upon cancellation, we will initiate the refund process.</p>
                <p className='app-finish-title-text'>The refunded amount will be credited to your account within 7 days after the doctor confirms the cancellation.</p>
                <p className='app-finish-title-text'>If there is no confirmation from the doctor within 10 days, the refund will be automatically processed to your account.</p>
            </div>
            {/* <div className='app-finish-doctor-profile'>
                <div className='app-finish-doctor-avatar-container'>
                    <img src= {DoctorProfile} className='app-finish-doctor-avatar' alt='doctor profile' />
                </div>
                <div className='app-finish-text-list'>
                    <span className='app-finish-text-name' >Charlotte</span>
                    <span className='app-finish-text-date' >Date : 16 June 2023</span>
                    <span className='app-finish-text-time' >Time : 3:00 - 3:30 PM EST</span>
                </div>
            </div>
            <div className='app-cancel-subtext-container'>
                <p className='app-finish-subtext'>Please be aware that upon cancellation, we will initiate the refund process. </p>
                <p className='app-finish-subtext'>The refunded amount will be credited to your account within 7 days after the doctor confirms the cancellation. </p>
                <p className='app-finish-subtext'>If there is no confirmation from the doctor within 10 days, the refund will be automatically processed to your account. </p>
            </div> */}
            <div className='app-finish-buttons-container'>
                <button className='app-finish-home-button app-finish-button' onClick={() => navigate('/')} >Home</button>
                <button className='app-finish-appointments-button app-finish-button' onClick={() => togglePopup(true,'mainSection')}>My Appointments</button>
            </div>
            
        </div>
    );   
};

export default AppointmentCancelFinish;