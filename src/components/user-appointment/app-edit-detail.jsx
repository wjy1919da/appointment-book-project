import 'react-calendar/dist/Calendar.css';
import './app-edit-detail.styles.scss'
import './appointment-detail.styles.scss'

// import Calendar from './calendar';
import Calendar from 'react-calendar';


import React, { useState } from 'react';
import AppInfoQueryStore from '../../appointmentStore.ts'
import doctorAvatar from '../../assets/user/doctor-profile-image.svg'
import locationIcon from '../../assets/user/locationIcon.png'
import badgeIcon from '../../assets/user/badgeIconSVG.svg'
import glassesIcon from '../../assets/user/glassesIconSVG.svg'
import ChakraUserAppointmentModal from '../chakra-modal/chakra-user-appointment-modal';

const AppEditDetail = ({appointmentObj, isNewApp}) => {
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const [value, onChange] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSelectedTime = (time) => {
        if (selectedTime === time) {
            setSelectedTime();
            return;
        }
        setSelectedTime(time);
    }
    const rescheduleAppointmentCallback = () => {
        togglePopup(true, 'editAppointmentFinish');
        setIsModalOpen(false);
    }
    const dontRescheduleAppointmentCallback = () => {
        // togglePopup(true,'mainSection');
        setIsModalOpen(false);
    }
    return (
        <>
            <ChakraUserAppointmentModal title={'Are you sure you want to reschedule your appointment time?'} cancelButtonText={'Cancel'} closeModalFunc={dontRescheduleAppointmentCallback} approveButtonText={'Confirm'} approveCallback={rescheduleAppointmentCallback} isModalOpen={isModalOpen} />
            <div className='user-appointment-edit-container'>
                {/* <div className='appointment-top-info-container'>
                    <div className='app-doctor-info-section'>
                        <div className='app-calendar-doctor-avatar-container'>
                            <img src={doctorAvatar} className='app-calendar-doctor-avatar' alt='doctor avatar' />
                        </div>
                        <div className='app-doctor-detail'>
                            <span className='app-calendar-doctor-name app-calendar-doctor-text' >Dr.Name Name</span>
                            <div className='app-doctor-detail-combin'>
                                <img src = {glassesIcon} className='app-doctor-deatil-icon'></img>
                                <span className='app-calendar-doctor-text' >Specialization</span>
                            </div>
                            <div className='app-doctor-detail-combin'>
                                <img src = {badgeIcon} className='app-doctor-deatil-icon'></img>
                                <span className='app-calendar-doctor-text' >License or Verification</span>
                            </div>
                        </div>
                    </div>
                    <div className='app-time-info-section'>
                        <span
                            style={{color:'black',fontFamily:'Open Sans',fontSize:'14px',fontStyle:'normal',fontWeight:'600',lineHeight:'' }}
                        >
                            Thursday 4, June</span>
                        <span
                            style={{color:'black', fontFamily:'Open Sans', fontSize:'20px',fontStyle:'normal', fontWeight:'700'}}
                        >01:23 PM EST</span>
                    </div>
                </div> */}
                <div style={{display:'flex',flexDirection:'column'}}>
                <div className='app-edit-main-section'>
                    <div className='app-edit-calendar-description-container'>
                        <h3 className='app-edit-calendar-description calendar-description-1'>Next, please select the date and time that is best for you. Our verified doctors will contact you during this time.</h3>
                        <h3 className='app-edit-calendar-description calendar-description-2'></h3>
                    </div>
                    <div className='app-edit-calendar-section-container'>
                        <div className='app-edit-calendar-section'>

                            <Calendar onChange={onChange} value={value} view="month" className="react-calendar" />

                        {/* <Calendar onChange={onChange} value={value} className="react-calendar"/> */}
                        </div>
                        <div className='app-edit-time-section'>
                            <div className='app-edit-time-list'>
                                {['9:00 - 9:30 AM EST', '10:00 - 10:30 AM EST', '11:00 - 11:30 AM EST', '12:00 - 12:30 PM EST'].map(time => (
                                    <button 
                                        key={time}
                                        className={`app-edit-time-button ${selectedTime === time ? 'selected' : ''}`} 
                                        onClick={() => handleSelectedTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            <div className='app-edit-time-list'>
                                {['1:00 - 1:30 PM EST', '2:00 - 2:30 PM EST', '3:00 - 3:30 PM EST', '4:00 - 4:30 PM EST', '5:00 - 5:30 PM EST', '6:00 - 6:30 EST'].map(time => (
                                    <button 
                                        key={time}
                                        className={`app-edit-time-button ${selectedTime === time ? 'selected' : ''}`} 
                                        onClick={() => handleSelectedTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                        </div>
                        {!isNewApp && <div className='app-edit-cnext-button-container'>
                            {selectedTime ? <button className='app-edit-cnext-button' 
                            onClick={() => {
                                console.log(`Value and time is: ${value} and ${selectedTime}`);
                               setIsModalOpen(true)}}
                            
                            >Confirm</button> : <button title='Please select a time.' className='app-edit-cnext-button-disabled' disabled
                            >Confirm</button>}
                            
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );   
};

export default AppEditDetail;