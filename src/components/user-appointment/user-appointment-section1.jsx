import './user-appoinment-section1.style.scss'
import arrowLeft from '../../assets/user/arrow-left.png';
import React, { useState } from 'react';
import AppointmentDetail from './appointment-detail';
import AppInfoQueryStore from '../../appointmentStore.ts'
import AppDetailDescription from './appointment-detail-description';
import AppEditDetail from './app-edit-detail';
import AppointmentFinish from './app-finish-page';
import UserAppointmentCard from './user-appointment-card';
const UserAppoinmentSection1 = () => {
    const appInfo = AppInfoQueryStore(state => state.appointInfo);
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const [isCardClicked, setIsCardClicked] = useState(false);
    const handleCardClick = () => {
        setIsCardClicked(true); // Set state to true when card is clicked
        togglePopup(true,'appointmentDetail')
      };
    return (
        <div className='user-appointment-section1-main-container'>
        {!isCardClicked&&<div className='user-appointment-section1-container'>
            <div className='user-appointment-text-title'>
                <span className='user-appointment-text1'>Upcoming Appointments</span>
                <span className='user-appointment-text2'>Previous</span>
            </div>
            <div className='user-appointment-most-recent'>
                <UserAppointmentCard date = 'Thursday, 4 June' time = 'now' name = 'Dr.Name Name' IsMostRecent={true} onClick={handleCardClick} />
            </div>
            <div className='user-appointment-list'>
            <UserAppointmentCard date = 'Thursday, 4 June' time = 'now' name = 'Dr.Name Name' IsMostRecent={false} onClick={handleCardClick} />
            </div>
        </div>}
        {isCardClicked &&
        <div>
            {appInfo.popupState === 'appointmentDetail' &&
            <div className='appointment-detail-section'>
                <AppointmentDetail/>
            </div>
            }   
            {appInfo.popupState === 'appointmentDescription' &&
                <div className='appointment-detail-section'>
                    <AppDetailDescription/>
                </div>
            } 
            
            {appInfo.popupState === 'EditAppointment' &&
                
                    <AppEditDetail/>
            } 
            {appInfo.popupState === 'finish' &&
                <div className='appointment-detail-section'>
                    <AppointmentFinish/>
                </div>
            } 
        </div>

        }
        </div>
    );   
};

export default UserAppoinmentSection1;