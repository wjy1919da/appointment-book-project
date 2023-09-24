import React from 'react'
import './signup-popup2.styles.scss';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import userInfoQueryStore from '../../../userStore.ts';
const SignupVerify = () => {
   const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
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
                    
                <div className="signup-popup-email">
                        <p style={{ color:'#000',
                                    fontFamily:'Lora',
                                    fontStyle:'normal',
                                    fontSize:'12px',
                                    fontWeight:'bold',
                                    lineHeight:'normal',
                                    display:'flex',
                                    flexShrink:0,
                                    flexdirection:'column',
                                    justifyContent:'center', 
                                    flexShrink:0 }}>
                            Check Your Email!
                        </p>
                        <p style={{ color:'#000',
                                    fontFamily:'Lora',
                                    fontStyle:'normal',
                                    fontSize:'12px',
                                    fontWeight:400,
                                    lineHeight:'normal',
                                    marginTop:'-12px',
                                    display:'flex',
                                    flexShrink:0,
                                    flexdirection:'column',
                                    justifyContent:'center', 
                                    flexShrink:0 }}>
                            We sent you a temporary link to verify your email.
                        </p>
                        <p style={{ color:'#000',
                                    fontFamily:'Lora',
                                    fontStyle:'normal',
                                    fontSize:'12px',
                                    fontWeight:400,
                                    marginTop:'-12px',
                                    lineHeight:'normal',
                                    display:'flex',
                                    flexShrink:0,
                                    flexdirection:'column',
                                    justifyContent:'center', 
                                    flexShrink:0 }}>
                            Check your email.
                        </p>  
                    {/* </label> */}

                    <input className='signup-popup-email-input'
                           type='text' 
                           placeholder='example@email.com'
                           //onChange={(event)=>setInternalEmail(event.target.value)}
                           style={{ width: '270px',
                                    height:'20px', 
                                    marginLeft: '80px', 
                                    // borderColor:onClicked? '1px solid #FFA4A3':'1px solid #F8F8F8', 
                                    borderColor:'1px solid #F8F8F8',
                                    boxShadow: '0px 1px 4px 0px rgba(176, 176, 176, 0.25)',
                                    paddingLeft: '5px',
                                    fontFamily: 'Lora',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    letterSpacing: '0em',
                                    textAlign: 'left' }}   
                    />   
                </div>
                
                <p style={{ color: '#AAA',
                            fontFamily:'Lora',
                            fontStyle:'normal',
                            fontSize:'12px',
                            fontWeight:400,
                            lineHeight:'normal', 
                            marginTop:'25px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Already have an account? 
                        <div className="account-login"
                              style={{ color: '#FFA4A3',
                                       fontWeight:700,
                                       marginLeft:'5px' }}>
                            Log in
                        </div>
                </p>
                
                <div className="cancel-verification-button-section">
                    <SignupAndLoginButton onClick={()=>switchPopupTab('gender')} width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='next'/> 
                </div>
            </div>
  )
}

export default SignupVerify