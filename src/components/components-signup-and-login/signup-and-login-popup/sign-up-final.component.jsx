import React from 'react'
import './after-signup-popup4.styles.scss';
import CharmlifeLogo from '../../../assets/sign/charmlife-logo.png';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import userInfoQueryStore from '../../../userStore.ts';
import { useSetUserProfile } from '../../../hooks/useAuth';
import { useEffect } from 'react';
const formatTitleQuery = (title) => {
  return title.replace(/-/g, '_');
}
const SignUpFinal = () => {
  const userInfo = userInfoQueryStore(state=>state.userInfo);
  const togglePopup = userInfoQueryStore(state=>state.togglePopup);
  let interestAreaName = userInfo.selectedInterests || new Set();
  console.log("interestArea in final",interestAreaName);
  /* convert name to id */
  const procedureToIdMapping = {
    botox_injections: 1,
    breast_augmentation: 2,
    chemical_peels: 3,
    fox_eyes: 4,
    lip_augmentation: 5,
    laser_hair_removal: 6,
    teeth_whitening: 7,
    chin_implants: 8,
    neck_contouring: 9,
    facelift: 10,
    otoplasty: 11,
    tummy_tuck: 12,
    coolsculpting: 13,
    InMode: 14,
    thermage: 15,
    fraxel_laser: 16
  };
  // Convert interestArea names to IDs
  // Convert interestArea names to IDs
  const interestArea = Array.from(interestAreaName).map(name => {
    // Ensure name is a string before passing it to formatTitleQuery
    if (typeof name !== 'string') {
        console.error('Expected string for interest area name, got:', name);
        return null;
    }

    const formattedName = formatTitleQuery(name);
    return procedureToIdMapping[formattedName];
  }).filter(Boolean);  // This will filter out any null or undefined values

  const {mutate,data,isLoading,isError,error} = useSetUserProfile();
  const handleOnClick = ()=>{
      mutate({
          gender: userInfo.gender,
          interestArea: interestArea,
          email: userInfo.email,
          birthday: userInfo.birthday,
          nickname: userInfo.username,
      });
  }
  useEffect(() => {
      if (data?.data && data.code === 100) {
          alert(data.msg);
          togglePopup(false);
          //props.onHide();
      }
      if (data?.data && data.code === 500) {
          alert(data.msg);
      }
  }, [data]);
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
        <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' title='Done' onClick={handleOnClick}/> 
    </div>
</div>
  )
}

export default SignUpFinal