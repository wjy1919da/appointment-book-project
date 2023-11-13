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
  const [userLocation, setUserLocation] = useState(null);

  const containerRef = useRef(null);

  const { data, isLoading, isError } = useSearchTags();

  useEffect(() => {
    console.log(data);
  }, [data]);

  // tag button
  const handleClickTag = () => {
    setIsLocationTagContainerVisible(false);
    setIsTagContainerVisible(!isTagContainerVisible);
  };

  // location button
  const handleClickLocation = () => {
    setIsTagContainerVisible(false);
    // get location
    getUserLocation();
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

  // get location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Geolocation API is not supported by your browser.');
    }
  };

  return (
    <>
      <div className='post-dropdown-filter-container' ref={containerRef}>
        <div className='post-dropdown-filter-inner-container'>
          <PostDropDownTagButton
            buttonTagName='#Tag'
            className='create-post-page-tag-name'
            onClick={handleClickTag}
          />

          {isTagContainerVisible && (
            <div className='post-dropdown-filter-search-container'>
              <div className='post-dropdown-filter-search-inner-container'>
                <PostSearchBox className='search-reverse' />
              </div>
              <div className='search-result'>
                <p className='search-result-title'>#Trendy</p>
                {data?.data?.map((item) => (
                  <div key={item.tagId} className='search-result-list'>
                    {item.tagName}
                  </div>
                ))}
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
                <div className='search-geolocation-result'>
                  {userLocation ? (
                    <p>
                      Latitude: {userLocation.latitude}, Longitude:{' '}
                      {userLocation.longitude}
                    </p>
                  ) : (
                    <span>Loading...</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDropDownFilter;
