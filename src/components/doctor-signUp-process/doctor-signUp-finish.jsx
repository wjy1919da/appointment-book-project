import './doctor-signUp-finish.styles.scss'
import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
import HomeLogo from '../../assets/home/logo.png'
import userInfoQueryStore from '../../userStore.ts';
const DoctorSignUpFinish = () => {
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const userInfo = userInfoQueryStore(state=>state.userInfo);
    return (
        <div className='doctor-signUp-finish-container'>
            <span className='doctor-SignUp-finish-title'>
                {userInfo.popupState === "doctorFinish" && "Welcome to CharmLife!"}
                {userInfo.popupState === "doctorSuccess" && "Congratulations!"}
            </span>     
            {userInfo.popupState === "doctorSuccess"&& <span className='doctor-SignUp-finish-text'>Your Profile has been sent for Review. Please allow 2-3 Business Days for your Profile to be Verified.</span>}
            <img src = {HomeLogo} style={{width:'269px',height:'286px',marginTop:'50px'}}></img>
            <div className='doctor-signUp-finish-button'>
            <SignupAndLoginButton 
                title={userInfo && userInfo.popupState === "doctorFinish" ? "Let us Set Up Your Profile" : userInfo.popupState === "doctorSuccess" ? "Email us" : ""}
                height='45px'  
                width='300px' 
                onClick={() => switchPopupTab("doctorProfile")}
             />
            </div>
        </div>   
    )
}

export default DoctorSignUpFinish;