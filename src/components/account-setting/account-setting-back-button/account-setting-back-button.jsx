import React from 'react';

// scss
import './account-setting-back-button.scss';

// image
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';

const BackButton = ({ backButtonName, onClick }) => {
  return (
    <div className='account-setting-back-button-container'>
      <img
        src={Arrow}
        alt='Icon-Image'
        className='account-setting-back-button-icon'
        onClick={onClick}
      />
      <button className='account-setting-back-button' onClick={onClick}>
        {backButtonName}
      </button>
    </div>
  );
};

export default BackButton;
