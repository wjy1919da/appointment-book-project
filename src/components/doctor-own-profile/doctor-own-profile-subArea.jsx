import React, { useState } from 'react';
import './doctor-own-profile-subArea.styles.scss';
import DocotorOwnAbout from './doctor-own-about-area';
import DoctorProfileGrid from './doctor-own-profile-grid';
import UserProfileLike from '../user-profile-like/user-profile-like';

const DoctorProfileSubArea = () => {
  const [activeTab, setActiveTab] = useState('About'); // By default, "like" is the active taba
  const [showCreatePost, setShowCreatePost] = useState(false);
  return (
    <div className='doctor-profile-subArea-container'>
      <div className='navbar'>
        <div
          onClick={() => setActiveTab('About')}
          className={`item ${activeTab === 'About' ? 'active' : ''}`}
        >
          About
        </div>
        <div
          onClick={() => {
            setActiveTab('Posts');
            setShowCreatePost(false); // Add this line
            console.log(showCreatePost);
          }}
          className={`item ${activeTab === 'Posts' ? 'active' : ''}`}
        >
          Posts
        </div>
        <div
          onClick={() => setActiveTab('Like')}
          className={`item ${activeTab === 'Like' ? 'active' : ''}`}
        >
          Like
        </div>
      </div>
      <div className='bottom-rendering'>
        {activeTab === 'About' && <DocotorOwnAbout />}
        {activeTab === 'Posts' && <DoctorProfileGrid />}
        {activeTab === 'Likes' && <UserProfileLike />}
      </div>
    </div>
  );
};

export default DoctorProfileSubArea;
