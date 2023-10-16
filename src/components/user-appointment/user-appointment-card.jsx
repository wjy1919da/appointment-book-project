import './user-appointment-card.styles.scss'
import videoConsul from '../../assets/user/Video Call.png'
import TodayIcon from '../../assets/user/Today.png'
import AppInfoQueryStore from '../../appointmentStore.ts'
const UserAppointmentCard = ({date,time,name,type,IsMostRecent,onClick}) => {
    const appInfo = AppInfoQueryStore(state=>state.appInfo);
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const appointmentTimeClasses = `appointment-time ${IsMostRecent ? 'isMostRecent' : ''}`;
    const appointmentButtonClasses = `appointment-start-button ${IsMostRecent ? 'isMostRecent' : ''}`
    const appointmentCardClasses = `user-appointment-card-container ${IsMostRecent ? 'isMostRecent' : ''}`
    const handleCardClick = () => {
        onClick(); // Call the onClick function passed from the parent component
      };
    return (
        <div className={appointmentCardClasses} onClick={handleCardClick}>
            <div className='appointment-time-section'>
                <span className='appointment-date1'>{date}</span>
                <span className={appointmentTimeClasses}>{time}</span>
            </div>
            <div className='appointment-info-section'>
                <span className='appointment-name1'>{name}</span>
                <div className='appointment-type-section'>
                    <img src = {videoConsul}></img>
                    <span className='appointment-type1'>Video Consultation</span>
                </div>
                <button className={appointmentButtonClasses}>Start Call</button>
            </div>
            <div className='appointment-today-Icon'>
                <img src ={TodayIcon}></img>
            </div>
        </div>
    );   
};

export default UserAppointmentCard;