import React from 'react'
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import MaleIcon from '../../../assets/sign/male-icon.jpg';
import FemaleIcon from '../../../assets/sign/female-icon.jpg';
import OtherIcon from '../../../assets/sign/other-icon.jpg';
import userInfoQueryStore from '../../../userStore.ts';
import LoginRegisterTitle from './login-register-title.component';
import './choose-gender.styles.scss';
const ChooseGender = () => {
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    const setGender = userInfoQueryStore((state) => state.setGender);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    console.log("userInfo in gender", userInfo.gender);
    return (
        <div className="gender-outer-container">
                <div className='choose-gender-title-container'>
                    <LoginRegisterTitle title={"Sign UP"} subTitle={"Welcome to Charm Life!"} subText={"Knowing more about you will help us personalize our recommendations for you"}/>
                </div>           
                <div className="gender-option-section" style={{ marginTop:'-10px'}}>
                    <div className='gender-image-container'>
                    <img className={userInfo.gender === 1 ? 'gender-image active' : 'gender-image'} 
                            src={MaleIcon} 
                            alt='Male Option'
                            onClick={() => setGender(1)}/>
                    </div>
                    <div className='gender-image-container'>
                        <img className={userInfo.gender === 2 ? 'gender-image active' : 'gender-image'} 
                            src={FemaleIcon} 
                            alt='Female Option'
                            onClick={() => setGender(2)}/>
                    </div>
                    <div className='gender-image-container'>
                        <img className={userInfo.gender === 3 ? 'gender-image active' : 'gender-image'} 
                            src={OtherIcon} 
                            alt='Other Option'
                            onClick={() => setGender(3)}/>
                    </div>
                </div>
                <div className='skip-container'>
                    <div className='skip' onClick={()=>{switchPopupTab('interest'); setGender(0)}}>skip</div> 
                </div>
                <div className="next-button-section">
                    <SignupAndLoginButton onClick={()=>switchPopupTab('interest')} width='100px' height='35px' borderRadius='6px' title='Next'/>
                </div>
            </div>
        )
}

export default ChooseGender