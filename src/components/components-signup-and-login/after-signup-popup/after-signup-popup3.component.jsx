import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import InstrumentIconGrid from "../instrument-icon-grid/instrument-icon-grid.component";
// import BotoxInjections from '../../../assets/sign/breast-augmentation-1.png';
// import FemaleIcon from '../../../assets/sign/botox-injections-1.png';
// import ChemicalPeels from '../../../assets/sign/chemical-peels-1.png';
// import FoxEyes from '../../../assets/sign/fox-eyes-1.png';
// import LipAugmentation from '../../../assets/sign/lip-augmentation-1.png';
// import LaserHairRemoval from '../../../assets/sign/laser-hair-removal-1.png';
// import TeethWhitening from '../../../assets/sign/teeth-whitening-1.png';
// import ChinImplants from '../../../assets/sign/chin-implants-1.png';
// import NeckContouring from '../../../assets/sign/neck-contouring-1.png';
// import InstrumentIconGrid from '../instrument-icon-grid/instrument-icon-grid.component'
import './after-signup-popup3.styles.scss';

const AfterSignupPopup3 = (props) => {
    // onClick可以做两件事: 切换css class到active效果, 记录选择
    
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
                    This will help personalize our recommendations
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
                    Choose 3 or more areas of interest
                </p>

                <div>
                    <InstrumentIconGrid names={['breast-augmentation', 'botox-injections', 'chemical-peels','fox-eyes','lip-augmentation','laser-hair-removal','teeth-whitening','chin-implants','neck-contouring']}/> 
                </div>    
                             
                <div className="next-button-section">
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next' herf='/download'/> 
                </div>
            </div>
        </Modal>
    )
}

export default AfterSignupPopup3;