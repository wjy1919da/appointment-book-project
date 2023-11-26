import React from 'react';
import { nanoid } from 'nanoid';

// scss
import './account-setting-sub-menu.scss';

const AccountSettingSubMenu = () => {
  const subMenuData = [
    {
      id: nanoid(),
      title: 'Security',
      menu: ['Change Password', 'Security Questions', 'Login History'],
    },
    {
      id: nanoid(),
      title: 'Payment',
      menu: ['Payment Method', 'Billing Address', 'Subscription'],
    },
    {
      id: nanoid(),
      title: 'Privacy',
      menu: ['Profile Visibility', 'Data Sharing', 'Activity Status'],
    },
    {
      id: nanoid(),
      title: 'Deactivation & Deletion',
      menu: ['Deactivate Account', 'Delete Account'],
    },
  ];

  return (
    <div className='account-setting-sub-menu-container'>
      <div className='account-setting-sub-menu-inner-container'>
        {subMenuData.map((menuItem) => (
          <div
            className='account-setting-sub-menu-individual-container'
            key={menuItem.id}
          >
            <h2 className='sub-menu-title'>{menuItem.title}</h2>
            <div className='sub-menu-list'>
              {menuItem.menu.map((submenuItem) => (
                <div className='sub-menu-item'>
                  <p key={nanoid()}>{submenuItem}</p>
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5' stroke='%23E2E3E7' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
                    alt='Image-Icon'
                    className='sub-menu-icon'
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettingSubMenu;
