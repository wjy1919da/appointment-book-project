import React, { useState, useEffect, useRef } from 'react';
// import usePostQueryStore from '../../../postStore.ts';
// import useProcedureQueryStore from '../../../procedureStore';
// import { useNavigate } from 'react-router-dom';

// component
// import PostSearchBoxDropDown from '../community-post-search-box-dropdown/community-post-search-box-dropdown';
// import ProcedureSearchDropDown from '../../procedure-search-dropdown/procedure-search-dropdown.component';

// scss
import './community-post-search-box.scss';

// images
import SearchIcon from '../../../assets/post/search_icon.svg';

const toUrlParam = (text) => {
  if (text === '') return '';
  else return text.replace(/_/g, ' ');
};

const PostSearchBox = ({ value = '', handleSearch, ...otherProps }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleSearchMobile = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <>
      {/* desktop */}
      <div className='community-post-search-box-container'>
        <input
          type='text'
          value={value}
          {...otherProps}
          className='community-post-search-box-input'
        />
        <button type='button'>
          <img
            src={SearchIcon}
            alt='Image-Search-Icon'
            className='community-post-search-box-icon'
            onClick={handleSearch}
          />
        </button>
      </div>
      {/* mobile */}
      <div className='mobile-community-post-search-box-container'>
        <button type='button' className='mobile-community-post-search-box-button'>
          <img
            src={SearchIcon}
            alt='Image-Search-Icon'
            className='mobile-community-post-search-box-icon'
            onClick={handleSearchMobile}
          />
        </button>
        {isInputVisible && (
          <input
            type='text'
            value={value}
            {...otherProps}
            className='mobile-community-post-search-box-input'
          />
        )}
      </div>
    </>
  );
};

export default PostSearchBox;
