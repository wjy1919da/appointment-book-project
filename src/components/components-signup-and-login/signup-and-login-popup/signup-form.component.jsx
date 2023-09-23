import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './signup-popup3.styles.scss';
import Cookies from 'js-cookie';
import userInfoQueryStore from '../../../userStore.ts';
import {useUserRegister} from '../../../hooks/useAuth';
const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}
const SignUpForm = ({ setActiveTab }) => {
    const [internalEmail, setInternalEmail] = useState('');
    const [internalPassword, setInternalPassword] = useState('');
    const {mutate,data,isLoading,isError,error} = useUserRegister();
    const handleOnClick = () => {
        if (!internalEmail || !isValidEmail(internalEmail)) {
            alert('Error: Invalid email!');
            return;
        }
        if (!internalPassword) {
            alert('Error: Invalid password!');
            return;
        }
        mutate({
            email: internalEmail,
            password: internalPassword
        });
    }
    useEffect(() => {
        if (data?.data && data.code === 100) {
           //  切换到下一个tab
           // 用户点击链接获取token
           alert("sending email ",data.msg);
           setActiveTab();
        }
        if (data?.data && 400<=data.code <=500) {
            alert(data.msg);
        }
    }, [data]);
    return (
        <div className="signup-popup-container">
                <p style={{ color:'#000',
                            fontFamily:'Playfair Display',
                            fontStyle:'normal',
                            fontSize:'36px',
                            fontWeight:400,
                            lineHeight:'135%',
                            marginTop:'25px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Sign Up
                </p>
                
                 
                <div className="signup-popup-username">
                    <div className="signup-popup-lable">
                        <p>User Name<span class="red-asterisk">*</span></p> 
                    </div>
                    
                    <input className='signup-popup-username-input'
                           type='text' 
                           placeholder='Username'
                           onChange={(event)=>setInternalEmail(event.target.value)}
                           style={{ width: '270px',
                                    height:'20px', 
                                    marginBottom: '5px', 
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
                    
                <div className="signup-popup-password">
                    <div className="signup-popup-lable">
                        <p>Password<span class="red-asterisk" style={{ color:'red', fontFamily:'Lora', fontSize:'14px', marginLeft:'2px' }}>*</span></p>
                    </div>

                    <input className='signup-popup-password-input'
                           type='text' 
                           placeholder='1234567'
                           onChange={(event)=>setInternalPassword(event.target.value)}
                           style={{ width: '270px',
                                    height:'20px', 
                                    marginBottom: '5px', 
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

                <div className="signup-popup-reenter-password">
                    <div className="signup-popup-lable">
                        <p>Re-enter Password<span class="red-asterisk" style={{ color:'red', fontFamily:'Lora', fontSize:'14px', marginLeft:'2px' }}>*</span></p>
                    </div>

                    <input className='signup-popup-reenter-password-input'
                           type='text' 
                           placeholder='1234567'
                          // onChange={(event)=>setInternalEmail(event.target.value)}
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
                            marginTop:'15px',
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
                
                <div className="next-button-section">
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next' herf='/download' onClick = { handleOnClick }/> 
                </div>
            </div>
    )
}

export default SignUpForm