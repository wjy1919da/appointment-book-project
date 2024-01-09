import './user-appointment-main.style.scss'
import arrowLeft from '../../assets/user/arrow-left.png'
import UserAppoinmentSection1 from './user-appointment-section1';
import AppInfoQueryStore from '../../appointmentStore.ts'
import { useNavigate } from 'react-router-dom';
const UserAppointmentMain = () => {
    const appInfo = AppInfoQueryStore(state => state.appointInfo);
    const switchPopupTab = AppInfoQueryStore(state => state.switchPopupTab);
    const navigate = useNavigate();
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);

    const navigateToPreviousStep = () => {
        const steps = ['mainSection', 'appointmentDetail', 'appointmentDescription', 'EditAppointment', 'finish'];
        const currentIndex = steps.indexOf(appInfo.popupState);
        const previousStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
    
        if (previousStep) {
            togglePopup(true, previousStep);
        } else {
            // If there is no previous step (i.e., current step is 'mainSection'), navigate to '/userProfile'
            navigate('/userProfile');
        }
    };
    return (
        <div className='user-appointment-main-container'>
            {/* <div className='user-appointment-right-background'></div> */}
            <div className='user-appointment-body-container'>
                <div className='user-appointment-top-row'>
                    {/* <div className='user-appointment-previous-step-arrow' onClick={navigateToPreviousStep}>
                        <img src={arrowLeft} className='user-appointment-go-back-arrow' />
                    </div> */}
                    <div className='user-appointment-title-text-container'>
                        <h3 className='user-appointment-title-text'>My Appointments</h3>
                    </div>
                </div>
                <div className='user-appointment-content-container'>
                    <UserAppoinmentSection1/>
                </div>
            </div>
        </div>
    );   
};

export default UserAppointmentMain;