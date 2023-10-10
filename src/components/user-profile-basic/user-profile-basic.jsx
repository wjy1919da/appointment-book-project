// import React, { useState } from 'react';

// scss
import './user-profile-page.styles.scss';
import '../components-posts/community-post/community-post.styles.scss';

// images
import UserProfilePicture from '../../assets/post/user_profile_pic.png';
import BookingIcon from '../../assets/post/booking-icon.png';
// import userVerified from '../../assets/post/UserVerifiedIconpng.png';
// import userAvatar from '../../assets/post/user-profile-avatar.png'

// components
import HomeButton from '../home-button/home-button.component';

const UserProfileBasic = () => {
  return (
    <div className='user-profile-basic-container'>
      <div className='user-profile-basic-avatar'>
        <img src={UserProfilePicture} alt='User-Image'></img>
      </div>
      <div className=' user-profile-basic-information-container'>
        <div className='user-profile-basic-name-and-editButton'>
          <div className='user-profile-basic-name'>
            <div className='user-profile-basic-name-title'>
              <span className='user-profile-basic-user-name'>Charlotte</span>
              {/* <img
                src={userVerified}
                style={{ width: '34px', height: '34px' }}
              ></img> */}
            </div>
            <div className='user-profile-basic-name-text'>
              <span className='user-profile-basic-create-name'>@username</span>
            </div>
          </div>
          <div className='wrapper'>
            <div className='user-profile-basic-edit-button'>
              <HomeButton title='Edit Profile' width='176px' height='56px' />
            </div>
            <div className='user-profile-basic-booking-button-container'>
              <button className='user-profile-basic-booking-button'>
                <img
                  src={BookingIcon}
                  alt='Booking-Icon'
                  width='35px'
                  height='33px'
                />
              </button>
            </div>
          </div>
        </div>

        <div className='user-profile-basic-info-text'>
          <span className='user-profile-basic-description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <div className='user-profile-basic-info-following-section'>
          <div className='user-profile-number-cate-combimation'>
            <span className='user-profile-black-text'>3</span>
            <span className='user-profile-gray-text'>Posts</span>
          </div>
          <div className='user-profile-number-cate-combimation'>
            <span className='user-profile-black-text'>3</span>
            <span className='user-profile-gray-text'>follower</span>
          </div>
          <div className='user-profile-number-cate-combimation'>
            <span className='user-profile-black-text'>3</span>
            <span className='user-profile-gray-text'>following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBasic;
