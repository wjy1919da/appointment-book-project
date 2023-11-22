import usePostQueryStore from '../../postStore.ts';
import React, { useLayoutEffect } from 'react';

// components
import PostPageMain from '../../components/components-posts/community-post-main/community-post-main.jsx';
import DoctorPostGrid from '../../components/components-posts/community-post-grid/doctor-post-grid.component';
import PostDropDown from '../../components/components-posts/community-post-dropdown/post-drop-down.component';
import ResetAllButton from '../../components/components-posts/community-post-dropdown-reset/community-post-dropdown-reset.jsx';
import PostSearchBox from '../../components/components-posts/community-post-search-box/community-post-search-box.jsx';
// import userInfoQueryStore from '../../userStore.ts';

// scss
import './community.styles.scss';

const Community = () => {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const setFilterCondition = usePostQueryStore(
    (state) => state.setFilterCondition
  );

  // const dropdownOptionsByCategory = [
  //   { value: 'facial', label: 'Facial' },
  //   { value: 'breast', label: 'Breast' },
  //   { value: 'body', label: 'Body' },
  // ];

  // const dropdownOptionsByRole = [
  //   { value: 'by user', label: 'By User' },
  //   { value: 'by doctor', label: 'By Doctor' },
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

  return (
    <div>
      <div>
        <PostPageMain />
        <div className='doctor-post-outer-container'>
          <div className='doctor-post-header-container'>
            <div className='doctor-post-header-button-container'>
              <PostDropDown
                // optipns={dropdownOptionsByCategory}
                handleFilters={handleFilters}
                menuLabel='Filter'
                wordAfterMenuLabel='All'
                className='filter-button'
              />
              <PostDropDown
                // options={dropdownOptionsByRole}
                handleFilters={handleFilters}
                menuLabel='Procedure'
                wordAfterMenuLabel='All'
                className='location-button'
              />
              <PostDropDown
                // options={dropdownOptionsByRole}
                handleFilters={handleFilters}
                menuLabel='Location'
                wordAfterMenuLabel='All'
                className='location-button'
              />
              <ResetAllButton />
            </div>
            <div className='post-search-box-position-container'>
              <PostSearchBox />
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
