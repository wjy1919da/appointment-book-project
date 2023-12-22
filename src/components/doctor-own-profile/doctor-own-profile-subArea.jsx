import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./doctor-own-profile-subArea.styles.scss";
import DocotorOwnAbout from "./doctor-own-about-area";
import DoctorProfileGrid from "./doctor-own-profile-grid";
import UserProfileLike from "../user-profile-like/user-profile-like";

const DoctorProfileSubArea = () => {
  const [activeTab, setActiveTab] = useState("About"); // by default, "about" is the active tab
  const [showCreatePost, setShowCreatePost] = useState(false);

  const { hash } = useLocation();

  useEffect(() => {
    const cleanHash = hash.replace("#", "");
    if (
      cleanHash === "About" ||
      cleanHash === "Posts" ||
      cleanHash === "Like"
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
        {activeTab === "Posts" && <DoctorProfileGrid />}
        {activeTab === "Likes" && <UserProfileLike />}
      </div>
    </div>
  );
};

export default DoctorProfileSubArea;
