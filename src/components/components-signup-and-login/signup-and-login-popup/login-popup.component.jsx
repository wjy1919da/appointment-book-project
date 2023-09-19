import React, { useState, useEffect,useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './login-popup.styles.scss';
import Cookies from 'js-cookie';
import { useUserEmailLogin } from '../../../hooks/useAuth';
import userInfoQueryStore from '../../../userStore.ts';
import SocialSignUP from './social-signup.component';
import HomeSpinner from '../../home-spinner/home-spinner.component';

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}
/* TODO: password Validation */
const LoginPopup = (props) => {
    const [internalEmail, setInternalEmail] = useState('');
    const [internalPassword, setInternalPassword] = useState('');
    const userInfo = userInfoQueryStore(state=>state.userInfo);
    const setEmail = userInfoQueryStore(state=>state.setEmail);
    const setPassword = userInfoQueryStore(state=>state.setPassword);
    const setToken = userInfoQueryStore(state=>state.setToken);
    console.log("userInfo in login",userInfo);
    const { mutate, data, isLoading, isError, error } = useUserEmailLogin();
    const handleOnClick = () => {
        //console.log("email ",internalEmail);
        if (!internalEmail || !isValidEmail(internalEmail)) {
            alert('Error: Invalid email!');
            return;
        }
        if (!internalPassword) {
            alert('Error: Invalid password!');
            return;
        }
        // setEmail(internalEmail);
        // setPassword(internalPassword);
        // if(data?.data && data.code === 100){
        //     let myToken = data.data.token;
        //     Cookies.set('token', myToken);
        //     setToken(myToken);
        //     alert(data.msg);
        //     props.onHide();
        // }
        // if(data?.data && data.code === 500){
        //     alert(data.msg);
        // }
        mutate({
            email: internalEmail,
            password: internalPassword
        });
        
    }
    useEffect(() => {
        if (data?.data && data.code === 100) {
            let myToken = data.data.token;
            Cookies.set('token', myToken);
            setToken(myToken);
            alert(data.msg);
            props.onHide();
        }
        if (data?.data && data.code === 500) {
            alert(data.msg);
        }
    }, [data]);
   // const {data,isLoading,error} = useUserEmailLogin();
    if(isLoading){
        return <HomeSpinner />
    }
    if(error){
        alert(error.message);
    }
    /* Store JWT into Cookie*/
    // useEffect(() => {
    //     /* TODO: The return code is werid , it should be 200 if Login in success*/
        
    // }, [data]);
    return (
        <Modal dialogClassName="signup-popup-modal"
               show={props.show} 
               onHide={props.onHide} 
               size="lg"
               style={{ marginTop:"100px" }}> 

            <div className="signup-popup-container">
                {/*  
                <div className="signup-popup-title">
                    Sign Up
                </div>
                */}
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
                    Log In
                </p>

                <p style={{ color:'#000',
                            fontFamily:'PingFang HK',
                            fontStyle:'normal',
                            fontSize:'16px',
                            fontWeight:400,
                            lineHeight:'160%',
                            marginTop:'-15px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Welcom Back
                </p>
                
                <div className="login-popup-username">
                    <div className="login-popup-lable">
                        <p>User Name<span class="red-asterisk">*</span></p> 
                    </div>
                    
                    <input className='login-popup-username-input'
                           type='text' 
                           placeholder='Username'
                           onChange={(event)=>setInternalEmail(event.target.value)}
                           style={{ width:'270px',
                                    height:'20px', 
                                    marginBottom:'5px', 
                                    marginLeft: '80px', 
                                    // borderColor:onClicked? '1px solid #FFA4A3':'1px solid #F8F8F8', 
                                    borderColor:'1px solid #F8F8F8',
                                    boxShadow:'0px 1px 4px 0px rgba(176, 176, 176, 0.25)',
                                    paddingLeft:'5px',
                                    fontFamily:'Lora',
                                    fontSize:'12px',
                                    fontWeight:500,
                                    letterSpacing:'0em',
                                    textAlign:'left' }}   
                    /> 
                </div>
                    
                <div className="signup-popup-password">
                    <div className="login-popup-lable">
                        <p>Password<span class="red-asterisk" style={{ color:'red', fontFamily:'Lora', fontSize:'14px', marginLeft:'2px' }}>*</span></p>
                    </div>

                    <input className='login-popup-password-input'
                           type='text' 
                           placeholder='password'
                           onChange={(event)=>setInternalPassword(event.target.value)}
                           style={{ width:'270px',
                                    height:'20px', 
                                    marginBottom:'5px', 
                                    marginLeft:'80px', 
                                    // borderColor:onClicked? '1px solid #FFA4A3':'1px solid #F8F8F8', 
                                    borderColor:'1px solid #F8F8F8',
                                    boxShadow:'0px 1px 4px 0px rgba(176, 176, 176, 0.25)',
                                    paddingLeft:'5px',
                                    fontFamily:'Lora',
                                    fontSize:'12px',
                                    fontWeight:500,
                                    letterSpacing:'0em',
                                    textAlign:'left' }}   
                    />   
                </div>

                <p style={{ color:'#000',
                            fontFamily:'Lora',
                            fontStyle:'normal',
                            fontSize:'8px',
                            fontWeight:400,
                            lineHeight:'normal',
                            marginTop:'5px',
                            marginLeft:'80px',
                            textDecorationLine:'underline' }}>
                    Forgot Password?
                </p>
                
                <p style={{ color: '#AAA',
                            fontFamily:'Lora',
                            fontStyle:'normal',
                            fontSize:'12px',
                            fontWeight:400,
                            lineHeight:'normal', 
                            marginTop:'10px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Don't have an account? 
                        <Link className="account-login"
                              style={{ color: '#FFA4A3',
                                       fontWeight:700,
                                       marginLeft:'5px' }}>
                            Sign up
                        </Link>
                </p>
                
                <div className="login-button-section">
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Log in' onClick = { handleOnClick }/> 
                </div>
                <SocialSignUP />
               
            </div>
        </Modal>
    )
}

export default LoginPopup;