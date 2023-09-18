import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import CharmlifeLogo from '../../../assets/sign/charmlife-logo.png';
import './after-signup-popup4.styles.scss';

const AfterSignupPopup4 = (props) => {
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
                            lineHeight:'135%',
                            marginTop:'40px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Thank You
                </p>

                <p style={{ color:'#000',
                            fontFamily:'Lora',
                            fontStyle:'normal',
                            fontSize:'12px',
                            fontWeight:600,
                            lineHeight:'100%',
                            marginTop:'0px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Welcome to the Charm Life Family
                </p>
                
                <div className="charmlife-logo-section">
                    <img className='charmlife-logo-image' src={CharmlifeLogo} alt='Charmlife Logo'/>
                </div>
                    
                <p style={{ color:'#000',
                            fontFamily:'Playfair Display',
                            fontStyle:'normal',
                            fontSize:'22px',
                            fontWeight:700,
                            lineHeight:'135%',
                            marginTop:'30px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Tagline
                </p>
                
                <div className="done-button-section">
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Done' herf='/download'/> 
                </div>
            </div>
        </Modal>
    )
}

export default AfterSignupPopup4;