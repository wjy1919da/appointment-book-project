import React from 'react'
import './login-register-title.styles.scss'
const LoginRegisterTitle = ({title, subTitle, subText}) => {
  return (
    <div className='login-register-title-text-outer-container'>
        {title && <p className='login-register-title'>
                {title}
        </p>}
        <div className='login-register-subtitle-container'>
            {subTitle && <p className='login-register-sub-title'>
                    {subTitle}
            </p>}
            {subText && <p className='login-register-sub-text'> 
                    {subText}
            </p>}
        </div>
    </div>
  )
}
export default LoginRegisterTitle