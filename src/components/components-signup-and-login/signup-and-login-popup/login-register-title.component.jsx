import React from 'react'
import './login-register-title.styles.scss'
const LoginRegisterTitle = ({title}) => {
  return (
     <div>
        {title && <div className='login-register-title'>
                {title}
        </div>}
    </div>
  )
}
export default LoginRegisterTitle