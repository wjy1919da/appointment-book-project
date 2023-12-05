import './log-in-access-popup.scss';
import Logo from '../../assets/home/logo.png';
import { useState } from 'react';

const LogInAccessPopUp = ({closingCallback}) => {
    return (
        <div onClick={() => closingCallback()} className='grayed-out-container'>
            <div className='log-in-access-popup-container'>
                <div className='log-in-access-popup'>
                    <div className='log-in-access-popup-logo-container'>
                        <img className='log-in-access-popup-logo' src={Logo} alt='logo' />
                    </div>
                    <div className='log-in-access-popup-text-container'>
                        <h3 className='log-in-access-popup-text' >Login to access this feature!</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInAccessPopUp;