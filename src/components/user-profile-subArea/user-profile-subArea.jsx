import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// scss
import "./user-profile-subArea.styles.scss";

// components
import UserProfileReview from "../user-profile-review-area/user-profile-review-area";
import DoctorPostGrid from "../community-post-grid/community-post-grid.component";

// Hooks
import { useGetUserPostedPost } from "../../hooks/useApiRequestPostFilter";
import { useGetUserLikededPost } from "../../hooks/useApiRequestPostFilter";

import Doctor from "../../routes/doctor/doctor.component";
import ProfileMessage from "../profile-message/profile-message.component";

const UserProfileSubArea = () => {
  const [activeTab, setActiveTab] = useState("Likes");
  const [showCreatePost, setShowCreatePost] = useState(false);
  // Hooks
  const {
    data: userPostedPost,
    error: userPostedPostError,
    isLoading: userPostedPostIsLoading,
    fetchNextPage: userPostedPostFetchNextPage,
    hasNextPage: userPostedPostHasNextPage,
  } = useGetUserPostedPost();
  const {
    data: userLikedPost,
    isLoading: userLikedPostIsLoading,
    error: userLikedPostError,
    fetchNextPage: userLikedPostFetchNextPage,
    hasNextPage: userLikedPostHasNextPage,
  } = useGetUserLikededPost();

  const { hash } = useLocation();

  useEffect(() => {
    const cleanHash = hash.replace("#", "");
    if (
      cleanHash === "Likes" ||
      cleanHash === "Posts" ||
      cleanHash === "Doctors"
    ) {
      setActiveTab(cleanHash);
    }
  }, [hash]);
  const userProfileBreakPoints = {
    default: 4,
    2500: 4,
    2047: 4,
    1700: 4,
    1024: 4,
    767: 3,
    430: 2,
  };

  return (
    <div className="user-profile-subArea-container">
      <div className="navbar">
        <div
          onClick={() => setActiveTab("Likes")}
          className={`item ${activeTab === "Likes" ? "active" : ""}`}
        >
          <a href="#Likes" className="nav-tab-likes">
            Likes
          </a>
        </div>
        <div
          onClick={() => {
            setActiveTab("Posts");
            setShowCreatePost(false);
            console.log(showCreatePost);
          }}
          className={`item ${activeTab === "Posts" ? "active" : ""}`}
        >
          <a href="#Posts" className="nav-tab-posts">
            Posts
          </a>
        </div>
        <div
          onClick={() => setActiveTab("Doctors")}
          className={`item ${activeTab === "Doctors" ? "active" : ""}`}
        >
          <a href="#Doctors" className="nav-tab-doctors">
            Doctors
          </a>
        </div>
        {/* <div
          onClick={() => setActiveTab("Inbox")}
          className={`item ${activeTab === "Inbox" ? "active" : ""}`}
        >
          <a href="#Inbox" className="nav-tab-inbox">
            Inbox
          </a>
        </div> */}
      </div>
      <div className="bottom-rendering">
        {activeTab === "Likes" && (
          <DoctorPostGrid
            data={userLikedPost}
            error={userLikedPostError}
            isLoading={userLikedPostIsLoading}
            fetchNextPage={userLikedPostFetchNextPage}
            hasNextPage={userLikedPostHasNextPage}
            download={false}
            breakPoints={userProfileBreakPoints}
          />
        )}
        {activeTab === "Posts" && (
          <DoctorPostGrid
            data={userPostedPost}
            error={userPostedPostError}
            isLoading={userPostedPostIsLoading}
            fetchNextPage={userPostedPostFetchNextPage}
            hasNextPage={userPostedPostHasNextPage}
            download={false}
            breakPoints={userProfileBreakPoints}
          />
        )}
        {activeTab === "Doctors" && <UserProfileReview />}
        {/* {activeTab === "Inbox" && <ProfileMessage />} */}
      </div>
    </div>
  );
};

export default UserProfileSubArea;
