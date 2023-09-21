//import HandWritingScrollDatePicker from '../date-picker/hand-writing-date-scroll-date-picker.component'
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './after-signup-popup3.styles.scss';
import React from 'react';
//import ScrollDatePicker from '../date-picker/scroll-date-picker.component';
//src/components/components-signup-and-login/date-picker/scroll-date-picker.component.jsx

const BirthYearPicker = ({ setActiveTab }) => {
  return (
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
                    {/* <ScrollDatePicker/> */}
                    {/* <HandWritingScrollDatePicker/> */}
                </div>        
                <div className="next-button-section">
                    <SignupAndLoginButton onClick={()=>setActiveTab('interested')} width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next'/> 
                </div>
    </div>
  )
}

export default BirthYearPicker