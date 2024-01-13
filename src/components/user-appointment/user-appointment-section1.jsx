import './user-appointment-section1.style.scss'
import arrowLeft from '../../assets/user/arrow-left.png';
import xIcon from '../../assets/user/xIcon.svg';
import tiltedHamburger from '../../assets/user/tiltedHamburger.svg';
import reverseClock from '../../assets/user/reverseClock.svg';
import React, { useState , useEffect } from 'react';
import AppointmentDetail from './appointment-detail';
import AppInfoQueryStore from '../../appointmentStore.ts'
import AppDetailDescription from './appointment-detail-description';
import AppEditDetail from './app-edit-detail';
import AppointmentFinish from './app-finish-page';
import UserAppointmentCard from './user-appointment-card';
import AppointmentCancel from './app-cancel-page';
import AppointmentCancelFinish from './app-cancel-finish';
const UserAppoinmentSection1 = () => {
    const appInfo = AppInfoQueryStore(state => state.appointInfo);
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const [isCardClicked, setIsCardClicked] = useState(false);
    /**
     * Keep track of which appointment we are looking at with this state variable, make sure 
     * we are updating it and removing it accordingly.
     */
    const [selectedAppointmentObj, setSelectedAppointmentObj] = useState();
    const handleCardClick = (appointmentObj) => {
        setSelectedAppointmentObj(appointmentObj);
        setIsCardClicked(true); // Set state to true when card is clicked
        togglePopup(true,'appointmentDetail')
      };
    const handleCloseCardClick = () => {
        setSelectedAppointmentObj({});
        setIsCardClicked(false);
    }
    useEffect(() => {
        if (appInfo.popupState === 'mainSection') {
            setIsCardClicked(false);
        }
    }, [appInfo.popupState]); 
    return (
        <div className='user-appointment-section1-popup-and-main-container'>
            {isCardClicked && 
            <div className='user-appointment-popup-container'>
                <div className='user-appointment-darkened' onClick={handleCloseCardClick}>
                </div>
                <div className='user-appointment-popup'>
                    <div className='user-appointment-xIcon-container' onClick={handleCloseCardClick}>
                        <img src={xIcon} className='user-appointment-xIcon' alt='close out' />
                    </div>
                    {appInfo.popupState === 'appointmentDetail' &&
                        <div className='appointment-detail-section'>
                            {/* <AppointmentDetail appointmentObj={selectedAppointmentObj} type={1}/> */}
                            <AppointmentDetail appointmentObj={selectedAppointmentObj} />
                        </div>
                    }   
                    {appInfo.popupState === 'appointmentDescription' &&
                        <div className='appointment-detail-section'>
                            <AppDetailDescription appointmentObj={selectedAppointmentObj}/>
                        </div>
                    } 
                    {appInfo.popupState === 'EditAppointment' &&
                        <div className='appointment-detail-section'>
                            <AppEditDetail appointmentObj={selectedAppointmentObj} />
                        </div>
                    }
                    {appInfo.popupState === 'cancelAppointment' &&
                        <div className='appointment-detail-section'>
                            <AppointmentCancel appointmentObj={selectedAppointmentObj} />
                        </div>
                    }
                    {appInfo.popupState === 'cancelAppointmentFinish' &&
                        <div className='appointment-detail-section'>
                            <AppointmentCancelFinish appointmentObj={selectedAppointmentObj} />
                        </div>
                    }
                    {appInfo.popupState === 'editAppointmentFinish' &&
                        <div className='appointment-detail-section'>
                            <AppointmentFinish appointmentObj={selectedAppointmentObj} changedSaved={true} />
                        </div>
                    }
                    {appInfo.popupState === 'finish' &&
                        <div className='appointment-detail-section'>
                            <AppointmentFinish appointmentObj={selectedAppointmentObj}/>
                        </div>
                    } 
                </div>
            </div>}
            <div className='user-appointment-section1-main-container'>
                <div className='user-appointment-section1-container'>
                    <div className='user-appointment-text-title-container'>
                        <div className='user-appointment-tilted-hamburger-container'>
                            <img src={tiltedHamburger} alt='decorative' className='user-appointment-tilted-hamburger' />
                        </div>
                        <span className='user-appointment-text1'>Upcoming Appointments</span>
                    </div>
                    {/* <div className='user-appointment-most-recent'>
                        
                    </div> */}
                    <div className='user-appointment-reschedule-list'>
                        <UserAppointmentCard date = 'Thursday, 4 June' time = '10:00 - 10:30 AM EST' name = 'Dr.Name Name' type={0} onClick={handleCardClick} />
                    </div>
                    <div className='user-appointment-regular-list'>
                        <UserAppointmentCard date = 'Thursday, 4 June' time = '10:00 - 10:30 AM EST' name = 'Dr.Name Name' type={1} isIndexOdd={true} onClick={handleCardClick} />
                        <UserAppointmentCard date = 'Thursday, 4 June' time = '10:00 - 10:30 AM EST' name = 'Dr.Name Name' type={2} isIndexOdd={false} onClick={handleCardClick} />
                        <UserAppointmentCard date = 'Thursday, 4 June' time = '10:00 - 10:30 AM EST' name = 'Dr.Name Name' type={2} isIndexOdd={true} appointmentPending={true} onClick={handleCardClick} />
                    </div>
                    <div className='user-appointment-history-subdivider'>
                        <div className='user-appointment-history-title-container'>
                            <div className='user-appointment-history-img-container'>
                                <img src={reverseClock} alt='clock' className='user-appointment-history-img' />
                            </div>
                            <h3 className='user-appointment-history-title'>History</h3>
                        </div>
                    </div>
                    <div className='user-appointment-history-list'>
                        <UserAppointmentCard date = 'Thursday, 4 June' time = '10:00 - 10:30 AM EST' name = 'Dr.Name Name' type={2} isIndexOdd={true} isHistory={true} onClick={handleCardClick} />
                        <UserAppointmentCard date = 'Thursday, 4 June' time = '10:00 - 10:30 AM EST' name = 'Dr.Name Name' type={2} isIndexOdd={false} isHistory={true} onClick={handleCardClick} />
                    </div>
                </div>
            </div>
        </div>
    );
    // return (
    //     <div className='user-appointment-section1-main-container'>
    //         {!isCardClicked ? <div className='user-appointment-section1-container'>
    //             <div className='user-appointment-text-title'>
    //                 <span className='user-appointment-text1'>Upcoming Appointments</span>
    //                 <span className='user-appointment-text2'>Previous</span>
    //             </div>
    //             {/* <div className='user-appointment-most-recent'>
                    
    //             </div> */}
    //             <div className='user-appointment-list'>
    //                 <UserAppointmentCard date = 'Thursday, 4 June' time = 'now' name = 'Dr.Name Name' IsMostRecent={true} onClick={handleCardClick} />
    //                 <UserAppointmentCard date = 'Thursday, 4 June' time = 'now' name = 'Dr.Name Name' IsMostRecent={false} onClick={handleCardClick} />
    //                 <UserAppointmentCard date = 'Thursday, 4 June' time = 'now' name = 'Dr.Name Name' IsMostRecent={false} onClick={handleCardClick} />
    //                 <UserAppointmentCard date = 'Thursday, 4 June' time = 'now' name = 'Dr.Name Name' IsMostRecent={false} onClick={handleCardClick} />
    //                 <UserAppointmentCard date = 'Thursday, 4 June' time = 'now' name = 'Dr.Name Name' IsMostRecent={false} onClick={handleCardClick} />
    //             </div>
    //         </div> 
    //             :
    //         <div>
    //             {appInfo.popupState === 'appointmentDetail' &&
    //             <div className='appointment-detail-section'>
    //                 <AppointmentDetail/>
    //             </div>
    //             }   
    //             {appInfo.popupState === 'appointmentDescription' &&
    //                 <div className='appointment-detail-section'>
    //                     <AppDetailDescription/>
    //                 </div>
    //             } 
    //             {appInfo.popupState === 'EditAppointment' &&
                    
    //                     <AppEditDetail/>
    //             } 
    //             {appInfo.popupState === 'finish' &&
    //                 <div className='appointment-detail-section'>
    //                     <AppointmentFinish/>
    //                 </div>
    //             } 
    //         </div>

    //         }
    //     </div>
    // );   
};

export default UserAppoinmentSection1;