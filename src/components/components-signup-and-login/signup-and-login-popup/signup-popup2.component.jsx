import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import AppleLogo from '../../../assets/sign/apple-logo.png';
import GoogleLogo from '../../../assets/sign/google-logo.png';
import FacebookLogo from '../../../assets/sign/facebook-logo.png';
import './signup-popup2.styles.scss';

const SignupPopup2 = (props) => {
    // const navigate = useNavigate();
    // const [IsModalOpen, setIsModalOpen] = useState(false);
    const [internalEmail, setInternalEmail] = useState('');
    const handleOnClick = () => {
        if (!internalEmail) {
            alert('Error: Input can not be empty!');
        } 
        else {
            //setInternalEmail(internalEmail.replace(/ /g, '_'));
            let cleanEmail = internalEmail.replace(/ /g, '_');
            // navigate(`/procedure/${cleanProcedure}`);
            // onHide();// Close the modal
        }
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
                            marginTop:'30px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Sign Up
                </p>
                    
                <div className="signup-popup-email">
                    {/* <label className="signup-popup-email-label" for="signup-popup-email-input"> */}
                        {/*  
                        <div classname="signup-popup-email-lable">
                            Enter Your Email Address<span class="red-asterisk">*</span>
                        </div>
                        */}
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
                            marginTop:'25px',
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
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Cancel' herf='/download' onClick = { handleOnClick }/> 
                </div>
                    
                <div className="signup-popup-gfa-section">
                    <div className="or-section">
                        {/* <div className="line-separator"></div>  */}
                        <div className="or-label">- OR -</div>
                        {/* <div class="line-separator"></div> */}
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
                </div>
            </div>
        </Modal>
    )
}

export default SignupPopup2;