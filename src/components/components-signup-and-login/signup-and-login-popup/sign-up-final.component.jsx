import React from 'react'
import './after-signup-popup4.styles.scss';
import CharmlifeLogo from '../../../assets/sign/charmlife-logo.png';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
const SignUpFinal = ({onHide}) => {
  return (
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
        <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Done' onClick={onHide}/> 
    </div>
</div>
  )
}

export default SignUpFinal