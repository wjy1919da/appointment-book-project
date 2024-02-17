import './user-appointment-card.styles.scss'
import videoConsul from '../../assets/user/Video Call.png'
import videoCamera from '../../assets/user/videoCamera.svg';
import TodayIcon from '../../assets/user/Today.png'
import AppInfoQueryStore from '../../appointmentStore.ts'
import badgeAppointmentConfirmed from '../../assets/user/badgeAppointmentConfirmed.svg';
import badgeAppointmentPending from '../../assets/user/badgeAppointmentPending.svg';
import badgeAppointmentDeclined from '../../assets/user/badgeAppointmentDeclined.svg';
import doctorProfilePic from '../../assets/doctor/doctor-profile-picture.svg';
/**
 * type: 0 = reschedule, 1 = in time range to start, 2 = not in time range to start
 * 
 */
const UserAppointmentCard = ({date,time,name,type, isIndexOdd, onClick, appointmentPending, paymentFailed, isHistory}) => {
    const appInfo = AppInfoQueryStore(state=>state.appInfo);
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const appointmentTimeClasses = `appointment-time ${type === 0 ? 'appointment-time-schedule' : 'appointment-time-normal'}`;
    const appointmentButtonClasses = `appointment-start-button ${type === 1 ? 'appointment-start-button-ready' : 'appointment-start-button-unready'}`;
    const appointmentCardClasses = `user-appointment-card-container ${type === 0 ? 'user-appointment-card-container-schedule' : type === 1 ? 'user-appointment-card-container-start' : isHistory ? 'user-appointment-card-history' : 'user-appointment-card-container-regular'} ${isIndexOdd && 'user-appointment-card-container-odd'}`;
    const appointmentInfoClasses = type === 0 ? 'appointment-info-schedule' : 'appointment-info-regular';
    const endingText = type === 0 ? 'Declined' : paymentFailed ? 'Waiting for Payment' : appointmentPending ? 'Waiting for Confirmation' : 'Approved';
    const appointmentBadge = type === 0 || paymentFailed ? badgeAppointmentDeclined : appointmentPending ? badgeAppointmentPending : badgeAppointmentConfirmed;
    const handleCardClick = () => {
        onClick(); // Call the onClick function passed from the parent component
      };
    const handlePaymentFailedClick = (event) => {
        event.stopPropagation();   // needed to stop the details page from opening
        paymentFailed();
        // togglePopup(true, 'paymentFailed');
        
        // console.log('here!');
    }
    return (
        <div className={appointmentCardClasses} onClick={handleCardClick} >
            <div className='user-appointment-top-section'>
                <div className={`appointment-time-section ${appointmentTimeClasses}`}>
                    <span className='appointment-date1'>{date}</span>
                    <span className='appointment-time1'>{time}</span>
                    {type === 0 && <h4 className='appointment-time-subtext'>Need to Reschedule!</h4>}
                    {type === 1 && <h4 className='appointment-time-subtext'>Start in X Min</h4>}
                </div>
                <div className='appointment-info-section'>
                    <div className='appointment-info-doctor-profile-pic-container'>
                        <img className='appointment-info-doctor-profile-pic' src={doctorProfilePic} alt='profile' />
                    </div>
                    <div className='appointment-info-subsection'>
                        <span className={`appointment-name1 ${appointmentInfoClasses}`}>{name}</span>
                        <div className='appointment-type-section'>
                            <img src={videoCamera} className={type === 0 ? 'appointment-video-camera-schedule' : 'appointment-video-camera-regular'} alt='video camera' /> 
                            <span className={`appointment-type1 ${type === 0 ? 'appointment-type1-schedule' : 'appointment-type1-regular'}`}>{'Video Consultation'}</span>
                        </div>
                    </div>
                </div>
                {/* <div className='appointment-ending-section'>
                    {paymentFailed && <button className='appointment-start-button appointment-start-button-ready appointment-payment-failed-button' onClick={(e) => handlePaymentFailedClick(e)}>Pay Again</button>}
                </div> */}
            </div>
            {!isHistory && <div className={`appointment-bar-section ${type === 0 && 'appointment-lighter-bar'}`}></div>}
            {!isHistory && 
            <div className='user-appointment-bottom-section'>
                <div className='appointment-ending-section-top-row'>
                    <div className='appointment-ending-section-badge-container'> <img className='appointment-ending-section-badge' src={appointmentBadge} alt='appointment badge' /> </div>
                    <span className={`appointment-ending-section-text ${paymentFailed && 'appointment-ending-failed-payment-text'} ${type === 0 && 'appointment-ending-section-text-declined'}`}>{endingText}</span>
                </div>
                <div className='appointment-ending-section-button-section'>
                    {paymentFailed && <button className='appointment-start-button appointment-start-button-ready appointment-payment-failed-button' onClick={(e) => handlePaymentFailedClick(e)}>Pay Again</button>}
                    {type === 1 && <button className={appointmentButtonClasses}>Join the Consulting Room</button>}
                    {type === 2 && <button disabled className={appointmentButtonClasses}>Not Available Yet</button>}
                </div>
            </div>}
            {/* <div className='appointment-today-Icon'>
                <img src ={TodayIcon}></img>
            </div> */}
        </div>
    );   
};

export default UserAppointmentCard;