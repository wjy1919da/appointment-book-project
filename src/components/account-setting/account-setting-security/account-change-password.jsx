import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import PinkBackground from '../account-setting-background/account-setting-background';
import Button from '../../components-posts/community-post-button/community-post-button';
import AccountSettingSubMenu from '../account-setting-sub-menu/account-setting-sub-menu';

// scss
import './account-change-password.scss';
import BackButton from '../account-setting-back-button/account-setting-back-button';

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleClickGoBack = () => {
    navigate('/AccountSetup');
  };

  return (
    <div className='account-setting-change-password-container'>
      <PinkBackground />
      <AccountSettingSubMenu />
      <BackButton backButtonName='Account Setting' onClick={handleClickGoBack} />
      <div className='account-setting-change-password-right-container'>
        <Button
          buttonName='Save Changes'
          className='account-setting-change-password-button'
        />
        <form className='account-setting-change-password-form'>
          <h2>Change Password</h2>

          <label
            htmlFor='linked-password'
            className='account-setting-change-password-label'
          >
            Current Password
          </label>
          <input
            type='text'
            id='linked-password'
            placeholder='Enter something.'
            className='account-setting-change-password-input'
          />

          <label
            htmlFor='linked-new-password'
            className='account-setting-change-password-label'
          >
            New Password
          </label>
          <input
            type='text'
            id='linked-new-password'
            placeholder='Enter something.'
            className='account-setting-change-password-input'
          />

          <label
            htmlFor='linked-new-password-2'
            className='account-setting-change-password-label'
          >
            New Password
          </label>
          <input
            type='text'
            id='linked-new-password-2'
            placeholder='Enter something.'
            className='account-setting-change-password-input'
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;