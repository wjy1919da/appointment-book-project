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
                <p key={nanoid()}>{submenuItem}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettingSubMenu;
