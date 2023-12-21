import React, { useState, useEffect } from "react";
import "./doctor-own-profile-subArea.styles.scss";
import { useLocation } from "react-router-dom";

import DocotorOwnAbout from "./doctor-own-about-area";
import DoctorProfileGrid from "./doctor-own-profile-grid";
import UserProfileLike from "../user-profile-like/user-profile-like";
import DoctorAbout from "../component-individual-doctor/doctor-about/doctor-about.component";

const DoctorProfileSubArea = () => {
  //const { tab } = (); step 1 get params from posts/about/like from url
  // step2 set default tab to be params const [activeTab, setActiveTab] = useState(tab || "About");

  const [activeTab, setActiveTab] = useState("About"); // By default, "About" is the active taba
  // console.log(activeTab);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { hash } = useLocation(); // Destructure the hash from useLocation

  useEffect(() => {
    const cleanHash = hash.replace("#", ""); // Remove '#' from hash
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
          <a href="#About">About</a>
        </div>
        <div
          onClick={() => {
            setActiveTab("Posts");
            setShowCreatePost(false); // Add this line
            // console.log(showCreatePost);
          }}
          className={`item ${activeTab === "Posts" ? "active" : ""}`}
        >
          <a href="#Posts">Posts</a>
        </div>
        <div
          onClick={() => setActiveTab("Like")}
          className={`item ${activeTab === "Like" ? "active" : ""}`}
        >
          <a href="#Likes">Like</a>
        </div>
      </div>
      <div className="bottom-rendering">
        {activeTab === "About" && <DocotorOwnAbout />}
        {activeTab === "Posts" && <DoctorProfileGrid />}
        {activeTab === "Like" && <UserProfileLike />}
      </div>
    </div>
  );
};

export default DoctorProfileSubArea;
