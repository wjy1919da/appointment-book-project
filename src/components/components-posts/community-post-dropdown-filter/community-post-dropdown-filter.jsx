import React, { useState, useEffect, useRef } from 'react';

// components
import PostSearchBox from '../community-post-search-box/community-post-search-box';
import PostDropDownTagButton from '../community-post-dropdown-tag-button/community-post-dropdown-tag-button';

// scss
import './community-post-dropdown-filter.scss';

// hook
import useSearchTags from '../../../hooks/useSearchTags';

const PostDropDownFilter = () => {
  const [isTagContainerVisible, setIsTagContainerVisible] = useState(false);
  const [isLocationTagContainerVisible, setIsLocationTagContainerVisible] =
    useState(false);

  const containerRef = useRef(null);

  const { data, isLoading, isError } = useSearchTags();

  useEffect(() => {
    console.log(data);
  }, [data]);

  // tag, location button
  const handleClickTag = () => {
    setIsTagContainerVisible(!isTagContainerVisible);
  };

  const handleClickLocation = () => {
    setIsLocationTagContainerVisible(!isLocationTagContainerVisible);
  };

  const closeContainer = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsTagContainerVisible(false);
      setIsLocationTagContainerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeContainer);

    return () => {
      document.removeEventListener('click', closeContainer);
    };
  }, []);

  return (
    <>
      <div className='post-dropdown-filter-container' ref={containerRef}>
        <div className='post-dropdown-filter-inner-container'>
          <PostDropDownTagButton
            buttonTagName='#Tag'
            className='create-post-page-tag-name'
            onClick={handleClickTag}
          />

          {isTagContainerVisible && !isLoading && !isError && (
            <div className='post-dropdown-filter-search-container'>
              <div className='post-dropdown-filter-search-inner-container'>
                <PostSearchBox className='search-reverse' />
                <div className='search-results'>
                  <ul>
                    {data ? (
                      data.map((item) => (
                        <li key={item.tagId}>{item.tagName}</li>
                      ))
                    ) : (
                      <li>No data available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <PostDropDownTagButton
            buttonTagName='Add Location'
            className='create-post-page-location-tag-name'
            onClick={handleClickLocation}
          />
          {isLocationTagContainerVisible && (
            <div className='post-dropdown-location-filter-search-container'>
              <div className='post-dropdown-filter-search-inner-container'>
                <PostSearchBox className='search-reverse' />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDropDownFilter;
