import DoctorProfile from '../../assets/doctor/doctor-profile-image.png'
import './app-finish-page.styles.scss';
import './appointment-detail.styles.scss'
const AppointmentFinish = () => {
    return (
        <div className='app-finish-main-container'>
            <div className='app-finish-title'>
                <span
                    style={{fontFamily:'open Sans',fontSize:'26px',fontStyle:'normal',fontWeight:'700'}}
                   >Thank You for Your Update!</span>
            </div>
            <div className='app-finish-doctor-profile'>
                <img src= {DoctorProfile} style={{width:'160px',height:'160px'}}></img>
                <div className='app-finish-text-list'>
                    <span 
                    style={{fontFamily:'open Sans',fontSize:'35px',fontStyle:'normal',fontWeight:'600'}}
                    >Charlotte</span>
                    <span
                    style={{fontFamily:'open Sans',fontSize:'14px',fontStyle:'normal',fontWeight:'700'}}
                    >Date : 16 June 2023</span>
                    <span
                    style={{fontFamily:'open Sans',fontSize:'14px',fontStyle:'normal',fontWeight:'700'}}
                    >Time : 3:00 - 3:30 PM EST</span>
                </div>
            </div>
            <div className='app-finish-button'>
                <button className='app-cancel-or-change-button'>Home</button>
            </div>
            
        </div>
    );   
};

export default AppointmentFinish;