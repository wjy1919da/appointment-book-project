import React from 'react'
import './login-register-title.styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const LoginRegisterTitle = ({title, handleBackwards, handleSkip}) => {
  return (
     <div className='login-register-title-container'>
       {handleBackwards &&<FontAwesomeIcon icon={faArrowLeft} size="xl" onClick={handleBackwards}/> }
       {title && <div className='login-register-title'>
                {title}
        </div>}
       {handleSkip&&<div className='login-register-title-skip' onClick={handleSkip}>skip</div>}
    </div>
  )
}
export default LoginRegisterTitle