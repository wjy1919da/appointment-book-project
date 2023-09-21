import React, { useState } from 'react';
import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
import CreatePostOfUser from '../create-post/create-post';
import './user-profile-subArea.styles.scss';
import UserProfilePost from '../user-profile-post-area/user-profile-post-area';
import UserProfileReview from '../user-profile-review-area/user-profile-review-area';

const UserProfileSubArea = () => {
    const [activeTab, setActiveTab] = useState("like");  // By default, "like" is the active taba

    return (
        <div className="user-profile-subArea-container">
            <div className="navbar">
                <div onClick={() => setActiveTab("like")} className={`item ${activeTab === "like" ? "active" : ""}`}>Like</div>
                <div onClick={() => setActiveTab("posted")} className={`item ${activeTab === "posted" ? "active" : ""}`}>Posted</div>
                <div onClick={() => setActiveTab("reviews")} className={`item ${activeTab === "reviews" ? "active" : ""}`}>Reviews</div>
            </div>
            <div className="bottom-rendering">
            {activeTab === "posted" && <UserProfilePost />}
            {activeTab === "like" && 
            <div className='bottom-rendering-post'>
                <DoctorPostGrid isAbout={true}/>
            </div>
            }
            {activeTab === "reviews" && <UserProfileReview/>}
            </div>
        </div>
    )
}

export default UserProfileSubArea;