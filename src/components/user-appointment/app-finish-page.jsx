import DoctorProfile from '../../assets/doctor/doctor-profile-image.png'
import './app-finish-page.styles.scss';
import './appointment-detail.styles.scss';
import { useNavigate } from 'react-router-dom';
const AppointmentFinish = ({appointmentObj}) => {
    const navigate = useNavigate();
    return (
        <div className='app-finish-main-container'>
            <div className='app-finish-title'>
                <span className='app-finish-title-text'>Thank You for Your Update!</span>
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
            <div className='app-finish-button'>
                <button className='app-cancel-or-change-button' onClick={() => navigate('/')}>Home</button>
            </div>
            
        </div>
    );   
};

export default AppointmentFinish;