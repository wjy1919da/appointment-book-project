import React from 'react'
import './signup-popUp-4-download.style.scss'
import DownloadQRCode from '../../../assets/download/QR-code-iOS.png'
import CharmlifeLogo from '../../../assets/sign/charmlife-logo.png';
import NextButton from './next-button.component'; 
import userInfoQueryStore from '../../../userStore.ts';
import { useSetUserProfile } from '../../../hooks/useAuth';
import { useEffect } from 'react';
const formatTitleQuery = (title) => {
    return title.replace(/-/g, '_');
}
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
const SignUpDownloadPopUp = () => {
    const userInfo = userInfoQueryStore(state=>state.userInfo);
    const togglePopup = userInfoQueryStore(state=>state.togglePopup);
    let interestAreaName = userInfo.selectedInterests || new Set();
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
    const handleOnClick = () => {
        mutate({
          //bio: "",
          birthday: userInfo.birthday,
          gender: userInfo.gender,
          interested: interestArea,
          nickname: userInfo.username,
        });
      };
    //console.log(userInfo.username, userInfo.birthday, userInfo.gender);
    return (
        <div className='signUp-download'>
            <div className='signUp-download-header'>
                Thank you for joining us!
            </div>
            <div className='signUp-download-title'>
                Download <img className='charmlife-logo-image' src={CharmlifeLogo} alt='Charmlife Logo'/> <span className= 'signUp-title-part-2'>Charm</span>
            </div>
            <div className='signUp-download-QR-Code'>
                <img src={DownloadQRCode} alt="QR Code"></img>
            </div>
            <div className='signUp-download-button'>
                <NextButton title='Home' width='180px' height='45px' onClick={handleOnClick}/>
            </div>
        </div>
    )
}

export default SignUpDownloadPopUp