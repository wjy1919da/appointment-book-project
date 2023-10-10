import React from 'react'
import './signup-popUp-4-download.style.scss'
import DownloadQRCode from '../../../assets/download/QR-code-iOS.png'
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component'
import CharmlifeLogo from '../../../assets/sign/charmlife-logo.png';
import NextButton from './next-button.component'; 

const SignUpDownloadPopUp = () => {
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
            <NextButton title='Home' width='180px' height='45px'/>
        </div>
    </div>
  )
}

export default SignUpDownloadPopUp