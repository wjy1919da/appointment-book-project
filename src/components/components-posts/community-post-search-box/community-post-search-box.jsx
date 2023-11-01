import React, { useState, useEffect, useRef } from 'react';

// component
import PostSearchBoxDropDown from '../community-post-search-box-dropdown/community-post-search-box-dropdown';

// scss
import './community-post-search-box.scss';

// images
import SearchIcon from '../../../assets/post/search_icon.svg';

const PostSearchBox = () => {
  const [input, setInput] = useState('');
  const [showContainer, setShowContainer] = useState(false);
  const [isSearchContainerVisible, setIsSearchContainerVisible] =
    useState(false);

  const containerRef = useRef(null);

  const closeContainer = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsSearchContainerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeContainer);

    return () => {
      document.removeEventListener('click', closeContainer);
    };
  }, []);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleShowContainer = () => {
    setShowContainer(!showContainer);
    setIsSearchContainerVisible(!isSearchContainerVisible);
  };

  return (
    <div className='community-post-search-box-container' ref={containerRef}>
      <input
        type='text'
        value={input}
        onChange={handleChangeInput}
        className='community-post-search-box-input'
      />
      <button onClick={handleShowContainer}>
        <img
          src={SearchIcon}
          alt='Image-Search-Icon'
          className='community-post-search-box-icon'
        />
      </button>
      {isSearchContainerVisible && <PostSearchBoxDropDown />}
    </div>
  );
};

export default PostSearchBox;
