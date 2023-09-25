import React, { useState } from 'react';
import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
import CreatePostOfUser from '../create-post/create-post';
import './user-profile-subArea.styles.scss';
import UserProfilePost from '../user-profile-post-area/user-profile-post-area';
import UserProfileReview from '../user-profile-review-area/user-profile-review-area';
import UserProfileLike from '../user-profile-like/user-profile-like';
const UserProfileSubArea = () => {
    const [activeTab, setActiveTab] = useState("like");  // By default, "like" is the active taba
    const [showCreatePost, setShowCreatePost] = useState(false);
    return (
        <div className="user-profile-subArea-container">
            <div className="navbar">
                <div onClick={() => setActiveTab("like")} className={`item ${activeTab === "like" ? "active" : ""}`}>Like</div>
                <div onClick={() => {
                    setActiveTab("posted");
                    setShowCreatePost(false);  // Add this line
                    console.log(showCreatePost);
                }} className={`item ${activeTab === "posted" ? "active" : ""}`}>Posted</div>
                <div onClick={() => setActiveTab("reviews")} className={`item ${activeTab === "reviews" ? "active" : ""}`}>Reviews</div>
            </div>
            <div className="bottom-rendering">
            {activeTab === "posted" && <UserProfilePost showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />}
            {activeTab === "like" && <UserProfileLike/>
            }
            {activeTab === "reviews" && <UserProfileReview/>}
            </div>
        </div>
    )
}

export default UserProfileSubArea;