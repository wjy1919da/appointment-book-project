// import React, { useState } from 'react';

// scss
import './user-profile-page.styles.scss';
import '../components-posts/community-post/community-post.styles.scss';
import { useNavigate } from 'react-router-dom';
// images
import UserProfilePicture from '../../assets/post/user_profile_pic.png';
import BookingIcon from '../../assets/post/booking-icon.png';
// import userVerified from '../../assets/post/UserVerifiedIconpng.png';
// import userAvatar from '../../assets/post/user-profile-avatar.png'

// components
import HomeButton from '../home-button/home-button.component';
import AppInfoQueryStore from '../../appointmentStore.ts'
import { useGetUserInfo } from '../../hooks/useAuth';
import { useState } from 'react';

const UserProfileBasic = () => {
  const {data, isLoading, isError, error} = useGetUserInfo();
  const appInfo = AppInfoQueryStore(state => state.appointInfo);
  const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
  //const [isCardClicked, setIsCardClicked] = useState(false);
  const navigate = useNavigate();

  const navigateToAppointment = () => {
    togglePopup(true,'mainSection')
    navigate('/userAppointment');
  };
  const navigateToEditProfile = () =>
  {
    navigate('/userProfileEdit');
  }
  return (
    <div className='user-profile-basic-container'>
      <div className='user-profile-basic-avatar'>
        <img src={UserProfilePicture} alt='User-Image'></img>
      </div>
      <div className=' user-profile-basic-information-container'>
        <div className='user-profile-basic-name-and-editButton'>
          <div className='user-profile-basic-name'>
            <div className='user-profile-basic-name-title'>
              {data?.data?.nickname && <span className='user-profile-basic-user-name'>{data?.data?.nickname}</span>}
              {/* <img
                src={userVerified}
                style={{ width: '34px', height: '34px' }}
              ></img> */}
            </div>
            <div className='user-profile-basic-name-text'>
              <span className='user-profile-basic-create-name'>@{data?.data?.nickname}</span>
            </div>
          </div>
          <div className='wrapper'>
            <div className='user-profile-basic-edit-button'>
              <HomeButton title='Edit Profile' width='176px' height='56px' 
                  onClick={navigateToEditProfile}
              />
            </div>
            <div className='user-profile-basic-booking-button-container'>
              <button className='user-profile-basic-booking-button'
                      onClick={navigateToAppointment}
              >
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
            {data?.data?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </span>
        </div>
        <div className='user-profile-basic-info-following-section'>
          <div className='user-profile-number-cate-combimation'>
            <span className='user-profile-black-text'>{data?.data?.postsNumber || 0}</span>
            <span className='user-profile-gray-text'>Posts</span>
          </div>
          <div className='user-profile-number-cate-combimation'>
            <span className='user-profile-black-text'>{data?.data?.followers || 0}</span>
            <span className='user-profile-gray-text'>follower</span>
          </div>
          <div className='user-profile-number-cate-combimation'>
            <span className='user-profile-black-text'>{data?.data?.followings || 0}</span>
            <span className='user-profile-gray-text'>following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBasic;
