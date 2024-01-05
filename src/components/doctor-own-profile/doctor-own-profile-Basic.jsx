import React, { useState } from 'react';

import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

// components
import DoctorOwnProfileEditButton from './doctor-own-profile-edit-button';

// stores
import userInfoQueryStore from '../../userStore';
import doctorInfoQueryStore from '../../doctorStore';

// scss
import './doctor-own-profile-Basic.styles.scss';

// images
import doctorVerify from '../../assets/doctor/Group.png';
import glassIcon from '../../assets/user/glassesIcon.png';
import badgeIcon from '../../assets/user/badgeIcon.png';
import locationIcon from '../../assets/user/locationIcon.png';
import gradIcon from '../../assets/user/Graduation Cap.png';
import certified from '../../assets/user/Certificate.png';
import Verification from '../../assets/doctor/doctor-verification-status.svg';

// import doctorAvartar from '../../assets/doctor/doctor-profile-image.png';
// import { useGetUserInfo } from '../../hooks/useAuth';
// import { Link } from 'react-router-dom';
// import HomeSpinner from '../home-spinner/home-spinner.component';
import calendar from '../../assets/doctor/calendar.png';

const DocotorOwnBasic = () => {
  const [showManageButton, setShowManageButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const navigate = useNavigate();

  const handleFirstButtonClick = () => {
    setShowManageButton(true);
    navigate('/doctor-profile-appointment');
  };

  const onClick = () => {
    navigate('/doctorProfileEdit');
  };
  const handleVerificationClick = () => {
    navigate('/doctorVerification'); // Replace '/doctorVerification' with the actual path
  };

  // screen size
  const isIpadScreen = useMediaQuery({
    query: '(max-width: 744px)',
  });

  const handleAvatarError = (e) => {
    setIsLoading(true);
  };

  return (
    <div className='doctor-own-basic-conatiner '>
      <div className='doctor-own-basic-avatar'>
        {userInfo.avatar && !isLoading ? (
          <img
            src={userInfo.avatar}
            onError={handleAvatarError}
            className='doctor-own-avatar-img'
          ></img>
        ) : (
          <div className='profile-grey-avatar'></div>
        )}
      </div>
      <div className='doctor-own-basic-info'>
        <div className='doctor-own-basic-top-name'>
          <div className='doctor-own-basic-name'>
            <span className='doctor-own-name-text'>
              {userInfo.username || `User ${userInfo.userId}`}
            </span>
            <button
              className='doctor-profile-verification-button'
              onClick={handleVerificationClick}
            >
              <img src={Verification} alt='Icon-Verification' />

              {/* this part is uncommented due to design change */}
              {/* {userInfo.verificationStatus === 0
                ? "Verification"
                : userInfo.verificationStatus === 1
                ? "Verified"
                : "Rejected"} */}
            </button>
          </div>
          <div className='doctor-own-basic-edits-buttons'>
            {/* <Link to="/doctorProfileEdit" className="top-edit-button-1">
              edit profile
            </Link> */}
            {isIpadScreen ? (
              ''
            ) : (
              <>
                <DoctorOwnProfileEditButton
                  onClick={onClick}
                  title='Edit profile'
                />

                <button
                  onClick={handleFirstButtonClick}
                  className='top-edit-button-2'
                >
                  <img src={calendar} className='doctor-calendar-img'></img>
                </button>
              </>
            )}
          </div>
        </div>
        <div className='doctor-own-basic-top-text'>
          <div className='doctor-own-basic-specialization'>
            {userInfo.description && (
              <span className='doctor-specialization-text'>
                {userInfo.description}
              </span>
            )}
          </div>
          <div className='doctor-own-basic-app-button'>
            {showManageButton && (
              <button className='text-management-button'>
                Manage Appointments
              </button>
            )}
          </div>
        </div>
        <div className='doctor-own-basic-medium'>
          <div className='doctor-follow-like-follower'>
            <span className='doctor-follow-number'>
              {userInfo.postCount || 0}
            </span>
            <span className='doctor-own-follow-text'>posts</span>
          </div>
          <div className='doctor-follow-like-follower'>
            <span className='doctor-follow-number'>
              {userInfo.followerCount || 0}
            </span>
            <span className='doctor-own-follow-text'>follower</span>
          </div>
          <div className='doctor-follow-like-follower'>
            <span className='doctor-follow-number'>
              {userInfo.followingCount || 0}
            </span>
            <span className='doctor-own-follow-text'>following</span>
          </div>
        </div>
        <div className='doctor-own-basic-bottom'>
          <div className='doctor-info-category'>
            <img src={locationIcon} className='doctor-own-info-icon'></img>
            <span className='doctor-own-info-text'>City,State</span>
          </div>
          <div className='doctor-info-category'>
            <img src={glassIcon} className='doctor-own-info-icon'></img>
            <span className='doctor-own-info-text'>Specilization in Field</span>
          </div>
          <div className='doctor-info-category'>
            <img src={badgeIcon} className='doctor-own-info-icon'></img>
            <span className='doctor-own-info-text'>Verified by CharmLife</span>
          </div>
          <div className='doctor-info-category'>
            <img src={gradIcon} className='doctor-own-info-icon'></img>
            <span className='doctor-own-info-text'>University of Arizona</span>
          </div>
          <div className='doctor-info-category'>
            <img src={certified} className='doctor-own-info-icon'></img>
            <span className='doctor-own-info-text'>
              Board Certified Dermetiologist
            </span>
          </div>
        </div>
        {isIpadScreen && (
          <div style={{ display: 'flex', gap: '15px' }}>
            <DoctorOwnProfileEditButton
              onClick={onClick}
              title='Edit profile'
            />
            <button
              onClick={handleFirstButtonClick}
              className='top-edit-button-2'
            >
              <img src={calendar} className='doctor-calendar-img'></img>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocotorOwnBasic;
