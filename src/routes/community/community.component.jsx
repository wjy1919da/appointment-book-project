import usePostQueryStore from '../../postStore.ts';
import React, { useLayoutEffect } from 'react';

// components
import PostPageMain from '../../components/components-posts/community-post-main/community-post-main.jsx';
import DoctorPostGrid from '../../components/components-posts/community-post-grid/doctor-post-grid.component';
import Footer from '../../components/footer/footer.component';
import PostDropDown from '../../components/components-posts/community-post-dropdown/post-drop-down.component';
import ResetAllButton from '../../components/components-posts/community-post-dropdown-reset/community-post-dropdown-reset.jsx';
import PostSearchBox from '../../components/components-posts/community-post-search-box/community-post-search-box.jsx';

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

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

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
      <PostPageMain />
      <div className='doctor-post-outer-container'>
        <div className='doctor-post-header-container'>
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
            menuLabel='Location'
            wordAfterMenuLabel='All'
            className='location-button'
          />
          <ResetAllButton />
          <div className='post-search-box-position-container'>
            <PostSearchBox className='post-search-box' />
          </div>
        </div>
        <DoctorPostGrid />
      </div>
      <Footer />
    </div>
  );
};

export default Community;
