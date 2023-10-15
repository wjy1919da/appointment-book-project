import './user-appointment-main.style.scss'
import arrowLeft from '../../assets/user/arrow-left.png'
import UserAppoinmentSection1 from './user-appointment-section1';
const UserAppointmentMain = () => {
    return (
        <div className='user-appointment-main-container'>
            <div className='user-appointment-right-background'>
                
            </div>
            <div className='user-appointment-previous-step-arrow'>
                <img src = {arrowLeft} style={{width:'20px', height:'20px'}}></img>
                <span>My Appointment</span>   
            </div>
            <div className='user-appointment-content-container'>
                <UserAppoinmentSection1/>
            </div>
        </div>
    );   
};

export default UserAppointmentMain;