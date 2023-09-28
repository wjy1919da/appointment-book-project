import React from 'react'
import './community-send-msg.styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const CommunitySendMsg = () => {
  return (
    <div className='comment-send-button'>
        <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
    </div>
  )
}

export default CommunitySendMsg