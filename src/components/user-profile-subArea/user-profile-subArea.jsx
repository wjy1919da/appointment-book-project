import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// scss
import './user-profile-subArea.styles.scss';

// components
import UserProfilePost from '../user-profile-post-area/user-profile-post-area';
import UserProfileReview from '../user-profile-review-area/user-profile-review-area';
import UserProfileLike from '../user-profile-like/user-profile-like';

// import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
// import CreatePostOfUser from '../create-post/create-post';

const UserProfileSubArea = () => {
  const [activeTab, setActiveTab] = useState('Likes');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const { hash } = useLocation();

  useEffect(() => {
    const cleanHash = hash.replace('#', '');
    if (
      cleanHash === 'Likes' ||
      cleanHash === 'Posts' ||
      cleanHash === 'Doctors' ||
      cleanHash === 'Inbox'
    ) {
      setActiveTab(cleanHash);
    }
  }, [hash]);

  return (
    <div className='user-profile-subArea-container'>
      <div className='navbar'>
        <div
          onClick={() => setActiveTab('Likes')}
          className={`item ${activeTab === 'Likes' ? 'active' : ''}`}
        >
          <a href='#Likes' className='nav-tab-likes'>
            Likes
          </a>
        </div>
        <div
          onClick={() => {
            setActiveTab('Posts');
            setShowCreatePost(false);
            console.log(showCreatePost);
          }}
          className={`item ${activeTab === 'Posts' ? 'active' : ''}`}
        >
          <a href='#Posts' className='nav-tab-posts'>
            Posts
          </a>
        </div>
        <div
          onClick={() => setActiveTab('Reviews')}
          className={`item ${activeTab === 'Reviews' ? 'active' : ''}`}
        >
          <a href='#Doctors' className='nav-tab-doctors'>
            Doctors
          </a>
        </div>
        <div
          onClick={() => setActiveTab('Inbox')}
          className={`item ${activeTab === 'Inbox' ? 'active' : ''}`}
        >
          <a href='#Inbox' className='nav-tab-inbox'>
            Inbox
          </a>
        </div>
      </div>
      <div className='bottom-rendering'>
        {activeTab === 'Likes' && <UserProfileLike />}
        {activeTab === 'Posts' && <UserProfilePost />}
        {activeTab === 'Reviews' && <UserProfileReview />}
      </div>
      {/* <div className='bottom-rendering'>
        {activeTab === 'Posts' && (
          <UserProfilePost
            showCreatePost={showCreatePost}
            setShowCreatePost={setShowCreatePost}
          />
        )}
        {activeTab === 'Like' && <UserProfileLike />}
        {activeTab === 'Reviews' && <UserProfileReview />}
      </div> */}
    </div>
  );
};

export default UserProfileSubArea;
