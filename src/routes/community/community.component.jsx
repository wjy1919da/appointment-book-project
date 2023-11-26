<<<<<<< HEAD
import usePostQueryStore from '../../postStore.ts';
import React, { useState, useEffect, useRef } from 'react';

// components
import PostPageMain from '../../components/components-posts/community-post-main/community-post-main.jsx';
import DoctorPostGrid from '../../components/components-posts/community-post-grid/doctor-post-grid.component';
import PostDropDown from '../../components/components-posts/community-post-dropdown/post-drop-down.component';
import ResetAllButton from '../../components/components-posts/community-post-dropdown-reset/community-post-dropdown-reset.jsx';
import PostSearchBox from '../../components/components-posts/community-post-search-box/community-post-search-box.jsx';
import PostSearchBoxDropDown from '../../components/components-posts/community-post-search-box-dropdown/community-post-search-box-dropdown.jsx';

// scss
import './community.styles.scss';
const toDisplayFormat = (param) => {
  return param.replace(/_/g, ' ');
};

=======
import usePostQueryStore from "../../postStore.ts";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";

// components
import PostPageMain from "../../components/components-posts/community-post-main/community-post-main.jsx";
import DoctorPostGrid from "../../components/components-posts/community-post-grid/doctor-post-grid.component";
import PostDropDown from "../../components/components-posts/community-post-dropdown/post-drop-down.component";
import ResetAllButton from "../../components/components-posts/community-post-dropdown-reset/community-post-dropdown-reset.jsx";
import PostSearchBox from "../../components/components-posts/community-post-search-box/community-post-search-box.jsx";
import PostSearchBoxDropDown from "../../components/components-posts/community-post-search-box-dropdown/community-post-search-box-dropdown.jsx";

// scss
import "./community.styles.scss";
const toDisplayFormat = (param) => {
  return param.replace(/_/g, " ");
};
>>>>>>> AWS-frontend-postSearch
const Community = () => {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const [isPostDropDownOpen, setIsPostDropDownOpen] = useState(false);
  const postContainerRef = useRef(null);
  const setTempSearchParam = usePostQueryStore(
    (state) => state.setTempSearchParam
  );
  const setPostSearchParam = usePostQueryStore(
    (state) => state.setPostSearchParam
  );
  const setFilterCondition = usePostQueryStore(
    (state) => state.setFilterCondition
  );
  const handleFilters = (value, isChecked) => {
    const updatedFilter = [...postQuery.filterCondition];
    if (isChecked) {
      if (!updatedFilter.includes(value)) {
        updatedFilter.push(value);
      }
    } else {
      const index = updatedFilter.indexOf(value);
      if (index !== -1) {
        updatedFilter.splice(index, 1);
      }
    }
    setFilterCondition(updatedFilter);
  };
  const handleInputChange = (value) => {
    setTempSearchParam(value);
    setIsPostDropDownOpen(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        postContainerRef.current &&
        !postContainerRef.current.contains(event.target)
      ) {
        setIsPostDropDownOpen(false);
      }
    };

<<<<<<< HEAD
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
=======
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
>>>>>>> AWS-frontend-postSearch
    };
  }, [postContainerRef]);

  const handleShowContainer = () => {
    setIsPostDropDownOpen(!isPostDropDownOpen);
  };
  const handleSearch = () => {
    setPostSearchParam(postQuery.tempSearchParam);
    const postSearchHistory =
<<<<<<< HEAD
      JSON.parse(localStorage.getItem('postSearchHistory')) || [];
    if (!postSearchHistory.includes(postQuery.tempSearchParam)) {
      postSearchHistory.push(postQuery.tempSearchParam);
      localStorage.setItem(
        'postSearchHistory',
=======
      JSON.parse(localStorage.getItem("postSearchHistory")) || [];
    if (!postSearchHistory.includes(postQuery.tempSearchParam)) {
      postSearchHistory.push(postQuery.tempSearchParam);
      localStorage.setItem(
        "postSearchHistory",
>>>>>>> AWS-frontend-postSearch
        JSON.stringify(postSearchHistory)
      );
    }
    // setTempSearchParam("");
<<<<<<< HEAD
    console.log('postQuery', postQuery);
=======
    console.log("postQuery", postQuery);
>>>>>>> AWS-frontend-postSearch
  };

  return (
    <div>
      <div>
        <PostPageMain />
        <div className="doctor-post-outer-container">
          <div className="doctor-post-header-container">
            <div className="doctor-post-header-button-container">
              <PostDropDown
                // optipns={dropdownOptionsByCategory}
                handleFilters={handleFilters}
                menuLabel="Filter"
                wordAfterMenuLabel="All"
                className="filter-button"
              />
              <PostDropDown
                // options={dropdownOptionsByRole}
                handleFilters={handleFilters}
                menuLabel="Procedure"
                wordAfterMenuLabel="All"
                className="location-button"
              />
              <PostDropDown
                // options={dropdownOptionsByRole}
                handleFilters={handleFilters}
                menuLabel="Location"
                wordAfterMenuLabel="All"
                className="location-button"
              />
              <ResetAllButton />
            </div>
            <div
<<<<<<< HEAD
              className='post-search-box-position-container'
=======
              className="post-search-box-position-container"
>>>>>>> AWS-frontend-postSearch
              ref={postContainerRef}
            >
              <PostSearchBox
                value={toDisplayFormat(postQuery.tempSearchParam)}
                onChange={handleInputChange}
                onClick={handleShowContainer}
                handleSearch={handleSearch}
              />
              {isPostDropDownOpen && <PostSearchBoxDropDown />}
            </div>
          </div>
          <DoctorPostGrid />
        </div>
        {/* <DoctorPostGrid /> */}
      </div>
    </div>
  );
};

export default Community;
