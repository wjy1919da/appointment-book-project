import DoctorProfile from '../../assets/doctor/doctor-profile-image.png'
import './app-finish-page.styles.scss';
import './appointment-detail.styles.scss';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/user/arrow-left.png';
const AppointmentFinish = ({appointmentObj}) => {
    const navigate = useNavigate();
    return (
        <div className='app-finish-main-container'>
            <div className='app-finish-title-container'>
                <h2 className='app-finish-header-text'>Reschedule Pending</h2>
                <p className='app-finish-title-text'>Please allow the doctor some time to confirm your changes.</p>
                <p className='app-finish-title-text'>We will notify you once it is confirmed. We appreciate your time!</p>
            </div>
            <div className='app-finish-doctor-profile'>
                <div className='app-finish-doctor-avatar-container'>
                    <img src= {DoctorProfile} className='app-finish-doctor-avatar' alt='doctor profile' />
                </div>
                <div className='app-finish-text-list'>
                    <span className='app-finish-text-name' >Charlotte</span>
                    <span className='app-finish-text-date' >Date : 16 June 2023</span>
                    <span className='app-finish-text-time' >Time : 3:00 - 3:30 PM EST</span>
                </div>
            </div>
            <div className='app-finish-buttons-container'>
            <button className='app-finish-home-button app-finish-button' onClick={() => navigate('/')}>Home</button>
                <button className='app-finish-appointments-button app-finish-button' onClick={() => window.location.reload()}>My Appointments <img className='app-finish-button-arrow' src={arrowLeft} alt='arrow' /></button>
            </div>
            
        </div>
    );   
};

export default AppointmentFinish;