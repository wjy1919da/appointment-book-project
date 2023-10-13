import React from 'react'
import './create-account.styles.scss'
import userInfoQueryStore from '../../../userStore.ts'
const CreateAccount = ({title,subTitle,onClick}) => {
  const switchPopupTab = userInfoQueryStore(state => state.switchPopupTab)
  return (
    <div className="create-account">
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