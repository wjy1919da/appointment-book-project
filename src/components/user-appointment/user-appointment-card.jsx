import './user-appointment-card.styles.scss'
import videoConsul from '../../assets/user/Video Call.png'
import videoCamera from '../../assets/user/videoCamera.svg';
import TodayIcon from '../../assets/user/Today.png'
import AppInfoQueryStore from '../../appointmentStore.ts'
/**
 * type: 0 = reschedule, 1 = in time range to start, 2 = not in time range to start
 * 
 */
const UserAppointmentCard = ({date,time,name,type, isIndexOdd, onClick, appointmentPending, isHistory}) => {
    const appInfo = AppInfoQueryStore(state=>state.appInfo);
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const appointmentTimeClasses = `appointment-time ${type === 0 ? 'appointment-time-schedule' : 'appointment-time-normal'}`;
    const appointmentButtonClasses = `appointment-start-button ${type === 1 ? 'appointment-start-button-ready' : 'appointment-start-button-unready'}`;
    const appointmentCardClasses = `user-appointment-card-container ${type === 0 ? 'user-appointment-card-container-schedule' : type === 1 ? 'user-appointment-card-container-start' : 'user-appointment-card-container-regular'} ${isIndexOdd && 'user-appointment-card-container-odd'}`;
    const appointmentInfoClasses = type === 0 ? 'appointment-info-schedule' : 'appointment-info-regular';
    const endingText = type === 0 ? 'Not Confirmed' : appointmentPending ? 'Waiting for Confirmation' : 'Appointment Confirmed';
    const handleCardClick = () => {
        onClick(); // Call the onClick function passed from the parent component
      };
    return (
        <div className={appointmentCardClasses} >
            <div className={`appointment-time-section ${appointmentTimeClasses}`}>
                <span className='appointment-date1'>{date}</span>
                <span className='appointment-time1'>{time}</span>
                {type === 0 && <h4 className='appointment-time-subtext'>Need to Reschedule!</h4>}
                {type === 1 && <h4 className='appointment-time-subtext'>Start in X Min</h4>}
            </div>
            <div className='appointment-info-section'>
                <span className={`appointment-name1 ${appointmentInfoClasses}`}>{name}</span>
                <div className='appointment-type-section'>
                    <img src={videoCamera} className={type === 0 ? 'appointment-video-camera-schedule' : 'appointment-video-camera-regular'} alt='video camera' /> 
                    <span className={`appointment-type1 ${type === 0 ? 'appointment-type1-schedule' : 'appointment-type1-regular'}`}>{type === 0 ? 'Video Consultation' : appointmentPending ? 'Waiting for Confirmation' : 'Confirmed Appointment'}</span>
                </div>
                {!isHistory && type === 1 && <button className={appointmentButtonClasses}>Join the Consulting Room</button>}
                {!isHistory && type === 2 && <button disabled className={appointmentButtonClasses}>Not Available Yet</button>}
            </div>
            <div className='appointment-ending-section'>
                {!isHistory && <span className='appointment-ending-section-text'>{endingText}</span>}
                <button className='appointment-ending-button' onClick={handleCardClick}>View Details</button>
            </div>
            {/* <div className='appointment-today-Icon'>
                <img src ={TodayIcon}></img>
            </div> */}
        </div>
    );   
};

export default UserAppointmentCard;