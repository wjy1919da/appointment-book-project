import React from 'react'
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import MaleIcon from '../../../assets/sign/male-icon.jpg';
import FemaleIcon from '../../../assets/sign/female-icon.jpg';
import OtherIcon from '../../../assets/sign/other-icon.jpg';
import { useState } from 'react';
import userInfoQueryStore from '../../../userStore.ts';
import './after-signup-popup1.styles.scss';
const ChooseGender = () => {
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    const setGender = userInfoQueryStore((state) => state.setGender);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    console.log("userInfo in register",userInfo);
    return (
        <div className="signup-popup-container">
                    <p style={{ color:'#000',
                                fontFamily:'Playfair Display',
                                fontStyle:'normal',
                                fontSize:'36px',
                                fontWeight:400,
                                lineHeight:'135%',
                                marginTop:'30px',
                                display:'flex',
                                flexShrink:0,
                                flexdirection:'column',
                                justifyContent:'center' }}>
                        Sign Up
                    </p>
                        
                    <p style={{ color:'#000',
                                fontFamily:'Lora',
                                fontStyle:'normal',
                                fontSize:'12px',
                                fontWeight:'bold',
                                lineHeight:'normal',
                                marginTop:'-12px',
                                display:'flex',
                                flexShrink:0,
                                flexdirection:'column',
                                justifyContent:'center', 
                                flexShrink:0 }}>
                        Welcome to Charm Life!
                    </p>

                    <p style={{ color:'#000',
                                fontFamily:'Lora',
                                fontStyle:'normal',
                                fontSize:'12px',
                                fontWeight:400,
                                lineHeight:'normal',
                                marginTop:'-15px',
                                display:'flex',
                                flexShrink:0,
                                flexdirection:'column',
                                justifyContent:'center', 
                                flexShrink:0 }}>
                        Knowing more about you will help us personalize our 
                    </p>

                    <p style={{ color:'#000',
                                fontFamily:'Lora',
                                fontStyle:'normal',
                                fontSize:'12px',
                                fontWeight:400,
                                lineHeight:'normal',
                                marginTop:'-20px',
                                display:'flex',
                                flexShrink:0,
                                flexdirection:'column',
                                justifyContent:'center', 
                                flexShrink:0 }}>
                        recommendations for you
                    </p>
                            
                    <div className="gender-option-section" style={{ marginTop:'-10px'}}>
                        <div className='male-option' style={{ display:'flex',
                                                            flexShrink:0,
                                                            flexdirection:'column',
                                                            justifyContent:'center', 
                                                            flexShrink:0 }}>
                            <img className='male-icon-image' 
                                src={MaleIcon} 
                                alt='Male Option'
                                onClick={() => setGender(1)}/>
                        </div>

                        <div className='female-option' style={{ display:'flex',
                                                            flexShrink:0,
                                                            flexdirection:'column',
                                                            justifyContent:'center', 
                                                            flexShrink:0 }}>
                            <img className='female-icon-image' 
                                src={FemaleIcon} 
                                alt='Female Option'
                                onClick={() => setGender(2)}/>
                        </div>

                        <div className='other-option' style={{ display:'flex',
                                                            flexShrink:0,
                                                            flexdirection:'column',
                                                            justifyContent:'center', 
                                                            flexShrink:0 }}>
                            <img className='other-icon-image' 
                                src={OtherIcon} 
                                alt='Other Option'
                                onClick={() => setGender(3)}/>
                        </div>
                    </div>
                    <div className='skip-container'>
                        <div className='skip' onClick={()=>switchPopupTab('interest')}>skip</div> 
                    </div>
                    <div className="next-button-section">
                        
                        {/* <SignupAndLoginButton onClick={()=>setActiveTab('birthyear')} width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next'/>  */}
                        <SignupAndLoginButton onClick={()=>switchPopupTab('interest')} width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next'/>
                    </div>
                </div>
        )
}

export default ChooseGender