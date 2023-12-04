import React from 'react';

// components
import PinkBackground from '../account-setting-background/account-setting-background';
import AccountSettingSubMenu from '../account-setting-sub-menu/account-setting-sub-menu';

// scss
import './account-login-history.scss';
import BackButton from '../account-setting-back-button/account-setting-back-button';

const LoginHistory = () => {
  return (
    <div className='account-setting-login-history-container'>
      <PinkBackground />
      <AccountSettingSubMenu />
      <BackButton backButtonName='Account Setting' />
      <div className='account-setting-login-history-right-container'>
        <form className='account-setting-login-history-form'>
          <h2 className='account-setting-login-history-title'>Login History</h2>
          <div className='account-setting-login-history-list-title'>
            <p>Device</p>
            <p>IP Address</p>
            <p>Login Time</p>
          </div>

          <div className='account-setting-login-hitosry-list'>
            <p>Web</p>
            <p>10.23.23.213</p>
            <p>10 minutes ago</p>
          </div>

          <div className='account-setting-login-hitosry-list'>
            <p>Web</p>
            <p>10.23.23.213</p>
            <p>10 minutes ago</p>
          </div>

          <div className='account-setting-login-hitosry-list'>
            <p>Web</p>
            <p>10.23.23.213</p>
            <p>10 minutes ago</p>
          </div>

          <div className='account-setting-login-hitosry-list'>
            <p>Web</p>
            <p>10.23.23.213</p>
            <p>10 minutes ago</p>
          </div>

          <div className='account-setting-login-hitosry-list'>
            <p>Web</p>
            <p>10.23.23.213</p>
            <p>10 minutes ago</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginHistory;