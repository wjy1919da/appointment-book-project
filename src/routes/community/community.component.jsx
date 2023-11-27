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
import PostDropDownContents from "../../components/components-posts/community-post-dropdown-contents/community-post-dropdown-contents.jsx";

const toDisplayFormat = (param) => {
  return param.replace(/_/g, " ");
};
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

  const dropdownContentsByFilter = () => {
    return <PostDropDownContents />;
  };

  // const dropdownContentsByFilter = [
  //   { value: 'facial', label: 'Facial' },
  //   { value: 'breast', label: 'Breast' },
  //   { value: 'body', label: 'Body' },
  // ];

  const dropdownContentsByProcedure = [
    { value: "by user", label: "By User" },
    { value: "by doctor", label: "By Doctor" },
  ];

  const dropdownContentsByLocation = [
    { value: "by user", label: "OK" },
    { value: "by doctor", label: "NO" },
  ];

  // Handle the situation of user not login but still want to see the post
  //  const userInfo = userInfoQueryStore((state) => state.userInfo);
  //  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  //  var token = Cookie.get('token');
  //  useEffect(() => {
  //     //console.log("doctor-post-grid");
  //     //console.log("userInfo in doctor-post-grid",userInfo);
  //     if(!token){
  //       togglePopup(true,"accountType");
  //     }
  //  },[userInfo.token]);
  //console.log("userInfo in doctor-post-grid outside",userInfo);

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
  const handleInputChange = (e) => {
    setTempSearchParam(e.target.value);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postContainerRef]);

  const handleShowContainer = () => {
    setIsPostDropDownOpen(!isPostDropDownOpen);
  };
  const handleSearch = () => {
    setPostSearchParam(postQuery.tempSearchParam);
    const postSearchHistory =
      JSON.parse(localStorage.getItem("postSearchHistory")) || [];
    if (!postSearchHistory.includes(postQuery.tempSearchParam)) {
      postSearchHistory.push(postQuery.tempSearchParam);
      localStorage.setItem(
        "postSearchHistory",
        JSON.stringify(postSearchHistory)
      );
    }
    // setTempSearchParam("");
    console.log("postQuery", postQuery);
  };

  // const handleFilters = (value, isChecked) => {
  //   const updatedFilter = [...postQuery.filterCondition];
  //   if (isChecked) {
  //     if (!updatedFilter.includes(value)) {
  //       updatedFilter.push(value);
  //     }
  //   } else {
  //     const index = updatedFilter.indexOf(value);
  //     if (index !== -1) {
  //       updatedFilter.splice(index, 1);
  //     }
  //   }
  //   setFilterCondition(updatedFilter);
  // };

  return (
    <div>
      <div>
        <PostPageMain />
        <div className="doctor-post-outer-container">
          <div className="doctor-post-header-container">
            <div className="doctor-post-header-button-container">
              <PostDropDown
                options={dropdownContentsByFilter}
                handleFilters={handleFilters}
                menuLabel="Filter"
                wordAfterMenuLabel="All"
                className="filter-button"
              />
              <PostDropDown
                options={dropdownContentsByProcedure}
                handleFilters={handleFilters}
                menuLabel="Procedure"
                wordAfterMenuLabel="All"
                className="location-button"
              />
              <PostDropDown
                options={dropdownContentsByLocation}
                handleFilters={handleFilters}
                menuLabel="Location"
                wordAfterMenuLabel="All"
                className="location-button"
              />
              <ResetAllButton />
            </div>
            <div
              className="post-search-box-position-container"
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
      </div>
    </div>
  );
};

export default Community;
