import React, { useState } from 'react';

// scss
import './user-profile-subArea.styles.scss';

// components
import UserProfilePost from '../user-profile-post-area/user-profile-post-area';
import UserProfileReview from '../user-profile-review-area/user-profile-review-area';
import UserProfileLike from '../user-profile-like/user-profile-like';

// import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
// import CreatePostOfUser from '../create-post/create-post';

const UserProfileSubArea = () => {
  const [activeTab, setActiveTab] = useState('like');
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <div className='user-profile-subArea-container'>
      <div className='navbar'>
        <div
          onClick={() => setActiveTab('like')}
          className={`item ${activeTab === 'like' ? 'active' : ''}`}
        >
          Likes
        </div>
        <div
          onClick={() => {
            setActiveTab('posted');
            setShowCreatePost(false);
            console.log(showCreatePost);
          }}
          className={`item ${activeTab === 'posted' ? 'active' : ''}`}
        >
          Posts
        </div>
        <div
          onClick={() => setActiveTab('reviews')}
          className={`item ${activeTab === 'reviews' ? 'active' : ''}`}
        >
          Doctors
        </div>
        <div
          onClick={() => setActiveTab('inbox')}
          className={`item ${activeTab === 'inbox' ? 'active' : ''}`}
        >
          Inbox
        </div>
      </div>
      <div className='bottom-rendering'>
        {activeTab === 'posted' && (
          <UserProfilePost
            showCreatePost={showCreatePost}
            setShowCreatePost={setShowCreatePost}
          />
        )}
        {activeTab === 'like' && <UserProfileLike />}
        {activeTab === 'reviews' && <UserProfileReview />}
      </div>
    </div>
  );
};

export default UserProfileSubArea;
