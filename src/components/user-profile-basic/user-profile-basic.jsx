// import React, { useState } from 'react';

// scss
import './user-profile-page.styles.scss';
import '../components-posts/community-post/community-post.styles.scss';
import { useNavigate } from 'react-router-dom';

// images
import UserProfilePicture from '../../assets/post/user_profile_pic.png';
// import BookingIcon from '../../assets/post/booking-icon.png';

// components
import HomeButton from '../home-button/home-button.component';
import AppInfoQueryStore from '../../appointmentStore.ts';
import userInfoQueryStore from '../../userStore';
// import { useGetUserInfo } from "../../hooks/useAuth";
// import { useEffect, useState } from "react";

const UserProfileBasic = () => {
  const navigate = useNavigate();
  // const { data, isLoading, isError, error } = useGetUserInfo();
  const togglePopup = AppInfoQueryStore((state) => state.togglePopup);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const navigateToAppointment = () => {
    navigate("/userAppointment");
  };
  const navigateToEditProfile = () => {
    navigate('/userProfileEdit');
  };
  return (
    <div className='user-profile-basic-container'>
      <div className='image-and-name-and-button-container'>
        <div className='user-profile-basic-avatar'>
          <img
            src={UserProfilePicture}
            alt='User-Image'
            className='user-profile-image'
          />
        </div>

        {/* <div className='user-profile-basic-information-container'> */}
        <div className='test'>
          <div className='user-profile-basic-name-and-editButton'>
            <div className='user-profile-basic-name'>
              <div className='user-profile-basic-name-title'>
                <span className='user-profile-basic-user-name'>
                  {userInfo.username || `User ${userInfo.id}`}
                </span>
                {/* <img
                src={userVerified}
                style={{ width: '34px', height: '34px' }}
              ></img> */}
              </div>
              <div className='user-profile-basic-name-text'>
                <span className='user-profile-basic-create-name'>
                  @{userInfo.username || `User ${userInfo.id}`}
                </span>
              </div>
            </div>
            <div className='wrapper'>
              <div className='user-profile-basic-edit-button'>
                <HomeButton
                  title='Edit Profile'
                  width='176px'
                  height='56px'
                  onClick={navigateToEditProfile}
                />
              </div>
              {/* <div className="user-profile-basic-booking-button-container">
              <button
                className="user-profile-basic-booking-button"
                onClick={navigateToAppointment}
              >
                <img
                  src={BookingIcon}
                  alt="Booking-Icon"
                  width="35px"
                  height="33px"
                />
              </button>
            </div> */}
            </div>
          </div>

          <div className='description-and-followers-container'>
            <div className='user-profile-basic-info-text'>
              Beauty Lover.
              {userInfo.description && (
                <span className='user-profile-basic-description'>
                  {userInfo.description}
                </span>
              )}
            </div>
            <div className='user-profile-basic-info-following-section'>
              <div className='user-profile-number-cate-combimation'>
                <span className='user-profile-black-text'>
                  {userInfo.postCount || 0}
                </span>
                <span className='user-profile-gray-text'>Posts</span>
              </div>
              <div className='user-profile-number-cate-combimation'>
                <span className='user-profile-black-text'>
                  {userInfo.followerCount || 0}
                </span>
                <span className='user-profile-gray-text'>follower</span>
              </div>
              <div className='user-profile-number-cate-combimation'>
                <span className='user-profile-black-text'>
                  {userInfo.followingCount || 0}
                </span>
                <span className='user-profile-gray-text'>following</span>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default UserProfileBasic;
