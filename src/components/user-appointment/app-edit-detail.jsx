import './app-edit-detail.styles.scss'
import './appointment-detail.styles.scss'
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';
import AppInfoQueryStore from '../../appointmentStore.ts'
import doctorAvatar from '../../assets/user/doctor-profile-image.png'
import locationIcon from '../../assets/user/locationIcon.png'
import badgeIcon from '../../assets/user/badgeIcon.png'
import glassesIcon from '../../assets/user/glassesIcon.png'

const AppEditDetail = () => {
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const [value, onChange] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    return (
        <div className='user-appointment-edit-container'>
            <div className='appointment-top-info-container'>
                <div className='app-doctor-info-section'>
                    <div className='app-doctor-avatar'>
                        <img src = {doctorAvatar} 
                            style={{width:'100px',height:'100px'}}
                        ></img>
                    </div>
                    <div className='app-doctor-detail'>
                        <span
                             style={{fontFamily:'open Sans',fontSize:'20px', fontStyle:'normal',fontWeight:'600',lineHeight:'normal'}}
                        >Dr.Name Name</span>
                        <div className='app-doctor-detail-combin'>
                            <img src = {glassesIcon} className='app-doctor-deatil-icon'></img>
                            <span className='app-doctor-detail-text'
                                style={{fontSize:'14px',color:'white'}}
                            >Specialization</span>
                        </div>
                        <div className='app-doctor-detail-combin'>
                            <img src = {badgeIcon} className='app-doctor-deatil-icon'></img>
                            <span className='app-doctor-detail-text'
                                style={{fontSize:'14px',color:'white'}}
                            >License or Verification</span>
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
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <div className='app-edit-main-section'>
                <div className='app-edit-calendar-section'>
                {/* <Calendar onChange={onChange} value={value} className="react-calendar"/> */}
                </div>
                <div className='app-edit-time-section'>
                    <div className='app-edit-time-list'>
                        {['9:00 - 9:30 AM EST', '10:00 - 10:30 AM EST', '11:00 - 11:30 AM EST', '12:00 - 12:30 PM EST'].map(time => (
                            <button 
                                key={time}
                                className={`app-edit-time-button ${selectedTime === time ? 'selected' : ''}`} 
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                    <div className='app-edit-time-list'>
                        {['1:00 - 1:30 PM EST', '2:00 - 2:30 PM EST', '3:00 - 3:30 PM EST', '4:00 - 4:30 PM EST'].map(time => (
                            <button 
                                key={time}
                                className={`app-edit-time-button ${selectedTime === time ? 'selected' : ''}`} 
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
                </div>
                <div className='app-edit-cnext-button'>
                    <button className='app-cancel-or-change-button' 
                    onClick={() => {
                        console.log("Link clicked");
                        togglePopup(true, 'finish')}}
                    
                    >Next</button>
                </div>
                
            </div>
           
        </div>
    );   
};

export default AppEditDetail;