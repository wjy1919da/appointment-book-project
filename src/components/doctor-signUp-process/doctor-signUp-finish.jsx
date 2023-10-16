import './doctor-signUp-finish.styles.scss'
import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
import HomeLogo from '../../assets/home/logo.png'
const DoctorSignUpFinish = () => {
    return (
        <div className='doctor-signUp-finish-container'>
                    <span className='doctor-SignUp-finish-title'>Congratulations!</span>
                    <span className='doctor-SignUp-finish-text'>Your Profile has been sent for Review. Please allow 2-3 Business Days for your Profile to be Verified.</span>
                    <img src = {HomeLogo} style={{width:'269px',height:'286px',marginTop:'50px'}}></img>
                    <div className='doctor-signUp-finish-button'>
                    <SignupAndLoginButton title ='Let’s Set Up Your Profile' height= '45px'  width='300px' />
                    </div>
        </div>   
    )
}

export default DoctorSignUpFinish;