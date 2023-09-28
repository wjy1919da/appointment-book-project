import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import ProcedureIconGrid from '../instrument-icon-grid/instrument-icon-grid.component';
import React from 'react';
import './after-signup-popup3.styles.scss';
import userInfoQueryStore from '../../../userStore.ts';

const ChooseInterestedArea = () => {
  const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
  const setInterested = userInfoQueryStore(state=>state.setInterested);
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
                    <ProcedureIconGrid names={['breast-augmentation', 'botox-injections', 'chemical-peels','fox-eyes','lip-augmentation','laser-hair-removal','teeth-whitening','chin-implants','neck-contouring']}/> 
                </div>  
                <div className='skip-container'>
                    <div className='skip' onClick={()=>{switchPopupTab('success'); setInterested(new Set())}}>skip</div>  
                </div>             
                <div className="next-button-section">
                    
                    <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' title='Next' onClick={()=>switchPopupTab('success')}/> 
                </div>
            </div>
  )
}

export default ChooseInterestedArea