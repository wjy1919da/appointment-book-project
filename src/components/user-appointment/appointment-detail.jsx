import './appointment-detail.styles.scss'
import { Link } from 'react-router-dom';
import AppInfoQueryStore from '../../appointmentStore.ts'
import doctorAvatar from '../../assets/user/doctor-profile-image.png'
import locationIcon from '../../assets/user/locationIcon.png'
import badgeIcon from '../../assets/user/badgeIcon.png'
import glassesIcon from '../../assets/user/glassesIcon.png'
const AppointmentDetail = ({appointmentObj}) => {
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    return (
        <div className='appointment-detail-main-container'>
            <div className='appointment-top-info-container'>
                <div className='app-doctor-info-section'>
                    <div className='app-doctor-avatar'>
                        <img src ={doctorAvatar} ></img>
                    </div>
                    <div className='app-doctor-detail'>
                        <div className='app-doctor-detail-combin'>
                            <div className='app-doctor-detail-icon-container'>
                                <img src ={locationIcon} alt='location' className='app-doctor-detail-icon' />
                            </div>
                            <span className='app-doctor-detail-text'>City, State</span>
                        </div>
                        <span className='app-doctor-name' >Dr.Name Name</span>
                        <div className='app-doctor-detail-combin'>
                            <div className='app-doctor-detail-icon-container'>
                                <img src={glassesIcon} alt='glasses' className='app-doctor-detail-icon' />
                            </div>
                            <span className='app-doctor-detail-text'>Specialization</span>
                        </div>
                        <div className='app-doctor-detail-combin'>
                            <div className='app-doctor-detail-icon-container'>
                                <img src={badgeIcon} alt='verification badge' className='app-doctor-detail-icon' />
                            </div>
                            <span className='app-doctor-detail-text'>License or Verification</span>
                        </div>
                    </div>
                </div>
                <div className='app-time-info-section'>
                    <span className='app-time-info-section-date' >
                        Thursday 4, June
                    </span>
                    <span className='app-time-info-section-time'>
                        01:23 PM EST
                    </span>
                    <button className='app-cancel-or-change-button' onClick={() => {
                      console.log("Link clicked");
                      togglePopup(true, 'appointmentDescription') }} >Change/Cancel Appointment</button>
                </div>
            </div>
            <div className='app-medium-info-section'>
                <span>
                 You want to consult about:
                </span>
                <div className='app-medium-buttons-combin'>
                    <button className='app-medium-button app-medium-text-button' >Eyes</button>
                    <button className='app-medium-button app-medium-plus-button' >+</button>
                </div>
            </div>
            <div className='app-description-section'>
                <span className='app-description-title'> Description: </span>
                <span className='app-description-description'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                <Link className='app-edit-button' onClick={() => {
                console.log("Link clicked");
                togglePopup(true, 'appointmentDescription')}}>Edit</Link>
            </div>
        </div>
    );   
};

export default AppointmentDetail;