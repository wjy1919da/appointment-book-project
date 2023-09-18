import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import MaleIcon from '../../../assets/sign/male-icon.jpg';
import FemaleIcon from '../../../assets/sign/female-icon.jpg';
import OtherIcon from '../../../assets/sign/other-icon.jpg';
import './after-signup-popup1.styles.scss';

const AfterSignupPopup1 = (props) => {
    // useState hook returns an array where the first element (selectedImage) is the current state value, 
    // and the second element (setSelectedImage) is the function you use to update the state
    const [selectedImage, setSelectedImage] = useState(null);

    // useEffect(() => {
        const handleImageClick = (imageName) => { 
            // Handle the image click event
            setSelectedImage(imageName);

            // Log or perform actions based on the clicked image
            console.log(`Clicked on ${imageName}`);
        };

        // Add click event listener to the clicked/selected image
        // selectedImage.addEventListener('click', handleImageClick);
    
        // Cleanup function to remove the event listener when the component unmounts
        // return () => {
            // selectedImage.removeEventListener('click', handleImageClick);
        // };
    // }, []);
    
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
                             onClick={() => handleImageClick('male-icon-image')}/>
                    </div>

                    <div className='female-option' style={{ display:'flex',
                                                          flexShrink:0,
                                                          flexdirection:'column',
                                                          justifyContent:'center', 
                                                          flexShrink:0 }}>
                        <img className='female-icon-image' 
                             src={FemaleIcon} 
                             alt='Female Option'
                             onClick={() => handleImageClick('female-icon-image')}/>
                    </div>

                    <div className='other-option' style={{ display:'flex',
                                                          flexShrink:0,
                                                          flexdirection:'column',
                                                          justifyContent:'center', 
                                                          flexShrink:0 }}>
                        <img className='other-icon-image' 
                             src={OtherIcon} 
                             alt='Other Option'
                             onClick={() => handleImageClick('other-icon-image')}/>
                    </div>
                </div>
                    
                <div className="next-button-section">
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next' herf='/download'/> 
                </div>
            </div>
        </Modal>
    )
}

export default AfterSignupPopup1;