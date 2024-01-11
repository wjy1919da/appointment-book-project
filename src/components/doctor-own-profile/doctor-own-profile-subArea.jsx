import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./doctor-own-profile-subArea.styles.scss";
import DocotorOwnAbout from "./doctor-own-about-area";
import DoctorPostGrid from "../community-post-grid/community-post-grid.component";
import { useGetUserPostedPost } from "../../hooks/useApiRequestPostFilter";
import { useGetUserLikededPost } from "../../hooks/useApiRequestPostFilter";

const DoctorProfileSubArea = () => {
  const [activeTab, setActiveTab] = useState("About"); // by default, "about" is the active tab
  const [showCreatePost, setShowCreatePost] = useState(false);
  const {
    data: posts,
    error: postsError,
    isLoading: postsIsLoading,
    fetchNextPage: postsFetchNextPage,
    isFetchingNextPage: postsIsFetchingNextPage,
    hasNextPage: postsHasNextPage,
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
      cleanHash === "About" ||
      cleanHash === "Posts" ||
      cleanHash === "Likes"
    ) {
      setActiveTab(cleanHash);
    }
  }, [hash]);
  return (
    <div className="doctor-profile-subArea-container">
      <div className="navbar">
        <div
          onClick={() => setActiveTab("About")}
          className={`item ${activeTab === "About" ? "active" : ""}`}
        >
          <a href="#About" className="nav-tab-about">
            About
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
          onClick={() => setActiveTab("Likes")}
          className={`item ${activeTab === "Likes" ? "active" : ""}`}
        >
          <a href="#Like" className="nav-tab-like">
            Like
          </a>
        </div>
      </div>
      <div className="bottom-rendering">
        {activeTab === "About" && <DocotorOwnAbout />}
        {activeTab === "Posts" && (
          <DoctorPostGrid
            data={posts}
            fetchNextPage={postsFetchNextPage}
            hasNextPage={postsHasNextPage}
            isLoading={postsIsLoading}
            error={postsError}
            download={false}
          />
        )}
        {activeTab === "Likes" && (
          <DoctorPostGrid
            data={userLikedPost}
            error={userLikedPostError}
            isLoading={userLikedPostIsLoading}
            fetchNextPage={userLikedPostFetchNextPage}
            hasNextPage={userLikedPostHasNextPage}
            download={false}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorProfileSubArea;
