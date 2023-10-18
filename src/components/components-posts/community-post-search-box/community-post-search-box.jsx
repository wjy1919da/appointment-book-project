import React from 'react';

// scss
import './community-post-search-box.scss';

// images
import SearchIcon from '../../../assets/post/search_icon.svg';

const PostSearchBox = () => {
  return (
    <div className='community-post-search-box-container'>
      <input type='text' className='community-post-search-box-input' />
      <img
        src={SearchIcon}
        alt='Image-Search-Icon'
        className='community-post-search-box-icon'
      />
    </div>
  );
};

export default PostSearchBox;
