import './appointment-detail.styles.scss'
import { Link } from 'react-router-dom';
import AppInfoQueryStore from '../../appointmentStore.ts'
import doctorAvatar from '../../assets/user/doctor-profile-image.png'
import locationIcon from '../../assets/user/locationIcon.png'
import badgeIcon from '../../assets/user/badgeIcon.png'
import glassesIcon from '../../assets/user/glassesIcon.png'
const AppointmentDetail = () => {
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    return (
        <div className='appointment-detail-main-container'>
            <div className='appointment-top-info-container'>
                <div className='app-doctor-info-section'>
                    <div className='app-doctor-avatar'>
                        <img src = {doctorAvatar} ></img>
                    </div>
                    <div className='app-doctor-detail'>
                        <div className='app-doctor-detail-combin'>
                            <img src ={locationIcon} className='app-doctor-deatil-icon'></img>
                            <span className='app-doctor-detail-text'>city, State</span>
                        </div>
                        <span
                             style={{fontFamily:'open Sans',fontSize:'26px', fontStyle:'normal',fontWeight:'600',lineHeight:'normal'}}
                        >Dr.Name Name</span>
                        <div className='app-doctor-detail-combin'>
                            <img src = {glassesIcon} className='app-doctor-deatil-icon'></img>
                            <span className='app-doctor-detail-text'>Specialization</span>
                        </div>
                        <div className='app-doctor-detail-combin'>
                            <img src = {badgeIcon} className='app-doctor-deatil-icon'></img>
                            <span className='app-doctor-detail-text'>License or Verification</span>
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
                    <button className='app-cancel-or-change-button'>change/Cancel Appointment</button>
                </div>
            </div>
            <div className='app-medium-info-section'>
                <span>
                 You want to consult about:
                </span>
                <div className='app-medium-buttons-combin'>
                    <button className='app-medium-button' style={{width:'150px',height:'40px'}}>Eyes</button>
                    <button className='app-medium-button' style={{width:'40px',height:'40px'}}>+</button>
                </div>
            </div>
            <div className='app-description-section'>
                <span 
                    style={{
                        fontFamily:'Open Sans',
                        fontSize:'14px',
                        fontStyle:'normal',
                        fontWeight:'400',
                        lineHeight:'normal'
                        
                                        }}
                >Description:</span>
                <span 
                style={{
                    fontFamily:'Open Sans',
                    fontSize:'12px',
                    fontStyle:'normal',
                    fontWeight:'400',
                    lineHeight:'normal',
                    marginTop:'10px'
                    
                                    }}
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                <Link className='app-edit-button' onClick={() => {
                console.log("Link clicked");
                togglePopup(true, 'appointmentDescription')}}>Edit</Link>
            </div>
        </div>
    );   
};

export default AppointmentDetail;