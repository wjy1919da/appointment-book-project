import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
//import DatePicker from 'react-datepicker';
// import DatePicker from 'react-mobile-datepicker';
// import BirthdayPicker from '../date-picker/date-picker.component';
// import ScrollDatePicker from '../date-picker/scroll-date-picker.component';
import HandWritingScrollDatePicker from '../date-picker/hand-writing-date-scroll-date-picker.component'
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './after-signup-popup3.styles.scss';

const AfterSignupPopup2 = (props) => {
    return (
        <Modal dialogClassName="signup-popup-modal"
               show={props.show} 
               onHide={props.onHide} 
               size="lg" // the modal will have a large size, can use the other size options such as 'sm' for small or 'xl' for extra-large
               // aria-labelledby="example-custom-modal-styling-title"
               style={{ marginTop:"100px" }}> 
            <div className="signup-popup-container">
                <p style={{ color:'#000',
                            fontFamily:'Playfair Display',
                            fontStyle:'normal',
                            fontSize:'36px',
                            fontWeight:400,
                            lineHeight:'nornal',
                            marginTop:'25px',
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
                            fontWeight:400,
                            lineHeight:'normal',
                            marginTop:'-12px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center', 
                            flexShrink:0 }}>
                    This will not be displayed publicly
                </p>

                <p style={{ color:'#000',
                            fontFamily:'Lora',
                            fontStyle:'normal',
                            fontSize:'12px',
                            fontWeight:600,
                            lineHeight:'135%',
                            marginTop:'-15px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Please select your birthday
                </p>

                <div>
                    <HandWritingScrollDatePicker/>
                </div>    
                             
                <div className="next-button-section">
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next' herf='/download'/> 
                </div>
            </div>
        </Modal>
    )
}

export default AfterSignupPopup2;