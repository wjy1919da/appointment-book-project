import usePostQueryStore from '../../postStore.ts';
import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

// components
import DoctorSearchLoadingBar from '../../components/doctor-search-loading-bar/doctor-search-loading-bar.component';
import PostPageMain from '../../components/components-posts/community-post-main/community-post-main.jsx';
import DoctorPostGrid from '../../components/community-post-grid/community-post-grid.component.jsx';
import PostSearchBox from '../../components/components-posts/community-post-search-box/community-post-search-box.jsx';
import PostDropDownContents from '../../components/components-posts/community-post-dropdown-contents/community-post-dropdown-contents.jsx';
// import PostSearchBoxDropDown from "../../components/components-posts/community-post-search-box-dropdown/community-post-search-box-dropdown.jsx";
// import PostDropDown from "../../components/components-posts/community-post-dropdown/post-drop-down.component";
// import ResetAllButton from "../../components/components-posts/community-post-dropdown-reset/community-post-dropdown-reset.jsx";

// scss
import './community.styles.scss';

// hook
import { useApiRequestPostFilter } from '../../hooks/useApiRequestPostFilter';

const Community = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 743.5px)` });
  // const screen375 = useMediaQuery({query: `(max-width: 375px)` });
  const setPostBy = usePostQueryStore((state) => state.setPostBy);
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const [isPostDropDownOpen, setIsPostDropDownOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isDoctorTitleVisible, setIsDoctorTitleVisible] = useState(true);
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useApiRequestPostFilter();
  // let data = [];
  // let isLoading = true;
  // let error = null;
  // let hasNextPage = false;
  // const fetchNextPage = () => {};

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
  const mainPageBreakPoints = {
    default: 5,
    2500: 5,
    2047: 5,
    1700: 5,
    1024: 4,
    767: 3,
    430: 2,
  };

  // const dropdownContentsByFilter = [
  //   { value: 'facial', label: 'Facial' },
  //   { value: 'breast', label: 'Breast' },
  //   { value: 'body', label: 'Body' },
  // ];

  // const dropdownContentsByProcedure = [
  //   { value: "by user", label: "By User" },
  //   { value: "by doctor", label: "By Doctor" },
  // ];

  // const dropdownContentsByLocation = [
  //   { value: "by user", label: "OK" },
  //   { value: "by doctor", label: "NO" },
  // ];

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

  // const handleFilters = (value, isChecked) => {
  //   const updatedFilter = [...postQuery.filterCondition];
  //   let updatedPostBy = [...postQuery.postBy];

  //   if (isChecked) {
  //     if (!updatedFilter.includes(value)) {
  //       updatedFilter.push(value);

  //       if (value === "user") {
  //         updatedPostBy = ["user"];
  //       } else if (value === "doctor") {
  //         updatedPostBy = ["doctor"];
  //       }
  //     }
  //   } else {
  //     const index = updatedFilter.indexOf(value);
  //     if (index !== -1) {
  //       updatedFilter.splice(index, 1);
  //       if (updatedFilter.length === 0) {
  //         updatedPostBy = ["user", "doctor"];
  //       }
  //     }
  //   }

  //   setFilterCondition(updatedFilter);
  //   setPostBy(updatedPostBy);
  //   if (postQuery.postBy.includes(role)) {
  //     setPostBy(postQuery.postBy.filter((item) => item !== role));
  //   } else {
  //     setPostBy([...postQuery.postBy, role]);
  //   }
  // };

  // small screens search icon button
  const handleResponsiveButtonClick = () => {
    setIsInputVisible(!isInputVisible);
    setIsDoctorTitleVisible(!isDoctorTitleVisible);
  };

  const handleOnClick = (role) => {
    if (postQuery.postBy.includes(role)) {
      setPostBy(postQuery.postBy.filter((item) => item !== role));
    } else {
      setPostBy([...postQuery.postBy, role]);
    }
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [postContainerRef]);

  const handleShowContainer = () => {
    setIsPostDropDownOpen(!isPostDropDownOpen);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    // console.log("handleSearch is clicked");
    setPostSearchParam(postQuery.tempSearchParam);
    const postSearchHistory =
      JSON.parse(localStorage.getItem('postSearchHistory')) || [];
    if (!postSearchHistory.includes(postQuery.tempSearchParam)) {
      postSearchHistory.push(postQuery.tempSearchParam);
      localStorage.setItem(
        'postSearchHistory',
        JSON.stringify(postSearchHistory)
      );
    }
    // setTempSearchParam("");
    // console.log("postQuery", postQuery);
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
    <div className='community-component-container'>
      <div>
        <PostPageMain />

        <div className='doctor-post-outer-container'>
          <div className='doctor-post-header-container'>
            <div className='doctor-post-title-and-search-box'>
              <h1
                className='doctor-post-outer-title'
                style={{ opacity: isDoctorTitleVisible ? 1 : 0.7 }}
              >
                Community Posts
              </h1>

              <div className='doctor-post-header-button-container'>
                <div className='search-box-and-filter-container'>
                  <div
                    className='post-search-box-position-container'
                    ref={postContainerRef}
                  >
                    <PostSearchBox
                      value={postQuery.tempSearchParam}
                      onChange={handleInputChange}
                      onClick={handleShowContainer}
                      handleSearch={handleSearch}
                      isMobile={isMobile}
                      // isScreen375 = {screen375}
                      handleResponsiveButtonClick={handleResponsiveButtonClick}
                      isInputVisible={isInputVisible}
                      onKeyPress={handleKeyPress}
                    />
                    {/* 1.0 version do not need dropdown */}
                    {/* {isPostDropDownOpen && <PostSearchBoxDropDown />} */}
                  </div>
                </div>

                <div className='community-post-header-filter-container'>
                  <span className='postby'>Post By</span>
                  <button
                    // className={`filter-button-member ${
                    className={`filter-button ${
                      postQuery.postBy.includes('user')
                        ? 'filter-button-selected'
                        : ''
                    }`}
                    onClick={() => handleOnClick('user')}
                  >
                    Member
                  </button>
                  <button
                    // className={`filter-button-doctor ${
                    className={`filter-button ${
                      postQuery.postBy.includes('doctor')
                        ? 'filter-button-selected'
                        : ''
                    }`}
                    onClick={() => handleOnClick('doctor')}
                  >
                    Doctor
                  </button>
                </div>
              </div>

              {/* <PostDropDown
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
             /> */}
            </div>
          </div>

          {/* <div> */}
          {isLoading && <DoctorSearchLoadingBar />}
          <DoctorPostGrid
            data={data}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            error={error}
            download={true}
            breakPoints={mainPageBreakPoints}
          />
          {/* </div> */}

          {/* <div className="down-load-more-container">
            {!isMobile && (
              // <img src={Arrow} alt="arrow" className="arrow-containter" />
              <FontAwesomeIcon
                icon={faAnglesDown}
                className="arrow-containter"
              />
            )}
            {isMobile && (
              <img src={Arrow1} alt="arrow1" className="arrow1-containter" />
            )}
            <div className="download-text">
              Join Charm community to view more
            </div>
            <Link to="/download">
              <button className="download-button">
                <div className="download-button-text">DownLoad APP</div>
              </button>
            </Link>
         
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Community;
