import React from 'react'
import './signup-popUp-4-download.style.scss'
import DownloadQRCode from '../../../assets/download/QR-code-iOS.png'
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component'
const SignUpDownloadPopUp = () => {
  return (
    <div className='signUp-download'>
        <div className='signUp-download-title'>
            Download or App
        </div>
        <div className='signUp-download-text'>
            Scan the QR code with your phone's camera to download our free app
        </div>
        <div className='signUp-download-QR-Code'>
            <img src ={DownloadQRCode}></img>
        </div>
        <div className='signUp-download-button'>
            <SignupAndLoginButton title ='Complete profile' width='180px' height='45px'/>
        </div>
    </div>
  )
}
export default SignUpDownloadPopUp