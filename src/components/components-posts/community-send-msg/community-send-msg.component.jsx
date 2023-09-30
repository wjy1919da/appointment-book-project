import React from 'react'
import './community-send-msg.styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const CommunitySendMsg = ({ isValid }) => {
  return (
    <button type="submit" className='comment-send-button' disabled={!isValid}>
        <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
    </button>
  );
};

export default CommunitySendMsg