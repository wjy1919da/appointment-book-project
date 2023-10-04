import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './signup-popup1.styles.scss';
// Verify Email Popup
const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}
const SignupPopup1 = (props) => {
    // const navigate = useNavigate();
    // const [IsModalOpen, setIsModalOpen] = useState(false);
    const [internalEmail, setInternalEmail] = useState('');
    const handleOnClick = () => {
        if (!internalEmail || !isValidEmail(internalEmail)) {
            alert('Error: Invalid email!');
            return;
        }
        // navigate('/download');
        // setIsModalOpen(true);
    }
    
    return (
        <Modal dialogClassName="signup-popup-modal"
               show={props.show} 
               onHide={props.onHide} 
               size="lg" // the modal will have a large size, can use the other size options such as 'sm' for small or 'xl' for extra-large
               // aria-labelledby="example-custom-modal-styling-title"
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
                            marginTop:'40px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Sign Up
                </p>
                
                {/*  
                <div className="signup-popup-username">
                    <div className="signup-popup-username-lable">
                        User Name<span class="red-asterisk">*</span>
                    </div>
                    
                    <div className="signup-popup-username-input">    
                        <input type="text" id="username" name="username"/>    
                    </div>
                </div>
                */}
                    
                <div className="signup-popup-email">
                    {/* <label className="signup-popup-email-label" for="signup-popup-email-input"> */}
                        {/*  
                        <div classname="signup-popup-email-lable">
                            Enter Your Email Address<span class="red-asterisk">*</span>
                        </div>
                        */}
                        <p style={{ color:'#352C29',
                                    fontFamily:'Lora',
                                    fontStyle:'normal',
                                    fontSize:'12px',
                                    fontWeight:400,
                                    lineHeight:'normal',
                                    marginTop:'0px',
                                    marginBottom: '0px',
                                    marginLeft:'80px',
                                    flexShrink:0 }}>
                            Enter Your Email Address
                            <span class="red-asterisk" style={{ color:'red', fontFamily:'Lora', fontSize:'14px', marginLeft:'2px' }}>*</span>
                        </p>
                    {/* </label> */}

                    <input className='signup-popup-email-input'
                           type='text' 
                           placeholder='example@email.com'
                           onChange={(event)=>setInternalEmail(event.target.value)}
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
                            marginTop:'35px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Already have an account? 
                        <Link className="account-login"
                              style={{ color: '#FFA4A3',
                                       fontWeight:700,
                                       marginLeft:'5px' }}>
                            Log in
                        </Link>
                </p>
                
                <div className="verify-email-button-section">
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Verify' herf='/download'/> 
                </div>
                    
                {/* <div className="signup-popup-gfa-section">
                    <div className="or-section">
                        <div className="or-label">- OR -</div>
                    </div>
             
                    <div className="signin-with-apple-section">
                        <SignupAndLoginButton width='220px' height='42px' borderRadius='20px' isIcon={ AppleLogo } title='Sign in with Apple' href = '/download'/>
                    </div>
                    <div className="signin-with-google-section">
                        <SignupAndLoginButton width='220px' height='42px' borderRadius='20px' isIcon={ GoogleLogo } title='Sign in with Google' href = '/download'/>
                    </div>
                    <div className="signin-with-facebook-section">
                        <SignupAndLoginButton width='220px' height='42px' borderRadius='20px' isIcon= { FacebookLogo } title='Sign in with Facebook' href = '/download'/> 
                    </div>
                </div> */}
            </div>
        </Modal>
    )
}

export default SignupPopup1;









 

 
  
                