import React from 'react'
import './create-account.styles.scss'
import userInfoQueryStore from '../../../userStore.ts'
import refresh from '../../../assets/sign/refresh.svg'
const CreateAccount = ({title,subTitle,onClick,icon}) => {
  const switchPopupTab = userInfoQueryStore(state => state.switchPopupTab)
  return (
    <div className="create-account">
        {icon && <img src={refresh} alt="refresh" style={{ width: '12px', height: '12px', marginRight: '4px' }} />}
        {title && <span>{title}</span>}
        {subTitle && 
            <button 
                style={{ color: '#F48C8A', textDecoration: 'none', background: 'none', border: 'none', fontSize: '12px', marginLeft: '4px' }} 
                onClick={onClick}>
                {subTitle}
            </button>
        }
    </div>
  )
}

export default CreateAccount