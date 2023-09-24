import React from 'react'
import './login-register-title.styles.scss'
const LoginRegisterTitle = ({title, subTitle}) => {
  return (
    <div>
        {title && <p className='login-register-title'>
                {title}
        </p>}
        {subTitle && <p className='login-register-sub-title'>
                {subTitle}
        </p>}
    </div>
  )
}
export default LoginRegisterTitle